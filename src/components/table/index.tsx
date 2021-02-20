import { useLogData } from '../../hooks/logs'
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
  const { logData } = useLogData();
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
              <StyledTableCell>API</StyledTableCell>
              <StyledTableCell align="center">Duração (ms)</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logData && logData.map(log => (
              <TableRow key={log.id}>
                <TableCell component="th" scope="row">
                  {formatDate(log.date)}
                </TableCell>
                <TableCell>
                  <RouteBadge>{log.ip}</RouteBadge>
                </TableCell>
                <TableCell>{log.route}</TableCell>
                <TableCell align="center">
                  <DurationBadge duration={log.duration}>{log.duration}</DurationBadge>
                </TableCell>
                <TableCell align="center">
                  <StatusBadge status={log.status}>{log.status || '-'}</StatusBadge>
                </TableCell>
                <TableCell align="center">
                  <DetailBadge><BsSearch onClick={() => setShowDetail(APIInfo?.route, log.id)} /></DetailBadge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MaterialTable>
      </TableContainer>
    </Container>
  );
}
