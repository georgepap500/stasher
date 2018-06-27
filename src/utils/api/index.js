import axios from 'axios';
import qs from 'qs';
import MockAdapter from 'axios-mock-adapter';

const API_URL = process.env.API_URL;
let httpMock = null;

if (process.env.NODE_ENV === 'test') {
  httpMock = new MockAdapter(axios);
}

// let token = null;

axios.defaults.headers.common.Accept = 'application/json';
// setToken(token);

// Interceptors -----------------------------------------
const service = axios.create({
  baseURL: API_URL
});

const blobService = axios.create({
  baseURL: API_URL,
  responseType: 'blob'
});

const apiServices = [service, blobService];

// ----- Before
service.interceptors.request.use(
  config => {
    config.paramsSerializer = params => {
      return qs.stringify(params, {
        arrayFormat: 'brackets'
      });
    };
    return config;
  },
  () => {
    return Promise.reject();
  }
);

// ----- After
export function setupResponseInterceptors(store) {
  // Add a response interceptor
  apiServices.forEach(s => {
    s.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
        console.log(error.response);

        switch (error.response.status) {
          case 401:
            switch (error.response.data.error) {
              case 'token_expired':
                // store.dispatch({ type: TYPES.UNAUTH_USER });
                break;
              default:
                break;
            }

            break;
          case 400:
            switch (error.response.data.error) {
              case 'token_invalid':
              case 'token_not_provided':
                // store.dispatch({ type: TYPES.UNAUTH_USER });
                break;
              default:
                break;
            }

            break;
          default:
            return Promise.reject(error.response);
        }

        return Promise.reject(error.response);
      }
    );
  });
}
// ------------------------------------------------------

// Instance -------------------------------------------
export const apiService = service;
export const apiBlobService = blobService;
export const mock = httpMock;

export function setToken(token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
