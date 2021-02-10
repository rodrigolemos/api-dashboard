import styled from 'styled-components';

export const FormWrapper = styled.aside`
  grid-area: form;
  flex-direction: column;

  form {
    width: 90%;
    display: flex;
    flex-direction: column;

    label {
      display: block;
      margin-bottom: 10px;
    }

    input {
      padding: 9px;
      font-size: 14px;
      border: 1px solid #CCC;
      border-radius: 5px;
    }

    #name {
      width: 100%;
    }

    .row {
      margin: 20px;

      .col-full {
        display: block;
        width: 100%
      }

      .col-half {
        display: inline-block;
        width: 50%
      }

    }
  }
`;
