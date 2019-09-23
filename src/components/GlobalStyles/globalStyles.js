import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        background-color: #212121;
        font-family: 'Univers', sans-serif;
        color: white;
        padding: 0;
        margin: 0;
        
    }
`;

export default GlobalStyle;
