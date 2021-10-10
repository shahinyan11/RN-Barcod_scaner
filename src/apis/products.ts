import apiClient from '../utils/ApiClient';

export function getProducts() {
  return apiClient.get('/generic/product');
}
