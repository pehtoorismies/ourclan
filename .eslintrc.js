module.exports = {
  extends: 'motley',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
};
