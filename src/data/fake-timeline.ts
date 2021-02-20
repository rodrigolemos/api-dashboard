import { ILog, ITimeline } from '../hooks/logs';

export const mock = (api: string, additionalFilters: string, success: boolean, timeout: number): Promise<ITimeline> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        
        const logs: ILog[] = JSON.parse(localStorage.getItem('api-dashboard') || '');

        if (!logs) return;

        const apiLogs = logs.filter(log => log.route === api);

        const categoriesArray = apiLogs.map(log => {
          return new Date(log.date).getHours();
        })

        const categoriesSet = new Set(categoriesArray.sort((a, b) => a - b));

        const categories = Array.from(categoriesSet);

        const data = [];

        for (let category of categories) {

          const qtd = logs.filter(log => new Date(log.date).getHours() === category).length;

          data.push(qtd);

        }

        const timeline: ITimeline = {
          series: {
            name: 'Requisições',
            data
          },
          categories
        }

        return resolve(timeline);
      } else {
        reject({ message: 'Error' });
      }
    }, timeout);
  });

}
