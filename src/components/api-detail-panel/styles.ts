import styled, { css } from 'styled-components';
import { popUpFromTop } from '../../styles/animations';

interface IContainer {
  show: boolean;
}

export const Container = styled.div<IContainer>`
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;

  background-color: #FFF;
  box-shadow: 0px 0px 10px #DDD;

  animation: ${popUpFromTop} .3s;

  ${({ show }) => show ? css`
    display: flex;
  ` : css`
    display: none;
  `}
`