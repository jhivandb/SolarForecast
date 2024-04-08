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
  // Parse the JSON string into an array of objects

  // Map each object in the array to a new object with the conversions applied
  const convertedArray = dataArray.map((item: any) => ({
    x: new Date(new Date(item.data_time)),
    // x: formatDateTime(item.date_time),
    y: parseInt(item.power),
  }));
  // Sort the converted array by date_time
  convertedArray.sort((a, b) => a.x.getTime() - b.x.getTime());

  // Return the new array with converted objects
  return [{ id: "Real", data: convertedArray }];
};

const formatDateTime = (datestr: string) => {
  const date = new Date(datestr);

  // Extract the necessary parts
  const hour = date.getUTCHours(); // Using getUTCHours to match GMT
  const dateOfMonth = date.getUTCDate();
  const month = date.getUTCMonth() + 1;

  return hour;
};
