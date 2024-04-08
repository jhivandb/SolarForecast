import { useAuthContext } from "@asgardeo/auth-react";
import { Box } from "@mui/material";
import { redirect } from "react-router-dom";

const Unauthenticated = () => {
  const { signIn } = useAuthContext();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", height: "100vh", alignItems: "center" }}>
      <h2>REDIRECTING...</h2>
    </Box>
  );
};

export default Unauthenticated;
