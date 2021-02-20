import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  * {
    font-family: 'Roboto', Tahoma, Geneva, Verdana, sans-serif;
  }

  :root {
    --success: #10B981;
    --warning: #FBBF24;
    --danger: #EF4444;
    --info: #3B82F6;

    --light: #F3F4F6;

    --semi-gray: #E2E8F0;
    --semi-gray-1: #CBD5E0;

    --gray: #D1D5DB;
    --gray-1: #9CA3AF;
    --gray-2: #374151;

    --semi-gray-font: #2D3748;
  }

  ::-webkit-scrollbar {
    height: 4px;
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: #F1F1F1;
  }
  ::-webkit-scrollbar-thumb {
    background: #BBB;
    border-radius: 2px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
`
