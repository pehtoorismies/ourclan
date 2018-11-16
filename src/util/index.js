import axios from 'axios';
import { toast } from 'react-toastify';
import { navigate } from 'gatsby';
import * as Sentry from '@sentry/browser';
import config from '../config';

const CLAN_TOKEN = 'clan_access_token';

export const storage = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage;
  }
  return {
    setItem: () => {},
    getItem: () => {},
  };
};

const saveToken = token => {
  storage().setItem(CLAN_TOKEN, token);
};
const loadToken = () => storage().getItem(CLAN_TOKEN);

const removeToken = () => storage().removeItem(CLAN_TOKEN);

const isLoggedIn = () => !!loadToken();

const getAxiosInstance = path =>
  axios.create({
    baseURL: `${config.API_URL}/${path}`,
    timeout: 5000,
    headers: { Authorization: `Bearer ${loadToken()}` },
  });

const axiosErrorHandler = error => {
  console.error('error', error);
  if (error.response) {
    const { status } = error.response;
    if (status === 401) {
      toast.warn('Kirjaudu uudelleen sisään');
      navigate('/jasenet/login');
    }
  } else {
    toast.error('Virhettä pukkaa');
    Sentry.captureException(error);
    Sentry.showReportDialog(config.SENTRY_FEEDBACK_CONFIG);
  }
};

export {
  saveToken,
  loadToken,
  removeToken,
  isLoggedIn,
  getAxiosInstance,
  axiosErrorHandler,
};
