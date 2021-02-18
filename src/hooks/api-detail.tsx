import { useState, createContext, useContext } from 'react';

interface IAPIDetail {
  show: boolean;
  setShowDetail(): void;
}

interface IAPIDetailContextProvider {
  children: JSX.Element[] | JSX.Element;
}

const APIDetailContext = createContext({} as IAPIDetail);

const APIDetailContextProvider = ({ children }: IAPIDetailContextProvider) => {
  const [show, setShow] = useState<boolean>(false);

  const setShowDetail = (): void => {
    setShow(!show);
  }

  return (
    <APIDetailContext.Provider value={{ show, setShowDetail }}>
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