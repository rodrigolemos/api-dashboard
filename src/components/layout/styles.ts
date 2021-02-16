import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;

  grid-template-areas: "form nav"
                       "form main";
  grid-template-rows: 12rem 1fr;
  grid-template-columns: 35% 1fr;

  & > * {
    display: flex;
    align-items: center;
    justify-content: center;

    /* border: 1px solid #DDD; */
  }
`;
