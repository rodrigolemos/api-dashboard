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
            method: 'DELETE',
            date: new Date(),
            duration: 152.10,
          },
          {
            id: 1,
            ip: '192.168.1.0',
            status: 200,
            route: '/segunda-api',
            method: 'DELETE',
            date: new Date(),
            duration: 152.10,
          },
        ])
      } else {
        reject({ message: 'Error' });
      }
    }, timeout);
  });

}
