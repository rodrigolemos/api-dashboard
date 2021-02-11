import styled from 'styled-components';

export const FormWrapper = styled.aside`
  grid-area: form;
  flex-direction: column;

  h1 {
    font-size: 34px;
    font-weight: normal;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }

  input {
    padding: 10px;
    font-size: 14px;
    border: 1px solid #CCC;
    border-radius: 5px;
    outline: none;
    box-sizing: border-box;
    transition: border .1s ease-in-out;

    &:focus, &:active {
      border: 1px solid #2684FF;
    }

    &.additional {
      width: 80%;
    }
  }

  button.primary {
    border: none;
    padding: 12px 20px;
    border-radius: 5px;
    background-color: #2684FF;
    color: #FFF;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0px 5px 5px #CCC;
    }
  }

  button.secondary {
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    background-color: #E2E8F0;
    color: #2D3748;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
      box-shadow: 0px 3px 3px #CCC;
    }
  }

  form {
    width: 90%;
    display: flex;
    flex-direction: column;

    ul {
      margin: 0;
      padding: 0;

      li {
        list-style: none;
        margin: 10px 0px;
        display: flex;
        justify-content: space-between;
      }
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

      .centered {
        display: flex;
        justify-content: center;
        align-items: center;
      }

    }
  }
`;
