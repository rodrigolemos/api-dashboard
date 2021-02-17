import axios from 'axios';

export const api = axios.create({
  // baseURL: 'https://www2.uranet.com.br/webservices/intergrall-api/logs-api/',
  // baseURL: 'https://homologa.intergrall.com.br/webservices/intergrall-api/logs-api/',
  baseURL: 'https://linux03/webservices/intergrall-api/logs-api/',
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
})
