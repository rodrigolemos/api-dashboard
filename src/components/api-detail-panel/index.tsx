import { useCallback, useState, useEffect } from 'react';
import ReactJson from 'react-json-view'
import { BiCalendar, BiDoorOpen, BiTimer } from 'react-icons/bi';
import { DiCode } from 'react-icons/di';
import { MdCallMade, MdCallReceived } from 'react-icons/md';
import { useAPIDetail } from '../../hooks/api-detail';
import { DurationBadge, StatusBadge } from '../table/styles';
import { Container, Details, DetailPanel, Divider, Summary, SummaryStat } from './styles';
import { formatDate } from '../../utils/formatDate';
import { ILog } from '../../hooks/logs';
import { mock } from '../../data/fake-logs';

interface IRequest {
  isLoading: boolean;
  isError: boolean;
}

const APIDetailPanel = (): React.ReactElement => {
  const {show, setShowDetail, detailQuery} = useAPIDetail();
  const [details, setDetails] = useState<ILog>();
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

  const handleDate = (date: Date | undefined): string => {
    if (typeof date !== 'undefined') {
      if (typeof date !== 'string') {
        return formatDate(date);  
      }
      return formatDate(new Date(date));
    }
    return 'Indisponível';
  }

  const fetchDetails = useCallback(async (): Promise<void> => {

    if (!detailQuery.api || !detailQuery.id) return;

    setRequestStatus({
      isLoading: true,
      isError: false
    });

    try {

      const details: ILog[] = await mock(
        detailQuery.api,
        'additionalFilters',
        true,
        1500,
        detailQuery.id
      );

      setDetails(details[0]);

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
                <span>Header Recebido</span>
              </div>
              <div className="body">
                <ReactJson src={handleJSON(details?.requestHeader)} collapsed={false} enableClipboard={false} displayDataTypes={false} />
              </div>
            </DetailPanel>

            <DetailPanel>
              <div className="title">
                <MdCallReceived className="request" />
                <span>Body Recebido</span>
              </div>
              <div className="body">
                <ReactJson src={handleJSON(details?.requestBody)} collapsed={false} enableClipboard={false} displayDataTypes={false} />
              </div>
            </DetailPanel>

            <Divider />

            <DetailPanel>
              <div className="title">
                <MdCallMade className="response" />
                <span>Header Respondido</span>
              </div>
              <div className="body">
                <ReactJson src={handleJSON(details?.responseHeader)} collapsed={false} enableClipboard={false} displayDataTypes={false} />
              </div>
            </DetailPanel>

            <DetailPanel>
              <div className="title">
                <MdCallMade className="response" />
                <span>Body Respondido</span>
              </div>
              <div className="body">
                <ReactJson src={handleJSON(details?.responseBody)} collapsed={false} enableClipboard={false} displayDataTypes={false} />
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
              <div className="content">{handleDate(details?.date)}</div>
            </SummaryStat>

            <SummaryStat>
              <div className="badge">
                <DiCode />
              </div>
              <div className="title">HTTP Status</div>
              <div className="content">
                <StatusBadge status={details?.status || 0}>{details?.status}</StatusBadge>
              </div>
            </SummaryStat>

            <SummaryStat>
              <div className="badge">
                <BiTimer />
              </div>
              <div className="title">Duração</div>
              <div className="content">
                <DurationBadge duration={details?.duration || 0}>{details?.duration}</DurationBadge>
              </div>
            </SummaryStat>

            <SummaryStat>
              <div className="badge">
                <BiDoorOpen />
              </div>
              <div className="title">IP</div>
              <div className="content">{details?.ip}</div>
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
