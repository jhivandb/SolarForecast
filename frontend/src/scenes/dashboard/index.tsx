import { useEffect, useState } from "react";
import LineChart from "../../components/LineChart";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ChartData, convertRToNivo, parseAndConvertJsonData, parseForecast } from "../../data/datautils";

const Navbar = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [model, setModel] = useState<string>("wensemble");
  const [solarData, setSolarData] = useState<ChartData[]>([]);
  const handleModelChange = (event: SelectChangeEvent) => {
    setModel(event.target.value);
  };
  // TODO Figure out how to set the date time and parse the forecast

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://146.190.201.185:8002/solar/24`);

      if (!response.ok) {
        throw new Error("Couldn't fetch forecast");
      }
      const data = await response.json();
      setSolarData(parseAndConvertJsonData(data));
    };
    //TODO GET IT THIS PROMISE WORKING
    getData().catch((error: any) => {
      console.log(error);
    });
  }, []);
  const handleForecast = async () => {
    const response = await fetch(`http://146.190.201.185:8000/rpredict?Horizon=24`);
    if (!response.ok) {
      throw new Error("Couldn't fetch forecast");
    }
    const data = await response.json();
    setSolarData((prevData) => {
      const latestDate = prevData[0].data[prevData[0].data.length - 1].x;
      const initialDate = prevData[0].data[0].x;
      const newData = parseForecast(data, new Date(latestDate));
      console.log([newData, ...prevData]);
      return [prevData[0], newData];
    });
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
              <MenuItem value={"wensemble"}>wensemble</MenuItem>
            </Select>
          </FormControl>
          <Button variant="filled" onClick={handleForecast}>
            Forecast{" "}
          </Button>
        </Box>
        {isLoaded ? (
          <LineChart isCustomLineColors={true} model={model} data={solarData} />
        ) : (
          <LinearProgress color="secondary" />
        )}
      </Box>
    </>
  );
};

export default Navbar;
