import axios from 'axios';
import Config from 'config';

// 定制化timing的请求
export const timingRequest = axios.create({
  baseURL: 'https://web.timingapp.com/api/v1',
  headers: {
    Authorization: `Bearer ${Config.get('Timing.appKey')}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
export default timingRequest;
