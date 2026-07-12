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
    { text: 'Home', href: '/#home' },
    { text: 'Destinations', href: '/#destinations' },
    { text: 'Experiences', href: '/#experiences' },
    { text: 'About', href: '/#about' },
    { text: 'Services', href: '/services' },
  ],
  actions: [{ text: 'Contact Me', href: '/contact', variant: 'primary' }],
};

export const footerData = {
  links: [
    {
      title: 'Menu',
      links: [
        { text: 'Home', href: '/#home' },
        { text: 'Destinations', href: '/#destinations' },
        { text: 'Experiences', href: '/#experiences' },
      ],
    },
    {
      title: 'About',
      links: [
        { text: 'About Me', href: '/about' },
        { text: 'Services', href: '/services' },
        { text: 'Contact', href: '/contact' },
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
