interface navBartheme {
  navbarBackgroundColor: string;
  textColor: string;
  drawerColor: string;
  cross: string;
}

export interface themeCollections {
  secondary: navBartheme;
  third: navBartheme;
}

export const themes: themeCollections = {
  secondary: {
    navbarBackgroundColor: '#001F3F',
    textColor: '#C1FAA6',
    drawerColor: '#E3DD39',
    cross: '#001F3F',
  },
  third: {
    navbarBackgroundColor: '#EDCBEF',
    textColor: '#001F3F',
    drawerColor: '#001F3F',
    cross: '#C1FAA6',
  },
};
