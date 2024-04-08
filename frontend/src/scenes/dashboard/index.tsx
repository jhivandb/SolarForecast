import { useState } from "react";
import LineChart from "../../components/LineChart";
import { Box, FormControl, InputLabel, LinearProgress, MenuItem, Select, SelectChangeEvent } from "@mui/material";

const Navbar = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [model, setModel] = useState<string>("Test");

  const handleModelChange = (event: SelectChangeEvent) => {
    setModel(event.target.value);
  };

  return (
    <>
      <Box sx={{ height: 0.8 }}>
        <Box sx={{ display: "flex", margin: 2 }}>
          <FormControl sx={{ width: 0.25 }}>
            <InputLabel id="demo-simple-select-label">Select Model</InputLabel>
            <Select
              variant="filled"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={model}
              label="Select Model"
              onChange={handleModelChange}
            >
              <MenuItem value={"ETS"}>ETS</MenuItem>
              <MenuItem value={"ARIMA"}>Arima</MenuItem>
              <MenuItem value={"Theta"}>Theta</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {isLoaded ? <LineChart model={model} /> : <LinearProgress color="secondary" />}
      </Box>
    </>
  );
};

export default Navbar;
