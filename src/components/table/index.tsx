import { useAPIData } from '../../hooks/logs';
import { useAPIInfo } from '../../hooks/api-info';
import { useAPIDetail } from '../../hooks/api-detail';
import { BsSearch } from 'react-icons/bs';
import { formatDate } from '../../utils/formatDate';
import { Container, DetailBadge, DurationBadge, RouteBadge, StatusBadge } from './styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import {
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';

const StyledTableCell = withStyles(() =>
  createStyles({
    head: {
      backgroundColor: '#444',
      color: '#FFF',
    }
  }),
)(TableCell);

export default function Table() {
  const { APIData } = useAPIData();
  const { APIInfo } = useAPIInfo();
  const { show, setShowDetail } = useAPIDetail();
  return (
    <Container show={!show}>
      <TableContainer component={Paper} style={{ alignSelf: 'flex-start' }}>
        <MaterialTable size="small" aria-label="logs table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Data/Hora</StyledTableCell>
              <StyledTableCell>IP</StyledTableCell>
              <StyledTableCell>Método</StyledTableCell>
              <StyledTableCell align="center">Verbo</StyledTableCell>
              <StyledTableCell align="center">Duração (ms)</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {APIData && APIData.map(api => (
              <TableRow key={api.seq}>
                <TableCell component="th" scope="row">
                  {formatDate(api.data_hora)}
                </TableCell>
                <TableCell>
                  <RouteBadge>{api.ip_entrada}</RouteBadge>
                </TableCell>
                <TableCell>{api.metodo}</TableCell>
                <TableCell align="center">{api.verbo}</TableCell>
                <TableCell align="center">
                  <DurationBadge duration={api.tempo_exec}>{api.tempo_exec}</DurationBadge>
                </TableCell>
                <TableCell align="center">
                  <StatusBadge status={api.status}>{api.status || '-'}</StatusBadge>
                </TableCell>
                <TableCell align="center">
                  <DetailBadge><BsSearch onClick={() => setShowDetail(APIInfo?.name, api.seq)} /></DetailBadge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MaterialTable>
      </TableContainer>
    </Container>
  );
}
