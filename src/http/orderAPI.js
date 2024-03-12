import { authHost, host } from '.';

export const createOrder = async order => {
  const { data } = await host.post('api/order', order);
  return data;
};

export const fetchAllOrders = async () => {
  const { data } = await authHost.get('api/order');
  return data;
};

export const fetchOrdersByUserId = async userId => {
  const { data } = await authHost.get('api/order/user/' + userId);
  return data;
};

export const fetchOrderById = async id => {
  const { data } = await authHost.get('api/order/' + id);
  return data;
};
