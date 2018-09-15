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
  LAMBDA_HOST: process.env.GATSBY_LAMBDA_HOST || process.env.URL, // in production it is the same url
  WHITE_LIST_EMAILS: process.env.WHITE_LIST_EMAILS || '',
  // LAMBDAS
  EMAIL_VALIDATOR_PATH: process.env.GATSBY_LAMBDA_VERIFY_EMAIL_PATH,
};

export default config;
