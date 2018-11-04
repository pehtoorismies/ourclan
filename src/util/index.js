import axios from 'axios';
import config from '../config';

const CLAN_TOKEN = 'clan_access_token';

const saveToken = token => {
  localStorage.setItem(CLAN_TOKEN, token);
};
const loadToken = () => localStorage.getItem(CLAN_TOKEN);

const isLoggedIn = () => !!loadToken();

const getAxiosInstance = path =>
  axios.create({
    baseURL: `${config.API_URL}/${path}`,
    timeout: 5000,
    headers: { Authorization: `Bearer ${loadToken()}` },
  });

export { saveToken, loadToken, isLoggedIn, getAxiosInstance };
