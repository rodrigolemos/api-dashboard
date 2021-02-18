import { useAPIDetail } from '../../hooks/api-detail';
import { Container, Details, Summary } from './styles';

const APIDetailPanel = (): React.ReactElement => {
  const { show, setShowDetail } = useAPIDetail();
  return (
    <Container show={show} onClick={setShowDetail}>
      <Summary>Summary</Summary>
      <Details>Details</Details>
    </Container>
  )
}

export default APIDetailPanel
