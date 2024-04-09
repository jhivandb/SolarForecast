import { Box, LinearProgress } from "@mui/material";

const Unauthenticated = () => {
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
