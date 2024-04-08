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
import {
  ChartData,
  InputDataPoint,
  callRForecast,
  convertRToNivo,
  parseAndConvertJsonData,
} from "../../data/datautils";
import { inputData } from "../../data/mockSolarData";
import { mockLineData } from "../../data/mockData";
import { stringify } from "querystring";

const Navbar = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [model, setModel] = useState<string>("wensemble");
  const [data, setData] = useState<ChartData[]>([]);
  const handleModelChange = (event: SelectChangeEvent) => {
    setModel(event.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`http://146.190.201.185:8002/solar/48`);

      if (!response.ok) {
        throw new Error("Couldn't fetch forecast");
      }
      const data = await response.json();
      setData(parseAndConvertJsonData(data));
    };
    //TODO GET IT THIS PROMISE WORKING
    getData().catch((error: any) => {
      console.log(error);
    });
  }, []);

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
          <Button>Testing </Button>
        </Box>
        {isLoaded ? <LineChart model={model} data={data} /> : <LinearProgress color="secondary" />}
      </Box>
    </>
  );
};

export default Navbar;
