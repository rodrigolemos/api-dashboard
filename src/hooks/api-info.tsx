import { useState, createContext, useContext } from 'react';

export interface IRequest {
  isLoading: boolean;
  isError: boolean;
}

export interface IAPI {
  api: string;
  rota: string;
  metodo: string;
  representante: string;
  login_cri: string;
  name: string;
  group: string;
  responsavel: string;
}

interface IAPIInfo {
  APIInfo: IAPI | undefined;
  setAPIInfo(APIInfo: IAPI): void;
}

interface IAPIInfoProvider {
  children: JSX.Element[] | JSX.Element;
}

const APIInfoContext = createContext({} as IAPIInfo);

const APIInfoProvider = ({ children }: IAPIInfoProvider) => {
  const [APIInfo, setApiInfo] = useState<IAPI>();

  const setAPIInfo = (APIInfo: IAPI): void => {
    setApiInfo(APIInfo)
  }

  return (
    <APIInfoContext.Provider value={{ APIInfo, setAPIInfo }}>
      { children }
    </APIInfoContext.Provider>
  )
}

const useAPIInfo = () => {
  const context = useContext(APIInfoContext);
  if (!context) throw new Error('useAPIInfo must be used within APIInfoContext');
  return context;
}

export { APIInfoProvider, useAPIInfo }