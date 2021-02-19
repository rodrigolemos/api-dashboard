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

  position: relative;
  width: 100%;
  height: 100%;

  grid-template-areas: "summary details";
  grid-template-columns: 33% 1fr;

  background-color: #FFF;
  box-shadow: 0px 0px 10px #DDD;
  animation: ${popUpFromTop} .3s;

  .btn-close {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 1px 9px;

    border: none;
    border-radius: 5px;
    font-size: 22px;
    color: #FFF;
    background-color: var(--light);
    color: var(--semi-gray-font);
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
      background-color: var(--semi-gray);
    }
  }

  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 15px;
  }
`

export const Summary = styled.aside`
  grid-area: summary;

  h2 {
    font-size: 24px;
    font-weight: normal;
    color: var(--gray-2);
  }
`;

export const SummaryStat = styled.div`
  width: 100%;
  height: 82px;
  margin: 10px 0;

  display: grid;
  grid-template-areas: "badge title"
                       "badge content";
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 25% 1fr;

  border: 1px solid #DDD;
  border-radius: 5px;
  box-shadow: 1px 2px 3px #CCC;

  & > div {
    display: flex;
    align-items: center;
  }

  .badge {
    grid-area: badge;
    justify-content: center;

    svg {
      font-size: 36px;
      padding: 10px;
      border-radius: 50%;
      background-color: var(--info);
      color: var(--light);
    }
  }

  .title {
    grid-area: title;
    border-bottom: 1px solid #DDD;
    padding: 0 8px;

    font-size: 14px;
    color: var(--gray-2);
    cursor: default;
  }

  .content {
    grid-area: content;
    padding: 0 8px;

    font-size: 17px;
    color: var(--gray-2);
  }
`;

export const Divider = styled.div`
  width: 100%;
  margin: 35px 0px;
  padding: 0;
  border-bottom: 2px dashed var(--gray);
`;

export const Details = styled.section`
  grid-area: details;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  overflow-y: scroll;
`;

export const DetailPanel = styled.div`
  border: 1px solid #DDD;
  box-shadow: 1px 2px 3px #CCC;

  width: 100%;
  margin: 10px 0;

  span {
    font-size: 18px;
    font-weight: normal;
    padding: 0;
  }

  & > div {
    padding: 10px;
  }

  .title {
    border-bottom: 1px solid #DDD;
    display: flex;
    align-items: center;

    svg {
      font-size: 20px;
      margin-right: 10px;
      padding: 2px;
      border-radius: 5px;
      color: #FFF;

      &.request {
        background-color: var(--success);
      }

      &.response {
        background-color: var(--info);
      }

      &.debug {
        background-color: var(--warning);
      }
    }
  }

  .body {
    background-color: var(--light);
    overflow-x: auto;
    * {
      font-size: 12px;
    }
  }
`;