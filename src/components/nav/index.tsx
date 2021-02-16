import { NavWrapper } from './styles';
import { useAPIInfo } from '../../hooks/api-info'

const Nav = (): React.ReactElement => {
  const { apiInfo } = useAPIInfo();
  return (
    <NavWrapper>{JSON.stringify(apiInfo)}</NavWrapper>
  )
}

export default Nav
