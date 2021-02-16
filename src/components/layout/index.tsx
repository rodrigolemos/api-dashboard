import { Container } from './styles';
import Form from '../form';
import Nav from '../nav';
import Main from '../main';
import Table from '../table';

const Layout = (): React.ReactElement => {
  return (
    <Container>
      <Form />
      <Nav />
      <Main>
        <Table />
      </Main>
    </Container>
  )
}

export default Layout
