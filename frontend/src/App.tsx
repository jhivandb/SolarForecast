// import "./App.css";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import { ColorModeContext, useMode } from "./theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider, SecureApp } from "@asgardeo/auth-react";
import { Route, Routes } from "react-router-dom";
import Unauthenticated from "./scenes/Auth";

interface Config {
  redirectUrl: string;
  asgardeoClientId: string;
  asgardeoBaseUrl: string;
  forecastAPIUrl: string;
  dataAPIUrl: string;
}

declare global {
  interface Window {
    config: Config;
  }
}
const authConfig = {
  signInRedirectURL: window.config.redirectUrl,
  signOutRedirectURL: window.config.redirectUrl,
  clientID: window.config.asgardeoClientId,
  baseUrl: window.config.asgardeoBaseUrl,
  scope: ["openid", "profile"],
};

function App() {
  const [theme, colorMode] = useMode();
  return (
    <AuthProvider config={authConfig}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SecureApp fallback=<Unauthenticated />>
            <Box className="app" sx={{ display: "flex" }}>
              <Sidebar />
              <main className="content">
                <Topbar />
                <Routes>
                  <Route path="/SolarForecast" element={<Dashboard />} />
                </Routes>
              </main>
            </Box>
          </SecureApp>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}

// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const { state, signIn } = useAuthContext();

//   if (!state.isAuthenticated) {
//     signIn();
//     return <Unauthenticated />;
//   }
//   return children;
// };

export default App;
