import { ILog } from '../hooks/logs';
import { isBefore } from 'date-fns';

export const mock = (
  api: string,
  additionalFilters: string,
  success: boolean,
  timeout: number,
  id?: number): Promise<ILog[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        
        if (id) {
          const logs = JSON.parse(localStorage.getItem('api-dashboard') || '');
          
          const response = logs.filter((responseApi: ILog) => (
            responseApi.route === api &&
            responseApi.id === id
          ));

          return resolve(response);
        }
        
        const getRandomInt = (min: number, max: number): number => {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min)) + min;
        }

        const getRandom = (min: number, max: number): number => {
          return Math.random() * (max - min) + min;
        }

        const apis = [
          '/primeira-api',
          '/segunda-api',
          '/terceira-api',
          '/quarta-api',
          '/quinta-api',
        ];

        const httpStatus = [200, 200, 400, 500];
        
        const fakeLogs = [];

        for (let i = 1; i <= 75; i++) {
          const randomHour = getRandomInt(1, 23);
          const randomMinute = getRandomInt(1, 59);
          const randomSecond = getRandomInt(1, 59);
          const randomApi = getRandomInt(0, 2);
          const randomStatus = getRandomInt(0, 4);
          const randomDuration = getRandom(97.25, 1050.37);
          
          const randomContent = 'lorem ipsum';

          fakeLogs.push({
            id: i,
            ip: '127.0.0.1:8000',
            route: apis[randomApi],
            status: httpStatus[randomStatus],
            date: new Date(new Date().setHours(randomHour, randomMinute, randomSecond)),
            duration: Number(randomDuration.toFixed(2)),
            requestHeader: {
              'Content-Type': 'application/json',
              'Accept': '*/*',
            },
            requestBody: {
              'message': randomContent
            },
            responseHeader: {
              'Connection': 'keep-alive',
              'Content-Type': 'application/json',
            },
            responseBody: {
              'message': randomContent
            }
          })
        }

        const response = fakeLogs.filter(log => log.route === api).sort((a, b) => {
          if (isBefore(a.date, b.date)) {
            return - 1;
          }
          return 1;
        })

        localStorage.setItem('api-dashboard', JSON.stringify(response));

        return resolve(response);
      } else {
        reject({ message: 'Error' });
      }
    }, timeout);
  });

}
