import styled from 'styled-components';

export const FormWrapper = styled.aside`
  grid-area: form;
  flex-direction: column;

  form {
    width: 90%;

    & > div {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      margin: 10px;

      label {
        width: 30%;
        text-align: right;
        margin-right: 10px;
      }

      #api-name {
        width: 100%;
      }
    }
  }
`;
