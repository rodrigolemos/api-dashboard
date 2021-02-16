import { NavWrapper, APIInfoCard, Card } from './styles';
import { useAPIInfo } from '../../hooks/api-info'

const Nav = (): React.ReactElement => {
  const { apiInfo } = useAPIInfo();
  return (
    <NavWrapper>

      <APIInfoCard>
        <div>
          <h2 className="api-group">{apiInfo?.group}</h2>
        </div>
        <div>
          <h2 className="api-group">{apiInfo?.rota}</h2>
        </div>
        <div>
          <h2 className="api-group">{apiInfo?.responsavel}</h2>
        </div>
      </APIInfoCard>

      <Card />
      <Card />
    </NavWrapper>
  )
}

export default Nav
