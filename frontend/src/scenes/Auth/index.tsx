import { useAuthContext } from "@asgardeo/auth-react";
import { Box, LinearProgress } from "@mui/material";

const Unauthenticated = () => {
  const { signIn } = useAuthContext();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", height: "100vh", alignItems: "center" }}>
      <div>
        <h2>REDIRECTING...</h2>
        <LinearProgress color="secondary" />
      </div>
    </Box>
  );
};

export default Unauthenticated;
