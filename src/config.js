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
  MENU_ITEMS: [
    { title: 'Valokuvat', link: '/valokuvat', private: false },
    { title: 'Sukupuu', link: '/sukupuu', private: false },
    { title: 'Kirjaudu', link: '/kirjaudu' },
  ],
  ACCESS_TOKEN: 'heritageAccessToken',
  WHITE_LIST_EMAILS: process.env.WHITE_LIST_EMAILS || '',
  NETLIFY_FUNCTIONS: '/.netlify/functions',
  AUTH0_DOMAIN: 'prod-tuomaalafi.eu.auth0.com',
  AUTH0_CLIENT_ID: '6maNRjtjiFie9k4ShgWAeX2GOt5JoWNY',
};

export default config;
