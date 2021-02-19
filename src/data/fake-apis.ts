import { IAPI } from '../components/form/interfaces';

export const mock = (success: boolean, timeout: number): Promise<IAPI[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve([
          {
            route: '/primeira-api',
            method: 'DELETE',
            name: 'Primeira API',
            group: 'Teste',
          },
          {
            route: '/segunda-api',
            method: 'PATCH',
            name: 'Segunda API',
            group: 'Teste',
          },
          {
            route: '/terceira-api',
            method: 'POST',
            name: 'Terceira API',
            group: 'Homologação',
          },
          {
            route: '/quarta-api',
            method: 'PUT',
            name: 'Quarta API',
            group: 'Homologação',
          },
          {
            route: '/quinta-api',
            method: 'GET',
            name: 'Quinta API',
            group: 'Produção',
          },
        ])
      } else {
        reject({ message: 'Error' });
      }
    }, timeout);
  });

}
