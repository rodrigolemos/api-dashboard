import { BiCalendar, BiDoorOpen, BiTimer } from 'react-icons/bi';
import { DiCode } from 'react-icons/di';
import { useAPIDetail } from '../../hooks/api-detail';
import { Container, Details, Summary, SummaryStat } from './styles';

const APIDetailPanel = (): React.ReactElement => {
  const { show, setShowDetail } = useAPIDetail();
  return (
    <Container show={show}>
      <span className="btn-close" onClick={setShowDetail}>&times;</span>
      <Summary>
        <h2>Resumo da Requisição</h2>
        <SummaryStat>
          <div className="badge">
            <BiCalendar />
          </div>
          <div className="title">Data/Hora</div>
          <div className="content">18/02/2021 18:56:00</div>
        </SummaryStat>

        <SummaryStat>
          <div className="badge">
            <BiDoorOpen />
          </div>
          <div className="title">IP Entrada</div>
          <div className="content">192.168.1.1/15015</div>
        </SummaryStat>

        <SummaryStat>
          <div className="badge">
            <DiCode />
          </div>
          <div className="title">HTTP Status</div>
          <div className="content">200</div>
        </SummaryStat>

        <SummaryStat>
          <div className="badge">
            <BiTimer />
          </div>
          <div className="title">Duração</div>
          <div className="content">1523.55</div>
        </SummaryStat>
      </Summary>
      <Details>Details</Details>
    </Container>
  )
}

export default APIDetailPanel
