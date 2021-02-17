import { keyframes } from 'styled-components';

export const showFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-5px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const displayFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`