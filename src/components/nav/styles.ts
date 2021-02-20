import styled from 'styled-components';
import { displayFromLeft } from '../../styles/animations';

export const NavWrapper = styled.nav`
  grid-area: nav;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--light);
`;

export const Card = styled.div`
  width: 49%;
  height: 100%;
  overflow-y: auto;

  background-color: #FFF;
  box-shadow: 0px 0px 10px #CCC;
  transition: all .2s;

  .title {
    border-bottom: 1px solid #EEE;
    padding: 9px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .half-column {
    width: 50%;
  }

  .content {
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &.inline {
      padding: 0;
      flex-direction: row;
      align-items: center;
    }

    .card-row {
      color: var(--gray-2);
      font-size: 14px;
      font-weight: normal;
      margin: 6px 0;
      display: flex;

      label {
        font-size: 13px;
        color: var(--gray-1);
        width: 120px;
      }
    }
  }

  & > div {
    display: flex;
  }

  &:hover {
    transform: scale(1.03);
    box-shadow: 0px 0px 15px #BBB;
  }

  &:nth-child(1) {
    animation: ${displayFromLeft} .4s;
  }

  &:nth-child(2) {
    animation: ${displayFromLeft} 1s;
  }
`;
