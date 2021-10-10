import apiClient from '../utils/ApiClient';

export function login(data: any) {
  return apiClient.post('/auth', {
    params: data,
  });
}
