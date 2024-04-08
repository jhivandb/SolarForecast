import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { mockLineData as data } from "../data/mockData";
import { InputDataPoint, callRForecast, convertRToNivo } from "../data/datautils";
import { useState } from "react";
import getSolarData from "../data/solarStore";

const inputData: InputDataPoint[] = [
  { Time: 1, ETS: -55.3056, NNetAR: 112.5675, TBATS: 1378.8933, STLM_AR: 3703.7705, Theta: -3.4428 },
  { Time: 2, ETS: -99.521, NNetAR: 377.1446, TBATS: 5881.885, STLM_AR: 3747.3629, Theta: -8.5286 },
  // { Time: 3, ETS: -134.8934, NNetAR: 1854.4654, TBATS: 12536.712, STLM_AR: 5849.3204, Theta: -19.2074 },
  // { Time: 4, ETS: -163.1913, NNetAR: 6069.6436, TBATS: 18190.0915, STLM_AR: 8678.2425, Theta: -35.902 },
  // { Time: 5, ETS: -185.8296, NNetAR: 12385.1435, TBATS: 21264.2852, STLM_AR: 11390.7613, Theta: -54.9826 },
  // { Time: 6, ETS: -203.9403, NNetAR: 24357.3185, TBATS: 22732.1508, STLM_AR: 12707.3177, Theta: -70.2915 },
  // { Time: 7, ETS: -218.4288, NNetAR: 49285.1214, TBATS: 25894.4105, STLM_AR: 16359.2182, Theta: -104.7738 },
  // { Time: 8, ETS: -230.0196, NNetAR: 57572.0026, TBATS: 32424.0904, STLM_AR: 25499.2296, Theta: -196.4319 },
  // { Time: 9, ETS: -239.2922, NNetAR: 68972.064, TBATS: 41112.4074, STLM_AR: 36724.4744, Theta: -332.732 },
  // { Time: 10, ETS: -246.7104, NNetAR: 74658.386, TBATS: 47968.2948, STLM_AR: 46119.457, Theta: -458.9288 },
  // { Time: 11, ETS: -252.6449, NNetAR: 80379.4317, TBATS: 50206.995, STLM_AR: 52567.5709, Theta: -573.3897 },
  // { Time: 12, ETS: -257.3925, NNetAR: 62044.3228, TBATS: 47806.3304, STLM_AR: 52443.893, Theta: -620.6019 },
  // { Time: 13, ETS: -261.1905, NNetAR: 44980.1217, TBATS: 43778.2302, STLM_AR: 48986.4336, Theta: -602.4968 },
  // { Time: 14, ETS: -264.229, NNetAR: 42051.3621, TBATS: 40551.3031, STLM_AR: 47902.5281, Theta: -639.7554 },
  // { Time: 15, ETS: -266.6598, NNetAR: 24378.578, TBATS: 38530.329, STLM_AR: 46358.7055, Theta: -656.9991 },
  // { Time: 16, ETS: -268.6044, NNetAR: 9674.7965, TBATS: 35716.9309, STLM_AR: 44854.7442, Theta: -671.898 },
  // { Time: 17, ETS: -270.1601, NNetAR: 3187.3928, TBATS: 30956.9326, STLM_AR: 38221.4571, Theta: -591.7715 },
  // { Time: 18, ETS: -271.4046, NNetAR: 520.9209, TBATS: 24997.278, STLM_AR: 29238.053, Theta: -473.3927 },
  // { Time: 19, ETS: -272.4003, NNetAR: -786.8668, TBATS: 20543.8825, STLM_AR: 24900.8685, Theta: -418.4583 },
  // { Time: 20, ETS: -273.1968, NNetAR: -1397.4451, TBATS: 18955.0181, STLM_AR: 23235.5296, Theta: -412.3851 },
  // { Time: 21, ETS: -273.834, NNetAR: -2808.439, TBATS: 19291.1038, STLM_AR: 20793.4198, Theta: -400.2382 },
  // { Time: 22, ETS: -274.3438, NNetAR: -5061.6402, TBATS: 18523.9882, STLM_AR: 16617.1602, Theta: -334.213 },
  // { Time: 23, ETS: -274.7516, NNetAR: -11992.4823, TBATS: 15049.0735, STLM_AR: 14088.5628, Theta: -290.2481 },
  // { Time: 24, ETS: -275.0779, NNetAR: -21930.2143, TBATS: 9777.4455, STLM_AR: 8704.4671, Theta: -186.3207 },
  // { Time: 25, ETS: -275.3389, NNetAR: -31172.4601, TBATS: 5902.2118, STLM_AR: 3703.7705, Theta: -86.0606 },
  // { Time: 26, ETS: -275.5477, NNetAR: -35558.4782, TBATS: 5340.0764, STLM_AR: 3747.3629, Theta: -110.8669 },
  // { Time: 27, ETS: -275.7147, NNetAR: -37289.8924, TBATS: 7557.8833, STLM_AR: 5849.3204, Theta: -172.8612 },
  // { Time: 28, ETS: -275.8483, NNetAR: -36297.5918, TBATS: 9814.3727, STLM_AR: 8678.2425, Theta: -251.3085 },
  // { Time: 29, ETS: -275.9552, NNetAR: -29693.3134, TBATS: 10705.268, STLM_AR: 11390.7613, Theta: -318.8938 },
  // { Time: 30, ETS: -276.0408, NNetAR: -11395.3195, TBATS: 11320.9429, STLM_AR: 12707.3177, Theta: -351.4527 },
  // { Time: 31, ETS: -276.1092, NNetAR: 23694.3774, TBATS: 14848.403, STLM_AR: 16359.2182, Theta: -463.9929 },
  // { Time: 32, ETS: -276.1639, NNetAR: 54333.5585, TBATS: 22822.732, STLM_AR: 25499.2296, Theta: -785.7203 },
  // { Time: 33, ETS: -276.2077, NNetAR: 70589.0901, TBATS: 33722.7921, STLM_AR: 36724.4744, Theta: -1220.0074 },
  // { Time: 34, ETS: -276.2427, NNetAR: 81376.0681, TBATS: 43287.5625, STLM_AR: 46119.457, Theta: -1560.347 },
  // { Time: 35, ETS: -276.2708, NNetAR: 75402.6964, TBATS: 48363.1616, STLM_AR: 52567.5709, Theta: -1824.4105 },
  // { Time: 36, ETS: -276.2932, NNetAR: 69615.0851, TBATS: 48669.4849, STLM_AR: 52443.893, Theta: -1861.7953 },
  // { Time: 37, ETS: -276.3111, NNetAR: 67135.5034, TBATS: 46924.0921, STLM_AR: 48986.4336, Theta: -1714.7901 },
  // { Time: 38, ETS: -276.3255, NNetAR: 52618.3891, TBATS: 45417.1208, STLM_AR: 47902.5281, Theta: -1736.471 },
  // { Time: 39, ETS: -276.3369, NNetAR: 23306.8676, TBATS: 44409.1246, STLM_AR: 46358.7055, Theta: -1708.1907 },
  // { Time: 40, ETS: -276.3461, NNetAR: 14971.5994, TBATS: 41922.3743, STLM_AR: 44854.7442, Theta: -1679.7387 },
  // { Time: 41, ETS: -276.3535, NNetAR: 8112.6254, TBATS: 36812.7328, STLM_AR: 38221.4571, Theta: -1427.2087 },
  // { Time: 42, ETS: -276.3594, NNetAR: 4660.5436, TBATS: 29979.3226, STLM_AR: 29238.053, Theta: -1104.5795 },
  // { Time: 43, ETS: -276.3641, NNetAR: 6052.8044, TBATS: 24239.4878, STLM_AR: 24900.8685, Theta: -947.0343 },
  // { Time: 44, ETS: -276.3678, NNetAR: 6424.2626, TBATS: 21165.3541, STLM_AR: 23235.5296, Theta: -907.2447 },
  // { Time: 45, ETS: -276.3708, NNetAR: 10532.5378, TBATS: 19952.2279, STLM_AR: 20793.4198, Theta: -857.651 },
  // { Time: 46, ETS: -276.3732, NNetAR: 23238.9941, TBATS: 17770.263, STLM_AR: 16617.1602, Theta: -698.8074 },
  // { Time: 47, ETS: -276.3752, NNetAR: 41325.8033, TBATS: 13104.25, STLM_AR: 14088.5628, Theta: -593.1145 },
  // { Time: 48, ETS: -276.3767, NNetAR: 58443.3992, TBATS: 6993.3037, STLM_AR: 8704.4671, Theta: -372.6406 },
];

const LineChart = ({ isCustomLineColors = false, isDashboard = false, model = "wensemble" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const newData = convertRToNivo(inputData);
  const [data, setData] = useState(newData);
  async function callAndLogSolarData() {
    try {
      const data = await getSolarData();
      console.log(data);
    } catch (error) {
      console.error("Error fetching solar data:", error);
    }
  }

  callAndLogSolarData();

  return (
    <ResponsiveLine
      data={data}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Time (Hourly)", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Solar Generation (MW/h)", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
