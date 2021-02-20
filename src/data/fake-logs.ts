import { ILog } from '../hooks/logs';

export const mock = (api: string, additionalFilters: string, success: boolean, timeout: number): Promise<ILog[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve([
          {
            id: 1,
            ip: '192.168.1.0',
            status: 200,
            route: '/primeira-api',
            date: new Date(),
            duration: 152.10,
            requestHeader: {},
            requestBody: {},
            responseHeader: {},
            responseBody: {}
          },
          {
            id: 2,
            ip: '192.168.1.0',
            status: 200,
            route: '/segunda-api',
            date: new Date(),
            duration: 1003.10,
            requestHeader: {},
            requestBody: {},
            responseHeader: {},
            responseBody: {}
          },
          {
            id: 3,
            ip: '192.168.1.0',
            status: 200,
            route: '/terceira-api',
            date: new Date(),
            duration: 45.10,
            requestHeader: {},
            requestBody: {},
            responseHeader: {},
            responseBody: {}
          },
          {
            id: 4,
            ip: '192.168.1.0',
            status: 501,
            route: '/quarta-api',
            date: new Date(),
            duration: 92.80,
            requestHeader: {},
            requestBody: {},
            responseHeader: {},
            responseBody: {}
          },
          {
            id: 5,
            ip: '192.168.1.0',
            status: 404,
            route: '/quarta-api',
            date: new Date(),
            duration: 450.10,
            requestHeader: {},
            requestBody: {},
            responseHeader: {},
            responseBody: {}
          },
        ].filter(log => log.route === api))
      } else {
        reject({ message: 'Error' });
      }
    }, timeout);
  });

}
