import { useCallback, useState, createContext, useContext } from 'react';
import { IForm } from '../components/form/interfaces';
import { mock } from '../data/fake-logs';

export interface IRequest {
  isLoading: boolean;
  isError: boolean;
}

export interface ILog {
  id: number;
  ip: string;
  status: number;
  route: string;
  date: Date;
  duration: number;
  requestHeader: object;
  requestBody: object;
  responseHeader: object;
  responseBody: object;
}

interface ILogData {
  logData: ILog[] | undefined;
  logResult: ILogResult | undefined;
  requestStatus: IRequest;
  fetchLogData(formFilters: IForm): Promise<void>;
  clearQuery(): void;
}

interface IResult {
  qtd: number;
  ms: number;
}
interface ILogResult {
  total: IResult;
  success: IResult;
  clientError: IResult;
  serverError: IResult;
}

interface ILogDataProvider {
  children: JSX.Element[] | JSX.Element;
}

export interface ITimeline {
  series: {
    name: string;
    data: number[];
  };
  categories: number[];
}

const APILogsContext = createContext({} as ILogData);

const LogDataProvider = ({ children }: ILogDataProvider) => {
  const [logData, setLogData] = useState<ILog[]>();
  const [logResult, setLogResult] = useState<ILogResult>();
  const [requestStatus, setRequestStatus] = useState<IRequest>({
    isLoading: false,
    isError: false
  });

  const calcAverageTime = useCallback((status: IResult): number => {
    let average: number = 0;
    if (status.qtd > 0) {
      average = status.ms / status.qtd;
    } else {
      average = status.ms / 1;
    }
    return Number(average.toFixed(2));
  }, []);

  const fetchLogData = useCallback(async (formFilters: IForm): Promise<void> => {

    setRequestStatus({
      isLoading: true,
      isError: false
    });

    try {

      const logs = await mock(
        formFilters.api,
        JSON.stringify(formFilters.additionalFilters),
        true, 1000
      );

      setLogData(logs);

      const newlogResult = logs.reduce(
        (result: ILogResult, log) => {
          if (log.status >= 200 && log.status < 300) {
            result.success.qtd++;
            result.success.ms += Number(log.duration);
          }
          if (log.status >= 400 && log.status < 500) {
            result.clientError.qtd++;
            result.clientError.ms += Number(log.duration);
          }
          if (log.status >= 500 || !log.status) {
            result.serverError.qtd++;
            result.serverError.ms += Number(log.duration);
          }
          result.total.qtd++;
          result.total.ms += Number(log.duration);
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
        }
      )

      newlogResult.total.ms = calcAverageTime(newlogResult.total);
      newlogResult.success.ms = calcAverageTime(newlogResult.success);
      newlogResult.clientError.ms = calcAverageTime(newlogResult.clientError);
      newlogResult.serverError.ms = calcAverageTime(newlogResult.serverError);

      setLogResult(newlogResult);

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
  }, [calcAverageTime]);

  const clearQuery = (): void => {
    setLogData(undefined);
  }

  return (
    <APILogsContext.Provider value={{ logData, logResult, requestStatus, fetchLogData, clearQuery }}>
      { children }
    </APILogsContext.Provider>
  )
}

const useLogData = () => {
  const context = useContext(APILogsContext);
  if (!context) throw new Error('useLogData must be used within APILogsContext');
  return context;
}

export { LogDataProvider, useLogData }
