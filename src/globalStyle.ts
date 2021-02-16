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

    --gray: #D1D5DB;
    --gray-1: #9CA3AF;
    --gray-2: #374151;
  }
`
