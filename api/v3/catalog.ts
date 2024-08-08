import { unsecureFetch } from './base';

const HOST = 'sociolla.com'; // TODO: use config to support multiple env
const CATALOG_API = `https://catalog-api.${HOST}`;

// TODO: API kena CORS
const fetchBrands = (params?: any) =>
  unsecureFetch(CATALOG_API + '/brands', params);

const fetchBrandsLetters = (params?: any) =>
  unsecureFetch(CATALOG_API + '/brands/letters', params);

export { fetchBrands, fetchBrandsLetters };
