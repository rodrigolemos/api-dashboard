import { useState, createContext, useContext } from 'react';

interface IAPIDetail {
  show: boolean;
  setShowDetail(table?: string, seq?: number): void;
  clearDetail(): void;
  detailQuery: IAPIDetailQuery;
}

interface IAPIDetailQuery {
  table?: string;
  seq?: number;
}
interface IAPIDetailContextProvider {
  children: JSX.Element[] | JSX.Element;
}

const APIDetailContext = createContext({} as IAPIDetail);

const APIDetailContextProvider = ({ children }: IAPIDetailContextProvider) => {
  const [show, setShow] = useState<boolean>(false);
  const [detailQuery, setDetailQuery] = useState<IAPIDetailQuery>({
    table: '',
    seq: 0
  });

  const setShowDetail = (table?: string, seq?: number): void => {
    setShow(!show);
    setDetailQuery({
      table,
      seq
    });
  }

  const clearDetail = (): void => {
    setShow(false);
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