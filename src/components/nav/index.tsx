import { NavWrapper, Card } from './styles';
import { useAPIData } from '../../hooks/logs'
import { useAPIInfo } from '../../hooks/api-info'

const Nav = (): React.ReactElement => {
  const { APIData, APIResult } = useAPIData();
  const { APIInfo } = useAPIInfo();
  return (
    <NavWrapper>
      {APIData && (
        <>
          <Card>
            <div className="title">
              <span>Informações de Rota</span>
            </div>
            <div className="content">
              <div className="card-row">
                <label>Representante:</label>
                <span>{APIInfo?.group}</span>
              </div>
              <div className="card-row">
                <label>Endpoint:</label>
                <span>{APIInfo?.metodo} {APIInfo?.rota}</span>
              </div>
              <div className="card-row">
                <label>Responsável:</label>
                <span>{APIInfo?.responsavel}</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="title">
              <span>Informações de Execução</span>
              <span>Total: {APIResult?.total.qtd}</span>
            </div>
            <div className="content inline">
              <div className="half-column">
                <div className="content">
                  <div className="card-row">
                    <label>Sucesso (qtd):</label>
                    <span>{APIResult?.success.qtd}</span>
                  </div>
                  <div className="card-row">
                    <label>Erros cliente (qtd):</label>
                    <span>{APIResult?.clientError.qtd}</span>
                  </div>
                  <div className="card-row">
                    <label>Erros servidor (qtd):</label>
                    <span>{APIResult?.serverError.qtd}</span>
                  </div>
                </div>
              </div>
              <div className="half-column">
                <div className="content">
                  <div className="card-row">
                    <label>Média em ms:</label>
                    <span>{APIResult?.success.ms}</span>
                  </div>
                  <div className="card-row">
                    <label>Média em ms:</label>
                    <span>{APIResult?.clientError.ms}</span>
                  </div>
                  <div className="card-row">
                    <label>Média em ms:</label>
                    <span>{APIResult?.serverError.ms}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card />
        </>
      )}
    </NavWrapper>
  )
}

export default Nav
