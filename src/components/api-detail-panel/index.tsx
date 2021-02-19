import ReactJson from 'react-json-view'
import { BiCalendar, BiDoorOpen, BiTimer } from 'react-icons/bi';
import { CgDebug } from 'react-icons/cg';
import { DiCode } from 'react-icons/di';
import { MdCallMade, MdCallReceived } from 'react-icons/md';
import { useAPIDetail } from '../../hooks/api-detail';
import { Container, Details, DetailPanel, Divider, Summary, SummaryStat } from './styles';

const JSON_TEST = {
  field1: 'value1',
  field2: 'value2',
  field3: 'value3',
  field4: 'value4',
  field5: 'value5',
}

const APIDetailPanel = (): React.ReactElement => {
  const { show, setShowDetail } = useAPIDetail();
  return (
    <Container show={show}>
      <span className="btn-close" onClick={setShowDetail}>&times;</span>

      <Details>

        <DetailPanel>
          <div className="title">
            <MdCallReceived className="request" />
            <span>Request Header</span>
          </div>
          <div className="body">
            <ReactJson src={JSON_TEST} collapsed={true} enableClipboard={false} displayDataTypes={false} />
          </div>
        </DetailPanel>

        <DetailPanel>
          <div className="title">
            <MdCallReceived className="request" />
            <span>Request Body</span>
          </div>
          <div className="body">
            <ReactJson src={JSON_TEST} collapsed={true} enableClipboard={false} displayDataTypes={false} />
          </div>
        </DetailPanel>

        <Divider />

        <DetailPanel>
          <div className="title">
            <MdCallMade className="response" />
            <span>Response Header</span>
          </div>
          <div className="body">
            <ReactJson src={JSON_TEST} collapsed={true} enableClipboard={false} displayDataTypes={false} />
          </div>
        </DetailPanel>

        <DetailPanel>
          <div className="title">
            <MdCallMade className="response" />
            <span>Response Body</span>
          </div>
          <div className="body">
            <ReactJson src={JSON_TEST} collapsed={true} enableClipboard={false} displayDataTypes={false} />
          </div>
        </DetailPanel>

        <Divider />

        <DetailPanel>
          <div className="title">
            <CgDebug className="debug" />
            <span>Debug</span>
          </div>
          <div className="body">
            <ReactJson src={JSON_TEST} collapsed={true} enableClipboard={false} displayDataTypes={false} />
          </div>
        </DetailPanel>

      </Details>

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
    </Container>
  )
}

export default APIDetailPanel
