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
  [key: string]: number | string;
}

export interface NivoSeriesPoint {
  x: number;
  y: number;
}

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
  convertedArray.sort((a: DataType, b: DataType) => a.x.getTime() - b.x.getTime());
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
  convertedArray.sort((a: DataType, b: DataType) => a.x.getTime() - b.x.getTime());
  return { id: "Forecast", color: tokens("dark").blueAccent[500], data: convertedArray };
};
