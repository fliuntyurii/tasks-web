import axios, { AxiosInstance } from 'axios'
import { BASE_API_URL } from '../constants/index';

export const instance: AxiosInstance = axios.create({
  baseURL: BASE_API_URL,
});