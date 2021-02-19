import { useCallback, useState, useEffect } from 'react';
import ReactJson from 'react-json-view'
import { BiCalendar, BiDoorOpen, BiTimer } from 'react-icons/bi';
import { CgDebug } from 'react-icons/cg';
import { DiCode } from 'react-icons/di';
import { MdCallMade, MdCallReceived } from 'react-icons/md';
import { useAPIDetail } from '../../hooks/api-detail';
import { DurationBadge, StatusBadge } from '../table/styles';
import { Container, Details, DetailPanel, Divider, Summary, SummaryStat } from './styles';
// import { formatDate } from '../../utils/formatDate';
import { api } from '../../services/api';

interface IRequest {
  isLoading: boolean;
  isError: boolean;
}
interface IDetails {
  seq: number;
  data_hora: Date;
  ip_entrada: string;
  porta_entrada: string;
  http_status: number;
  tempo_exec: number;
  header_in: object | string;
  xml_in: object | string;
  header_out: object | string;
  xml_out: object | string;
  debug: string;
}

const APIDetailPanel = (): React.ReactElement => {
  const {show, setShowDetail, detailQuery} = useAPIDetail();
  const [details, setDetails] = useState<IDetails>();
  const [requestStatus, setRequestStatus] = useState<IRequest>({
    isLoading: false,
    isError: false
  });

  const handleJSON = useCallback((data: object | string | undefined): object => {
    if (typeof data === 'object') {
      return data;
    }
    if (typeof data === 'undefined') {
      data = 'Indisponível';
    }
    return { data };
  }, []);

  const fetchDetails = useCallback(async (): Promise<void> => {

    if (!detailQuery.table || !detailQuery.seq) return;

    setRequestStatus({
      isLoading: true,
      isError: false
    });

    try {
      const response = await api.get<IDetails>('/logs/detalhe', {
        params: {
          table: detailQuery.table,
          seq: detailQuery.seq
        }
      })

      setDetails(response.data);

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
  }, [detailQuery]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  return (
    <Container show={show}>
      <span className="btn-close" onClick={() => setShowDetail()}>&times;</span>
      {!requestStatus.isLoading ? (
        <>
          <Details>
            <DetailPanel>
              <div className="title">
                <MdCallReceived className="request" />
                <span>Request Header</span>
              </div>
              <div className="body">
                <ReactJson src={handleJSON(details?.header_in)} collapsed={true} enableClipboard={false} displayDataTypes={false} />
              </div>
            </DetailPanel>

            <DetailPanel>
              <div className="title">
                <MdCallReceived className="request" />
                <span>Request Body</span>
              </div>
              <div className="body">
                <ReactJson src={handleJSON(details?.xml_in)} collapsed={false} enableClipboard={false} displayDataTypes={false} />
              </div>
            </DetailPanel>

            <Divider />

            <DetailPanel>
              <div className="title">
                <MdCallMade className="response" />
                <span>Response Header</span>
              </div>
              <div className="body">
                <ReactJson src={handleJSON(details?.header_out)} collapsed={true} enableClipboard={false} displayDataTypes={false} />
              </div>
            </DetailPanel>

            <DetailPanel>
              <div className="title">
                <MdCallMade className="response" />
                <span>Response Body</span>
              </div>
              <div className="body">
                <ReactJson src={handleJSON(details?.xml_out)} collapsed={false} enableClipboard={false} displayDataTypes={false} />
              </div>
            </DetailPanel>

            <Divider />

            <DetailPanel>
              <div className="title">
                <CgDebug className="debug" />
                <span>Debug</span>
              </div>
              <div className="body">
                <pre>{details?.debug}</pre>
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
              <div className="content">{details?.data_hora}</div>
            </SummaryStat>

            <SummaryStat>
              <div className="badge">
                <BiDoorOpen />
              </div>
              <div className="title">IP Entrada</div>
              <div className="content">{details?.ip_entrada}/{details?.porta_entrada}</div>
            </SummaryStat>

            <SummaryStat>
              <div className="badge">
                <DiCode />
              </div>
              <div className="title">HTTP Status</div>
              <div className="content">
                <StatusBadge status={details?.http_status || 0}>{details?.http_status}</StatusBadge>
              </div>
            </SummaryStat>

            <SummaryStat>
              <div className="badge">
                <BiTimer />
              </div>
              <div className="title">Duração</div>
              <div className="content">
                <DurationBadge duration={details?.tempo_exec || 0}>{details?.tempo_exec}</DurationBadge>
              </div>
            </SummaryStat>
          </Summary>
        </>
      ) : (
        <span>Carregando...</span>
      )}
    </Container>
  )
}

export default APIDetailPanel
