import { Container } from './styles';
import Form from '../form';
import Nav from '../nav';
import Main from '../main';
import Table from '../table';
import APIDetailPanel from '../api-detail-panel';

const Layout = (): React.ReactElement => {
  return (
    <Container>
      <Form />
      <Nav />
      <Main>
        <Table />
        <APIDetailPanel />
      </Main>
    </Container>
  )
}

export default Layout
