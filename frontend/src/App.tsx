// import "./App.css";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import { ColorModeContext, useMode } from "./theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider, useAuthContext } from "@asgardeo/auth-react";
import { Route, Routes } from "react-router-dom";
import Unauthenticated from "./scenes/Auth";
// import Line from "./scenes/line";

const authConfig = {
  signInRedirectURL: "http://localhost:8080",
  signOutRedirectURL: "http://localhost:8080",
  clientID: "xMf37DKirHxFhf9z1KzkGSGGOasa",
  baseUrl: "https://api.asgardeo.io/t/testorg4321",
  scope: ["openid", "profile"],
};

function App() {
  const [theme, colorMode] = useMode();
  return (
    <AuthProvider config={authConfig}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box className="app" sx={{ display: "flex" }}>
            <Sidebar />
            <main className="content">
              <Topbar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                {/* <Route path="/forecast" element={<Line />} /> */}
              </Routes>
            </main>
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { state } = useAuthContext();

  if (!state.isAuthenticated) {
    return <Unauthenticated />;
  }
  return children;
};

export default App;
