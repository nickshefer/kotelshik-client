import { authHost, host } from './index';
import { jwtDecode } from 'jwt-decode';

export const registration = async (name, phone, password) => {
  const { data } = await host.post('api/user/registration', {
    name,
    phone,
    password,
    role: 'ADMIN',
  });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const login = async (phone, password) => {
  const { data } = await host.post('api/user/login', { phone, password });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await authHost.get('api/user/auth');
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};
