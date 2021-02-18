import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;

  grid-template-areas: "form nav"
                       "form main";
  grid-template-rows: 13rem 1fr;
  grid-template-columns: 33% 1fr;

  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
