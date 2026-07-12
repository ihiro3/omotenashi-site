# microCMSインポート手順ガイド

## 概要

精華町議会の活動データをmicroCMSにインポートするための手順です。

## ステップ1: microCMSでAPIスキーマを作成

1. microCMS管理画面にログイン
2. 「API」→「API作成」をクリック
3. 以下の設定でAPIを作成：
   - **API ID**: `council-activities`
   - **API名**: 議会活動
   - **エンドポイント**: `council-activities`

4. APIスキーマに以下のフィールドを追加：

   | フィールド名 | タイプ   | 必須   | ラベル       |
   | ------------ | -------- | ------ | ------------ |
   | date         | 日付     | はい   | 日付         |
   | time         | テキスト | いいえ | 時間         |
   | activity     | テキスト | はい   | 活動内容     |
   | participant  | テキスト | いいえ | 参加者・役割 |
   | url          | テキスト | いいえ | 元ページURL  |
   | year         | テキスト | はい   | 年           |
   | month        | テキスト | はい   | 月           |

## ステップ2: データ抽出スクリプトの作成

データ量が多いため、スクリプトで自動化することを推奨します。以下はNode.jsを使用した例です：

```javascript
// extract-council-activities.js
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const baseURL = 'https://www.town.seika.kyoto.jp/gikai/kouhou/katudou';
const months = [
  '0205',
  '0206',
  '0207',
  '0208',
  '0209',
  '0210',
  '0211',
  '0212',
  '0301',
  '0302',
  '0303',
  '0304',
  '0305',
  '0306',
  '0307',
  '0308',
  '0309',
  '10',
  '0311',
  '0312',
  '0401',
  '0402',
  '0403',
  '0404',
  '0405',
  '0406',
  '0407',
  '0408',
  '0409',
  '0410',
  '0411',
  '0412',
  '0501',
  '0502',
  '0503',
  '0504',
  '0505',
  '0506',
  '0507',
  '0508',
  '0509',
  '0510',
  '0511',
  '0512',
  '0601',
  '0602',
  '0603',
  '0604',
  '0605',
  '0606',
  '0607',
  '0608',
  '0609',
  '0610',
  '0611',
  '0612',
  '0701',
  '0702',
  '0703',
  '0704',
  '0705',
  '0706',
  '0707',
  '0708',
  '0709',
  '0710',
  '0711',
  '0712',
  '0801',
  '0802',
  '0803',
  '0804',
  '0805',
  '0806',
];

async function extractActivities() {
  const allActivities = [];

  for (const month of months) {
    try {
      const monthURL = `${baseURL}/${month}/index.html`;
      const response = await axios.get(monthURL);
      const $ = cheerio.load(response.data);

      // 日付リンクを抽出
      const dayLinks = [];
      $('a').each((i, elem) => {
        const href = $(elem).attr('href');
        if (href && href.match(/^\d+\/index\.html$/)) {
          dayLinks.push(href.replace('/index.html', ''));
        }
      });

      // 各日の活動を抽出
      for (const day of dayLinks) {
        const dayURL = `${baseURL}/${month}/${day}/index.html`;
        const dayResponse = await axios.get(dayURL);
        const $day = cheerio.load(dayResponse.data);

        $day('a').each((i, elem) => {
          const text = $day(elem).text().trim();
          const href = $day(elem).attr('href');
          if (href && href.match(/\.html$/) && !href.includes('index.html')) {
            const match = text.match(/(.+?)\s+(.+)/);
            if (match) {
              allActivities.push({
                date: convertToDate(month, day),
                time: match[1],
                activity: match[2],
                participant: extractParticipant(text),
                url: `${baseURL}/${month}/${day}/${href}`,
                year: convertToJapaneseYear(month),
                month: convertToJapaneseMonth(month),
              });
            }
          }
        });
      }

      console.log(`完了: ${month}`);
      // レート制限を避けるための遅延
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`エラー: ${month}`, error.message);
    }
  }

  return allActivities;
}

function convertToDate(month, day) {
  // 月と日から日付形式に変換
  const year = 2000 + parseInt(month.substring(0, 2));
  const monthNum = parseInt(month.substring(2, 4));
  const dayNum = parseInt(day);
  return `${year}-${String(monthNum).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
}

function convertToJapaneseYear(month) {
  const year = 2000 + parseInt(month.substring(0, 2));
  const reiwaYear = year - 2018;
  return `令和${reiwaYear}年`;
}

function convertToJapaneseMonth(month) {
  const monthNum = parseInt(month.substring(2, 4));
  return `${monthNum}月`;
}

function extractParticipant(text) {
  const match = text.match(/【(.+?)】/);
  return match ? match[1] : '';
}

// 実行
extractActivities().then((activities) => {
  fs.writeFileSync('council-activities-data.json', JSON.stringify(activities, null, 2));
  console.log(`合計 ${activities.length} 件のデータを抽出しました`);
});
```

## ステップ3: データ抽出の実行

1. Node.js環境をセットアップ
2. 必要なパッケージをインストール：
   ```bash
   npm install axios cheerio
   ```
3. スクリプトを実行：
   ```bash
   node extract-council-activities.js
   ```
4. `council-activities-data.json`が出力されます

## ステップ4: microCMSへのインポート

### 方法A: microCMS管理画面からインポート

1. microCMS管理画面で「API」→「council-activities」を選択
2. 「コンテンツ一覧」→「インポート」をクリック
3. `council-activities-data.json`をアップロード
4. インポート設定を確認して実行

### 方法B: microCMS APIを使用したインポート

```javascript
// import-to-microcms.js
const axios = require('axios');
const fs = require('fs');

const API_KEY = 'YOUR_MICROCMS_API_KEY';
const SERVICE_DOMAIN = 'YOUR_SERVICE_DOMAIN';
const API_ENDPOINT = 'council-activities';

const activities = JSON.parse(fs.readFileSync('council-activities-data.json', 'utf8'));

async function importToMicroCMS() {
  for (const activity of activities) {
    try {
      await axios.post(`https://${SERVICE_DOMAIN}.microcms.io/api/v1/${API_ENDPOINT}`, activity, {
        headers: {
          'X-MICROCMS-API-KEY': API_KEY,
          'Content-Type': 'application/json',
        },
      });
      console.log(`インポート成功: ${activity.activity}`);
    } catch (error) {
      console.error(`インポート失敗: ${activity.activity}`, error.message);
    }
  }
}

importToMicroCMS();
```

## 注意事項

1. **レート制限**: スクレイピング時は適切な遅延を設けてください
2. **データ量**: 全データで数千件になる可能性があります
3. **エラーハンドリング**: ネットワークエラーに対する再試行ロジックを実装してください
4. **データ検証**: インポート前にデータの整合性を確認してください
5. **microCMS制限**: microCMSのAPIレート制限に注意してください

## サポート

問題が発生した場合は：

- microCMSドキュメント: https://document.microcms.io/
- 精華町議会サイト: https://www.town.seika.kyoto.jp/gikai/index.html
