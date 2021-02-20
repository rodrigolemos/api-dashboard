import { useState, createContext, useContext } from 'react';

interface IAPIDetail {
  show: boolean;
  setShowDetail(table?: string, seq?: number): void;
  clearDetail(): void;
  detailQuery: IAPIDetailQuery;
}

interface IAPIDetailQuery {
  api?: string;
  id?: number;
}
interface IAPIDetailContextProvider {
  children: JSX.Element[] | JSX.Element;
}

const APIDetailContext = createContext({} as IAPIDetail);

const APIDetailContextProvider = ({ children }: IAPIDetailContextProvider) => {
  const [show, setShow] = useState<boolean>(false);
  const [detailQuery, setDetailQuery] = useState<IAPIDetailQuery>({
    api: '',
    id: 0
  });

  const setShowDetail = (api?: string, id?: number): void => {
    setShow(!show);
    setDetailQuery({
      api,
      id
    });
  }

  const clearDetail = (): void => {
    setShow(false);
    setDetailQuery({
      api: '',
      id: 0
    });
  }

  return (
    <APIDetailContext.Provider value={{ show, setShowDetail, clearDetail, detailQuery }}>
      { children }
    </APIDetailContext.Provider>
  )
}

const useAPIDetail = () => {
  const context = useContext(APIDetailContext);
  if (!context) throw new Error('useAPIDetail must be used within APIDetailContextProvider');
  return context;
}

export { APIDetailContextProvider, useAPIDetail }