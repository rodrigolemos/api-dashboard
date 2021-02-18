import { useCallback, useState, createContext, useContext } from 'react';
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
  APIResult: IAPIResult | undefined;
  requestStatus: IRequest;
  fetchAPIData(formFilters: IForm): Promise<void>;
  clearQuery(): void;
}

interface IResult {
  qtd: number;
  ms: number;
}
interface IAPIResult {
  total: IResult;
  success: IResult;
  clientError: IResult;
  serverError: IResult;
}

interface IAPIDataProvider {
  children: JSX.Element[] | JSX.Element;
}

const APILogsContext = createContext({} as IAPIData);

const APIDataProvider = ({ children }: IAPIDataProvider) => {
  const [APIData, setAPIData] = useState<IAPI[]>();
  const [APIResult, setAPIResult] = useState<IAPIResult>();
  const [requestStatus, setRequestStatus] = useState<IRequest>({
    isLoading: false,
    isError: false
  });

  const calcAverageTime = (status: IResult): number => {
    let average: number = 0;
    if (status.qtd > 0) {
      average = status.ms / status.qtd;
    } else {
      average = status.ms / 1;
    }
    return Number(average.toFixed(2));
  }

  const fetchAPIData = useCallback(async (formFilters: IForm): Promise<void> => {

    setRequestStatus({
      isLoading: true,
      isError: false
    });

    try {

      const response = await api.get<IAPI[]>('/logs', {
        params: {
          table: formFilters.api,
          date: formFilters.date.toISOString().split('T')[0],
          startTime: formFilters.startTime,
          finishTime: formFilters.finishTime,
          additionalFilters: JSON.stringify(formFilters.additionalFilters),
        }
      });

      setAPIData(response.data);

      const apiResult = response.data.reduce(
        (result: IAPIResult, log) => {
          if (log.status >= 200 && log.status < 300) {
            result.success.qtd++;
            result.success.ms += Number(log.tempo_exec);
          }
          if (log.status >= 400 && log.status < 500) {
            result.clientError.qtd++;
            result.clientError.ms += Number(log.tempo_exec);
          }
          if (log.status >= 500 || !log.status) {
            result.serverError.qtd++;
            result.serverError.ms += Number(log.tempo_exec);
          }
          result.total.qtd++;
          result.total.ms += Number(log.tempo_exec);
          return result;
        }, {
          total: {
            qtd: 0,
            ms: 0
          },
          success: {
            qtd: 0,
            ms: 0
          },
          clientError: {
            qtd: 0,
            ms: 0
          },
          serverError: {
            qtd: 0,
            ms: 0
          },
        })

      apiResult.total.ms = calcAverageTime(apiResult.total);
      apiResult.success.ms = calcAverageTime(apiResult.success);
      apiResult.clientError.ms = calcAverageTime(apiResult.clientError);
      apiResult.serverError.ms = calcAverageTime(apiResult.serverError);

      setAPIResult(apiResult);

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
  }, []);

  const clearQuery = (): void => {
    setAPIData(undefined);
  }

  return (
    <APILogsContext.Provider value={{ APIData, APIResult, requestStatus, fetchAPIData, clearQuery }}>
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
