import type { CallToAction } from './types.d.ts';
import { getPermalink } from './utils/permalinks.ts';

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
    { text: 'Home', href: getPermalink('/#home') },
    { text: 'Destinations', href: getPermalink('/#destinations') },
    { text: 'Experiences', href: getPermalink('/#experiences') },
    { text: 'About', href: getPermalink('/#about') },
    { text: 'Services', href: getPermalink('/services') },
  ],
  actions: [{ text: 'Contact Me', href: getPermalink('/contact'), variant: 'primary' }],
};

export const footerData = {
  links: [
    {
      title: 'Menu',
      links: [
        { text: 'Home', href: getPermalink('/#home') },
        { text: 'Destinations', href: getPermalink('/#destinations') },
        { text: 'Experiences', href: getPermalink('/#experiences') },
      ],
    },
    {
      title: 'About',
      links: [
        { text: 'About Me', href: getPermalink('/about') },
        { text: 'Services', href: getPermalink('/services') },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    {
      ariaLabel: 'Instagram',
      icon: 'tabler:brand-instagram',
      href: 'https://instagram.com',
    },
    {
      ariaLabel: 'Facebook',
      icon: 'tabler:brand-facebook',
      href: 'https://facebook.com',
    },
  ],
  footNote: '© 2026 OMOTENASHI - Miki Inoue. All rights reserved.',
};
