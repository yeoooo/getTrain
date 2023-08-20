import { ThemeProvider, styled } from "styled-components";
import { GlobalStyle } from "./style/globalStyle";
import { theme } from "./style/theme";
import LoginPage from "./@pages/LoginPage";
import SearchFormPage from "./@pages/SearchFormPage";
import SearchingPage from "./@pages/SearchingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/search" element={<SearchFormPage />} />
            <Route path="/searching" element={<SearchingPage/>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>

  );
}

