import axios from "axios";

type ThemeColor = string;
interface DataType {
  x: string;
  y: number;
}

export interface ChartData {
  id: string;
  color: ThemeColor;
  data: DataType[];
}

export interface InputDataPoint {
  Time: number;
  [key: string]: number | string; // Allows for dynamic keys with number values, except Time is explicitly a number
}

export interface NivoSeriesPoint {
  x: number;
  y: number;
}

export interface NivoSeries {
  id: string;
  data: NivoSeriesPoint[];
}

// Initialize an empty object to hold our series data
const seriesData: Record<string, NivoSeries> = {};

export const convertRToNivo = (inputData: any) => {
  inputData.forEach((point: InputDataPoint) => {
    // For each series in a point...
    Object.keys(point).forEach((key: string) => {
      if (key !== "Time") {
        // Skip the Time key
        if (!seriesData[key]) {
          seriesData[key] = { id: key, data: [] }; // Initialize the series if it doesn't exist
        }
        // Safely asserting point[key] as number because we know Time is the only non-number
        const value = point[key] as number;
        // Add the current point to the series
        seriesData[key].data.push({ x: point.Time, y: value });
      }
    });
  });
  return Object.values(seriesData);
};

export const callRForecast = (horizon: number) => {
  axios
    .get(`http://146.190.201.185:8000/predict?Horizon=${horizon}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("Error Fetching Forecasts:", error);
    });
};
