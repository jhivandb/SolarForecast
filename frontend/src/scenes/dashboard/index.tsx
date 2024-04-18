import { useEffect, useState } from "react";
import LineChart from "../../components/LineChart";
import {
  Box,
  Button,
  FormControl,
  Slider,
  MenuItem,
  Select,
  SelectChangeEvent,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { ChartData, parseAndConvertJsonData, parseForecast } from "../../data/datautils";

const Navbar = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(true);
  const [model, setModel] = useState<string>("daily");
  const [solarHorizon, setSolarHorizon] = useState(24);
  const [forecastHorizon, setForecastHorizon] = useState(12);
  const [xlegend, setXLegend] = useState("4 hours");

  const [solarData, setSolarData] = useState<ChartData[]>([]);
  const handleSolarHorizonChange = (event: SelectChangeEvent) => {
    const horizon = event.target.value;
    if (horizon === "hourly") {
      setSolarHorizon(12);
      setXLegend("2 hours");
    }
    if (horizon === "daily") {
      setSolarHorizon(12 * 4);
      setXLegend("4 hours");
    }
    if (horizon === "weekly") {
      setSolarHorizon(12 * 4 * 4);
      setXLegend("2 days");
    }
    if (horizon === "monthly") {
      setSolarHorizon(12 * 2 * 365);
      setXLegend("5 days");
    }
    setModel(event.target.value);
  };
  const handleForecastHorizonChange = (newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setForecastHorizon(newValue);
    }
  };

  useEffect(() => {
    // TODO LEGEND ISN"T WORKING
    const getData = async () => {
      const response = await fetch(
        `https://3b87c7fa-a7ba-49c0-bdc3-12fe0116fce7-dev.e1-us-east-azure.choreoapis.dev/molw/default/v1.0/${solarHorizon}`
      );

      if (!response.ok) {
        throw new Error("Couldn't fetch forecast");
      }
      const data = await response.json();
      setSolarData(parseAndConvertJsonData(data));
    };
    getData().catch((error: any) => {
      console.log(error);
    });
  }, [solarHorizon]);
  const handleForecast = async () => {
    setIsLoaded(false);
    let query = `https://3b87c7fa-a7ba-49c0-bdc3-12fe0116fce7-dev.e1-us-east-azure.choreoapis.dev/molw/forecast/v1.0?Horizon=${forecastHorizon}`;
    const response = await fetch(query);
    if (!response.ok) {
      throw new Error("Couldn't fetch forecast");
    }
    const data = await response.json();
    setSolarData((prevData) => {
      const latestDate = prevData[0].data[prevData[0].data.length - 1].x;
      const newData = parseForecast(data, new Date(latestDate));
      setIsLoaded(true);
      return [prevData[0], newData];
    });
  };

  return (
    <>
      <Box sx={{ height: 0.8 }}>
        <Box sx={{ display: "flex", mx: 5, justifyContent: "space-between" }}>
          <Box sx={{ width: 0.25 }}>
            <InputLabel sx={{ fontSize: 20, color: "secondary" }} shrink id="demo-simple-select-label">
              Solar Horizon
            </InputLabel>
            <FormControl sx={{ width: 1 }}>
              <Select
                variant="outlined"
                color="secondary"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={model}
                onChange={handleSolarHorizonChange}
              >
                <MenuItem value={"hourly"}>Hourly</MenuItem>
                <MenuItem value={"daily"}>Daily</MenuItem>
                <MenuItem value={"weekly"}>Weekly</MenuItem>
                <MenuItem value={"monthly"}>Monthly</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: 0.25 }}>
            <InputLabel sx={{ fontSize: 20, color: "secondary" }} shrink id="demo-simple-select-label">
              Forecast Horizon
            </InputLabel>
            <Slider
              aria-label="Forecast Horizon"
              defaultValue={12}
              getAriaValueText={() => {
                return "Forecast Horizon";
              }}
              onChange={(_, value) => {
                handleForecastHorizonChange(value);
              }}
              color="secondary"
              valueLabelDisplay="auto"
              shiftStep={12}
              step={4}
              marks
              min={12}
              max={48}
            />
            <Button variant="contained" color="secondary" onClick={handleForecast}>
              Forecast
            </Button>
          </Box>
        </Box>
        {isLoaded ? (
          <LineChart xlegend={xlegend} model={model} data={solarData} />
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
            <CircularProgress size="5rem" color="secondary" />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Navbar;
