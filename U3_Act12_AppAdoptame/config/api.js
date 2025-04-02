import axios from 'axios';
import { API_DOGS, API_CATS, API_AUTH } from '@env';

export const dogsApi = axios.create({
  baseURL: API_DOGS,
});

export const catsApi = axios.create({
  baseURL: API_CATS,
  headers: {
    'x-api-key': 'DEMO-API-KEY'
  }
});

export const authApi = axios.create({
  baseURL: API_AUTH,
});