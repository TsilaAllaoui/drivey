import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @font-face {
      font-family: "Rethink";
      src: url("../fonts/RethinkSans-VariableFont_wght.ttf");
  }

  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    width: 100vw;
    font-family: "Rethink"
  }

  * {
    user-select: none;
  }
`;
