import styled, { css } from 'styled-components';

interface IStatusBadge {
  status: number;
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