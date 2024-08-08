import axios from 'axios';

const HOST = 'sociolla.com'; // TODO: use config to support multiple env
const CATALOG_API = `https://catalog-api.${HOST}/v3`;

const instance = axios.create({
  baseURL: CATALOG_API,
});

const fetchBrands = (params?: any, mock?: boolean) =>
  mock
    ? require('../mock/featuredBrands').default
    : instance.get('/brands', { params });

const fetchBrandsLetters = (params?: any, mock?: boolean) =>
  mock
    ? require('../mock/brandsLetters').default
    : instance.get('/brands/letters', { params });

export { fetchBrands, fetchBrandsLetters };
