import ReactLoading from 'react-loading';
import { useAPIData } from '../../hooks/logs'
import { MainWrapper } from './styles';
interface IMainChildren {
  children: JSX.Element[] | JSX.Element;
}

const Main = ({ children }: IMainChildren): React.ReactElement => {
  const { APIData, requestStatus } = useAPIData();

  return (
    <MainWrapper>
      {!requestStatus.isLoading ? (
        APIData ? (
          children
        ) : (
          <div />
        )
      ) : (
        <ReactLoading type="spin" color="#2684FF" height="45px" width="45px" />
      )}
    </MainWrapper>
  )
}

export default Main
