import styled, { css } from 'styled-components';
interface IStatusBadge {
  status: number;
}

interface IDurationBadge {
  duration: number;
}

interface IContainer {
  show: boolean;
}

export const Container = styled.div<IContainer>`
  align-self: flex-start;
  width: 100%;

  ${({ show }) => show ? css`
    display: flex;
  ` : css`
    display: none;
  `}
`

export const StatusBadge = styled.span<IStatusBadge>`
  padding: 3px 11px;
  border-radius: 5px;
  color: #FFF;
  font-weight: bold;

  ${({ status }) => (status >= 200 && status < 400) ? css`
    background-color: var(--success);
  ` : ((status >= 400 && status < 500) ? css`
    background-color: var(--warning);
  ` : css`
    background-color: var(--danger);
  `)}
`;

export const DurationBadge = styled.span<IDurationBadge>`
  padding: 3px 11px;
  border-radius: 5px;
  font-weight: bold;

  ${({ duration }) => (duration <= 1000) ? css`
    font-weight: normal;
    padding: 0;
  ` : ((duration > 1000 && duration < 3000) ? css`
    background-color: var(--warning);
    color: #FFF;
  ` : css`
    background-color: var(--danger);
    color: #FFF;
  `)}
`;

export const DetailBadge = styled.span`
  cursor: pointer;
`;

export const RouteBadge = styled.span`
  font-size: 13px;
  color: #4B5563;
`;