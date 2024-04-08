import axios from "axios";
import { tokens } from "../theme";

type ThemeColor = string;
interface DataType {
  x: Date;
  y: number;
}

export interface ChartData {
  id: string;
  color?: ThemeColor;
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

// Initialize an empty object to hold our series data
// const seriesData: Record<string, ChartData> = {};

// export const convertRToNivo = (inputData: any, latestTime: Date) => {
//   inputData.forEach((point: InputDataPoint) => {
//     // For each series in a point...
//     Object.keys(point).forEach((key: string) => {
//       if (key !== "Time") {
//         // Skip the Time key
//         if (!seriesData[key]) {
//           seriesData[key] = { id: key, data: [] }; // Initialize the series if it doesn't exist
//         }
//         // Safely asserting point[key] as number because we know Time is the only non-number
//         const value = point[key] as number;
//         // Add the current point to the series
//         seriesData[key].data.push({ x: currentTime, y: value });
//       }
//     });
//   });
//   // Sort the data in each series by x value
//   Object.values(seriesData).forEach((series) => {
//     series.data.sort((a, b) => a.x.getTime() - b.x.getTime());
//   });
//   console.log(JSON.stringify(seriesData));
//   return Object.values(seriesData);
// };

export const callRForecast = async (horizon: number) => {
  try {
    const response = await axios.get(`http://146.190.201.185:8000/predict?Horizon=${horizon}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error Fetching Forecasts:", error);
  }
};

export const parseAndConvertJsonData = (dataArray: any) => {
  const convertedArray = dataArray.map((item: any) => ({
    x: new Date(new Date(item.data_time)),
    y: parseInt(item.power),
  }));
  convertedArray.sort((a, b) => a.x.getTime() - b.x.getTime());
  return [{ id: "Real", color: tokens("dark").greenAccent[500], data: convertedArray }];
};

export const parseForecast = (forecastData: any, latestTime: Date) => {
  let startTime = new Date(latestTime.getTime());
  const convertedArray = forecastData.map((item: any) => {
    let currentTime = new Date(startTime.getTime() + 3600000);
    startTime = currentTime;
    return {
      x: new Date(currentTime),
      y: parseInt(item.WeightedForecast),
    };
  });
  convertedArray.sort((a, b) => a.x.getTime() - b.x.getTime());
  return { id: "Forecast", color: tokens("dark").blueAccent[500], data: convertedArray };
};
