import { useAPIDetail } from '../../hooks/api-detail';
import { Container } from './styles';

const APIDetailPanel = (): React.ReactElement => {
  const { show, setShowDetail } = useAPIDetail();
  return (
    <Container show={show} onClick={setShowDetail}>APIDetailPanel</Container>
  )
}

export default APIDetailPanel
