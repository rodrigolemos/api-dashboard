import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  * {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  :root {
    --success: #10B981;
    --warning: #FBBF24;
    --danger: #EF4444;
  }
`
