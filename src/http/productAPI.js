import { authHost, host } from './index';

export const createType = async type => {
  const { data } = await authHost.post('api/type', type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await host.get('api/type');
  return data;
};

export const deleteOneType = async id => {
  const { data } = await authHost.delete('api/type', { params: { id } });
  return data;
};

export const createBrand = async brand => {
  const { data } = await authHost.post('api/brand', brand);
  return data;
};

export const fetchBrands = async () => {
  const { data } = await host.get('api/brand');
  return data;
};

export const deleteOneBrand = async id => {
  const { data } = await authHost.delete('api/brand', { params: { id } });
  return data;
};

export const createProduct = async product => {
  const { data } = await authHost.post('api/product', product);
  return data;
};

export const fetchProducts = async (typeId, brandId, page = 1, limit = 5) => {
  const { data } = await host.get('api/product', {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneProduct = async slug => {
  const { data } = await host.get('api/product/' + slug);
  return data;
};

export const deleteOneProduct = async id => {
  const { data } = await authHost.delete('api/product/', { params: { id } });
  return data;
};
