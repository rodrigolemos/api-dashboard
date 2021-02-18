import styled, { css } from 'styled-components';
import { popUpFromTop } from '../../styles/animations';

interface IContainer {
  show: boolean;
}

export const Container = styled.div<IContainer>`
  width: 100%;
  height: 100%;

  background-color: #FFF;
  border: 1px solid #DDD;

  animation: ${popUpFromTop} .3s;

  ${({ show }) => show ? css`
    display: flex;
  ` : css`
    display: none;
  `}
`