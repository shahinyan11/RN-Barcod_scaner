import apiClient from '../utils/ApiClient';

const url = '/stockMovements?exclude=lineItems&direction=OUTBOUND';

export function getOrders() {
  return apiClient.get(url);
}
