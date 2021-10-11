export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_REQUEST_SUCCESS = 'GET_ORDERS_REQUEST_SUCCESS';
export const GET_ORDERS_REQUEST_FAIL = 'GET_ORDERS_REQUEST_FAIL';

export function getOrdersAction(callback: (products: any) => void) {
  return {
    type: GET_ORDERS_REQUEST,
    callback,
  };
}

export function getPickListAction(id: any, callback: (products: any) => void) {
  return {
    type: GET_ORDERS_REQUEST,
    payload: {id},
    callback,
  };
}
