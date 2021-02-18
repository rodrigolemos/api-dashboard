import styled from 'styled-components';
import { showFromLeft } from '../../styles/animations';

export const FormWrapper = styled.aside`
  grid-area: form;
  flex-direction: column;
  box-shadow: 0px 5px 15px #DDD;
  color: var(--gray-2);

  h1 {
    font-size: 34px;
    font-weight: normal;
  }

  h2.error {
    font-size: 22px;
    font-weight: normal;
    padding: 10px 20px;
    color: red;
    border: 1px solid red;
    border-radius: 5px;
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
    padding: 10px 18px;
    border-radius: 5px;
    background-color: #2684FF;
    color: #FFF;
    font-size: 18px;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0px 5px 5px #CCC;
    }

    &:active {
      transform: translateY(2px);
    }
  }

  button.secondary {
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    background-color: var(--semi-gray);
    color: var(--semi-gray-font);
    font-size: 16px;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
      background-color: var(--semi-gray-1);
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

        &:last-child {
          animation: ${showFromLeft} .3s ease-in-out;
        }
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
        width: 50%;
      }

      .centered {
        display: flex;
        justify-content: center;
        align-items: center;
      }

    }
  }
`;
