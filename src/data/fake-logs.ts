import { ILog } from '../hooks/logs';

export const mock = (api: string, additionalFilters: string, success: boolean, timeout: number): Promise<ILog[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        
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

        for (let i = 1; i <= 25; i++) {
          const randomHour = getRandomInt(1, 23);
          const randomMinSec = getRandomInt(1, 59);
          const randomApi = getRandomInt(0, 2);
          const randomStatus = getRandomInt(0, 4);
          const randomDuration = getRandom(97.25, 1050.37);
          
          fakeLogs.push({
            id: i,
            ip: '127.0.0.1:8000',
            route: apis[randomApi],
            status: httpStatus[randomStatus],
            date: new Date(new Date().setHours(randomHour, randomMinSec, randomMinSec)),
            duration: Number(randomDuration.toFixed(2)),
            requestHeader: {},
            requestBody: {},
            responseHeader: {},
            responseBody: {}
          })
        }

        resolve(fakeLogs.filter(log => log.route === api))
      } else {
        reject({ message: 'Error' });
      }
    }, timeout);
  });

}
