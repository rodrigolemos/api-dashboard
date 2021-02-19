import TimelineChart from '../timeline-chart';
import { NavWrapper, Card } from './styles';
import { useLogData } from '../../hooks/logs'
import { useAPIInfo } from '../../hooks/api-info'

const Nav = (): React.ReactElement => {
  const { logData, logResult } = useLogData();
  const { APIInfo } = useAPIInfo();
  return (
    <NavWrapper>
      {logData && (
        <>
          <Card>
            <div className="title">
              <span>Informações de Rota</span>
            </div>
            <div className="content">
              <div className="card-row">
                <label>Grupo:</label>
                <span>{APIInfo?.group}</span>
              </div>
              <div className="card-row">
                <label>Endpoint:</label>
                <span>{APIInfo?.route}</span>
              </div>
              <div className="card-row">
                <label>Nome:</label>
                <span>{APIInfo?.name}</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="title">
              <span>Informações de Execução</span>
              <span>Total: {logResult?.total.qtd}</span>
            </div>
            <div className="content inline">
              <div className="half-column">
                <div className="content">
                  <div className="card-row">
                    <label>Sucesso (qtd):</label>
                    <span className="status success">{logResult?.success.qtd}</span>
                  </div>
                  <div className="card-row">
                    <label>Erros cliente (qtd):</label>
                    <span className="status clientError">{logResult?.clientError.qtd}</span>
                  </div>
                  <div className="card-row">
                    <label>Erros servidor (qtd):</label>
                    <span className="status serverError">{logResult?.serverError.qtd}</span>
                  </div>
                </div>
              </div>
              <div className="half-column">
                <div className="content">
                  <div className="card-row">
                    <label>Média em ms:</label>
                    <span>{logResult?.success.ms}</span>
                  </div>
                  <div className="card-row">
                    <label>Média em ms:</label>
                    <span>{logResult?.clientError.ms}</span>
                  </div>
                  <div className="card-row">
                    <label>Média em ms:</label>
                    <span>{logResult?.serverError.ms}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="title">
              <span>Linha do Tempo</span>
            </div>
            <div className="content">
              <TimelineChart />
            </div>
          </Card>
        </>
      )}
    </NavWrapper>
  )
}

export default Nav
