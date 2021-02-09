import { Container } from './styles';
import Form from '../form';
import Nav from '../nav';
import Main from '../main';

const Layout: React.FC = (): React.ReactElement => {
  return (
    <Container>
      <Form />
      <Nav />
      <Main />
    </Container>
  )
}

export default Layout
