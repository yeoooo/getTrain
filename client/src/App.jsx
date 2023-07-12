import { ThemeProvider, styled } from "styled-components";
import { GlobalStyle } from "./style/globalStyle";
import { theme } from "./style/theme";
import LoginPage from "./@pages/LoginPage";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <LoginPage/>
      </ThemeProvider>
    </>

  );
}

