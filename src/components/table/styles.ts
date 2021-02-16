import styled, { css } from 'styled-components';

interface IStatusBadge {
  status: number;
}

interface IDurationBadge {
  duration: number;
}

export const StatusBadge = styled.span<IStatusBadge>`
  padding: 3px 11px;
  font-size: 13px;
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
  ` : ((duration > 1000 && duration < 3000) ? css`
    background-color: var(--warning);
    color: #FFF;
  ` : css`
    background-color: var(--danger);
    color: #FFF;
  `)}
`;

export const RouteBadge = styled.span`
  font-size: 13px;
  color: #4B5563;
`;