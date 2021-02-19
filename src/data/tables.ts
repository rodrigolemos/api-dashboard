export interface IAPI {
  api: string;
  route: string;
  method: string;
  name: string;
  group: string;
}

export const mock = (success: boolean, timeout: number): Promise<IAPI[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve([
          {
            api: 'PrimeiraAPI',
            route: '/primeira-api',
            method: 'GET',
            name: 'Primeira API',
            group: 'primeira',
          },
          {
            api: 'PrimeiraAPI',
            route: '/primeira-api',
            method: 'GET',
            name: 'Primeira API',
            group: 'primeira',
          },
        ])
      } else {
        reject({ message: 'Error' });
      }
    }, timeout);
  });

}
