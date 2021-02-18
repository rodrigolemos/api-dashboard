import styled, { css } from 'styled-components';
import { popUpFromTop } from '../../styles/animations';

interface IContainer {
  show: boolean;
}

export const Container = styled.div<IContainer>`
  ${({ show }) => show ? css`
    display: grid;
  ` : css`
    display: none;
  `}

  width: 100%;
  height: 100%;

  grid-template-areas: "summary details";
  grid-template-columns: 33% 1fr;

  background-color: #FFF;
  box-shadow: 0px 0px 10px #DDD;
  animation: ${popUpFromTop} .3s;

  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #EEE;
    padding: 5px;
  }
`

export const Summary = styled.aside`
  grid-area: summary;
`;

export const Details = styled.div`
  grid-area: details;
`;
