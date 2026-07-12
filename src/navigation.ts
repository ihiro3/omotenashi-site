import type { CallToAction } from './types.d.ts';

type HeaderLink = {
  text: string;
  href?: string;
  links?: HeaderLink[];
};

export const headerData: {
  links: HeaderLink[];
  actions: CallToAction[];
} = {
  links: [
    { text: 'ホーム', href: '/#home' },
    { text: '直近のイベント', href: '/#event' },
    { text: '代表挨拶', href: '/#greeting' },
    { text: '会則', href: '/rules' },
    { text: '活動の足跡', href: '/history' },
  ],
  actions: [{ text: 'イベントに応募する', href: '/#event', variant: 'primary' }],
};

export const footerData = {
  links: [
    {
      title: 'メニュー',
      links: [
        { text: 'ホーム', href: '/#home' },
        { text: '直近のイベント', href: '/#event' },
        { text: '代表挨拶', href: '/#greeting' },
      ],
    },
    {
      title: '倶楽部について',
      links: [
        { text: '会則', href: '/rules' },
        { text: '活動の足跡', href: '/history' },
        { text: '主催：せいか自然観察倶楽部', href: '/' },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    {
      ariaLabel: 'Facebook',
      icon: 'tabler:brand-facebook',
      href: 'https://www.facebook.com/people/%E3%81%9B%E3%81%84%E3%81%8B%E8%87%AA%E7%84%B6%E8%A6%B3%E5%AF%9F%E5%80%B6%E6%A5%BD%E9%83%A8/100054270127652/',
    },
    {
      ariaLabel: 'X',
      icon: 'tabler:brand-x',
      href: 'https://x.com/sciencekeihanna',
    },
  ],
  footNote: '© 2026 せいか自然観察倶楽部. All rights reserved.',
};
