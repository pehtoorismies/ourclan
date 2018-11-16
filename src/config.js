const config = {
  HEADER_HEIGHT: 80,
  THEME: {
    fonts: {
      sans: 'Montserrat, "Avenir Next", Helvetica, sans-serif',
    },
    fontSizes: [12, 16, 24, 36, 48, 72],
    colors: {
      green: '#339967',
      yellow: '#ffcc33',
      blue: '#7FA9BC',
      palewhite: '#F8F4F4',
      black: '#393939',
      gray: '#EFEFEF',
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
    lineHeights: [1.5, 1.3, 1.5],
  },
  MENU_ITEMS: [{ title: 'Valokuvat', link: '/jasenet', private: false }],
  ACCESS_TOKEN: 'heritageAccessToken',
  API_URL: process.env.API_URL,
  SENTRY_FEEDBACK_CONFIG: {
    title: 'Näyttää pahasti siltä, että sivustolla on onkelmia',
    subtitle: 'Kerro lyhyesti mitä tapahtui',
    subtitle2: '',
    labelName: 'Nimi',
    labelEmail: 'Sähköposti',
    labelComments: 'Mitä tapahtui?',
    labelClose: 'Sulje',
    labelSubmit: 'Lähetä raportti',
    errorFormEntry: 'Tarkista, että täytit oikeat tiedot',
    successMessage: 'Kiitos palautteesta.',
    lang: 'fi',
  },
};

export default config;
