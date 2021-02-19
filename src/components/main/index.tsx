import ReactLoading from 'react-loading';
import { useLogData } from '../../hooks/logs'
import { MainWrapper, MainInfo } from './styles';
interface IMainChildren {
  children: JSX.Element[] | JSX.Element;
}

const Main = ({ children }: IMainChildren): React.ReactElement => {
  const { logData, requestStatus } = useLogData();

  return (
    <MainWrapper>
      {!requestStatus.isLoading ? (
        logData ? (
          children
        ) : (
          <MainInfo>Preencha o formulário para consultar.</MainInfo>
        )
      ) : (
        <ReactLoading type="spin" color="#2684FF" height="45px" width="45px" />
      )}
    </MainWrapper>
  )
}

export default Main
