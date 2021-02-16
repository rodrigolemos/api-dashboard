import { useState, createContext, useContext } from 'react';
import { api } from '../services/api';

import { IForm } from '../components/form/interfaces';

export interface IRequest {
  isLoading: boolean;
  isError: boolean;
}

interface IAPI {
  seq: number;
  ip_entrada: string;
  rota: string;
  metodo: string;
  verbo: string;
  status: number;
  data_hora: Date;
  tempo_exec: number;
}

interface IAPIData {
  APIData: IAPI[] | undefined;
  requestStatus: IRequest;
  fetchAPIData(formFilters: IForm): Promise<void>;
  clearQuery(): void;
}

interface IAPIDataProvider {
  children: JSX.Element[] | JSX.Element;
}

const APILogsContext = createContext({} as IAPIData);

const APIDataProvider = ({ children }: IAPIDataProvider) => {
  const [APIData, setAPIData] = useState<IAPI[]>();
  const [requestStatus, setRequestStatus] = useState<IRequest>({
    isLoading: false,
    isError: false
  });

  const fetchAPIData = async (formFilters: IForm): Promise<void> => {

    setRequestStatus({
      isLoading: true,
      isError: false
    });

    try {

      const response = await api.get<IAPI[]>('/logs', {
        params: {
          table: formFilters.api
        }
      })

      setAPIData(response.data);

      setRequestStatus({
        isLoading: false,
        isError: false
      });

    } catch (error) {

      setRequestStatus({
        isLoading: false,
        isError: error.message
      });

    }
  }

  const clearQuery = (): void => {
    setAPIData(undefined);
  }

  return (
    <APILogsContext.Provider value={{ APIData, requestStatus, fetchAPIData, clearQuery }}>
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
