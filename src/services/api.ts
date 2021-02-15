import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://linux03/webservices/intergrall-api/logs-api/'
})
