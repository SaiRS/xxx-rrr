import { XXXRequest } from '@vendors/requests';

// 定制化timing的请求
export const timingRequest = new XXXRequest({
  baseURL: 'https://web.timingapp.com/api/v1',
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TIMING_KEY}`,
  },
});
