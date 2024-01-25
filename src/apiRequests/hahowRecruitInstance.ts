import axios from 'axios';
import { api } from '#configs';

export const hahowRecruitInstance = axios.create({
  baseURL: api.hahowRecruitApiUrl,
});
