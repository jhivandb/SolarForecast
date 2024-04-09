// import "./App.css";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import { ColorModeContext, useMode } from "./theme";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider, SecureApp } from "@asgardeo/auth-react";
import { Route, Routes } from "react-router-dom";
import Unauthenticated from "./scenes/Auth";
// import Line from "./scenes/line";

const authConfig = {
  signInRedirectURL: "https://jhivandebenoit.github.io/SolarForecast",
  signOutRedirectURL: "https://jhivandebenoit.github.io/SolarForecast",
  // signInRedirectURL: "http://146.190.201.185:8080",
  // signOutRedirectURL: "http://146.190.201.185:8080",
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
          <SecureApp fallback=<Unauthenticated />>
            <Box className="app" sx={{ display: "flex" }}>
              <Sidebar />
              <main className="content">
                <Topbar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  {/* <Route path="/forecast" element={<Line />} /> */}
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
