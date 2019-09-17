import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        background-color: #212121;
        font-family: 'Univers', sans-serif;
        color: white;
        margin: 3rem auto;
        max-width: 70%;
    }
`
//Last two are experimental

export default GlobalStyle
