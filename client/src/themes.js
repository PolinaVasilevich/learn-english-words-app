import { createGlobalStyle } from "styled-components";

export const darkTheme = {
  textColor: "hsl(0, 0%, 100%)",
  backgroudColor: "hsl(207, 26%, 17%)",
  baseColor: "hsl(209, 23%, 22%)",
  shadow: "rgba(245, 245, 245, 0.2) 0 0 8px",
};

export const lightTheme = {
  textColor: "hsl(200, 15%, 8%)",
  backgroudColor: "hsl(0, 0%, 98%)",
  baseColor: "hsl(0, 0%, 100%)",
  shadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
};

export const GlobalStyles = createGlobalStyle`
    body {
        font-family: var(--family);
        background-color: ${(props) => props.theme.backgroudColor};
        color: ${(props) => props.theme.textColor}
    }
`;
