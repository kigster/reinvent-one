export interface FooterLink {
  name: string;
  link: string;
  socialIcon?: string;
  newWindow?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerSections: FooterSection[] = [
  {
    title: "Pages",
    links: [
      { name: "Home", link: "#hero" },
      { name: "Services", link: "#services" },
      { name: "Portfolio", link: "#portfolio" },
      { name: "About", link: "#about" },
      { name: "Contact", link: "#contact" },
      { name: "Blog", link: "http://kig.re/", newWindow: true },
    ],
  },
  {
    title: "Social",
    links: [
      {
        name: "Twitter",
        link: "https://twitter.com/reinventone",
        socialIcon: "Twitter",
        newWindow: true,
      },
      {
        name: "LinkedIn",
        link: "https://linkedin.com/in/kigster",
        socialIcon: "LinkedIn",
        newWindow: true,
      },
      {
        name: "GitHub",
        link: "https://github.com/reinventone",
        socialIcon: "GitHub",
        newWindow: true,
      },
      {
        name: "SoundCloud",
        link: "https://soundcloud.com/polygroovers",
        socialIcon: "SoundCloud",
        newWindow: true,
      },
    ],
  },
];
