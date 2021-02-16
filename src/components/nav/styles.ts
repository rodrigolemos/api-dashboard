import styled from 'styled-components';

export const NavWrapper = styled.nav`
  grid-area: nav;
  border-bottom: 1px solid #EEE;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Card = styled.div`
  border: 1px solid #AAA;
  border-radius: 5px;
  padding: 10px;
  width: 30%;
  height: 100%;

  & > div {
    display: flex;
  }
`;

export const APIInfoCard = styled(Card)`
  svg {
    color: var(--gray-1);
    font-size: 72px;
    margin-right: 20px;
  }

  .api-group {
    color: var(--gray-2);
    font-size: 16px;
    font-weight: normal;
  }
`;