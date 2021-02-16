import { useState, createContext, useContext } from 'react';
import { api } from '../services/api';

import { IForm } from '../components/form/interfaces';

interface IAPI {
  seq: number;
  ip_entrada: string;
  pgm: string;
  metodo: string;
  data_hora: Date;
  tempo_exec: number;
}

interface IAPIData {
  APIData: IAPI | undefined;
  fetchAPIData(formFilters: IForm): Promise<void>;
}

interface IAPIDataProvider {
  children: JSX.Element[] | JSX.Element;
}

const APILogsContext = createContext({} as IAPIData);

const APIDataProvider = ({ children }: IAPIDataProvider) => {
  const [APIData, setAPIData] = useState<IAPI>();

  const fetchAPIData = async (formFilters: IForm): Promise<void> => {
    try {

      const response = await api.get<IAPI>('/logs', {
        params: {
          table: formFilters.api
        }
      })

      setAPIData(response.data)

      console.log(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <APILogsContext.Provider value={{ APIData, fetchAPIData }}>
      { children }
    </APILogsContext.Provider>
  )
}

const useAPIData = () => {
  const context = useContext(APILogsContext);
  if (!context) throw new Error('useAPIData must be used within APILogsContext');
  return context;
}

export { APIDataProvider, useAPIData }
