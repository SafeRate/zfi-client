import {
  Box,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Scatter } from "react-chartjs-2";
import { RouteArgs } from "../Home/Home";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Treasuries = (routeArgs: RouteArgs) => {
  const { currentAccount, setCurrentAccount } = routeArgs;

  const years = [
    0.0833, 0.1667, 0.25, 0.333, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  const yields = [
    3.58, 3.83, 4.09, 4.33, 4.48, 4.66, 4.54, 4.43, 4.33, 4.25, 4.19, 4.14, 4.1,
    4.07, 4.06, 4.04, 4.04, 4.04, 4.05, 4.05, 4.07, 4.08, 4.09, 4.11, 4.13,
    4.14, 4.16, 4.18, 4.2, 4.21, 4.23, 4.25, 4.27, 4.28, 4.3,
  ];

  const datasetData = [];
  for (let y = 0; y < years.length; y++) {
    datasetData.push({ x: years[y], y: yields[y] });
  }

  console.log(datasetData);

  const data = {
    datasets: [
      {
        label: "Zero coupon UST yield curve",
        data: datasetData,
        fill: true,
        showLine: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  return (
    <Box>
      <Box>
        <Scatter
          data={data}
          options={{
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const text = [];
                    let label = context.dataset.label || "";
                    text.push(label + ": ");

                    if (context.parsed.x) {
                      const x = context.parsed.x;
                      if (x <= 0.1) {
                        text.push("1-month");
                      } else if (x <= 0.2) {
                        text.push("2-months");
                      } else if (x <= 0.26) {
                        text.push("3-months");
                      } else if (x <= 0.35) {
                        text.push("4-months");
                      } else if (x <= 0.51) {
                        text.push("6-months");
                      } else {
                        text.push(`${x} year${x === 1 ? "" : "s"}`);
                      }
                    }
                    if (context.parsed.y !== null) {
                      text.push(`${context.parsed.y}%`);
                    }
                    return text;
                  },
                },
              },
            },
          }}
        />
      </Box>
      <Box>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Unit Name</Th>
              <Th>Name</Th>
              <Th>Amount Issued:</Th>
              <Th>Amount Remaining:</Th>
              <Th>Unit</Th>
              <Th>Price</Th>
              <Th>Payment Date:</Th>
              <Th>Current Anuualized APY:</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>WT221120</Td>
              <Td>WeFi Treasury 2022-11-20</Td>
              <Td>$100,000</Td>
              <Td>$99,100</Td>
              <Td>$100</Td>
              <Td>$99.71</Td>
              <Td>2022-11-20</Td>
              <Td>3.54%</Td>
            </Tr>
            <Tr>
              <Td>WT230119</Td>
              <Td>WeFi Treasury 2023-01-19</Td>
              <Td>$100,000</Td>
              <Td>$98,700</Td>
              <Td>$100</Td>
              <Td>$99.11</Td>
              <Td>2022-01-19</Td>
              <Td>3.64%</Td>
            </Tr>
            <Tr>
              <Td>WT230419</Td>
              <Td>WeFi Treasury 2023-04-19</Td>
              <Td>$100,000</Td>
              <Td>$97,500</Td>
              <Td>$100</Td>
              <Td>$97.92</Td>
              <Td>2023-04-19</Td>
              <Td>4.31%</Td>
            </Tr>
            <Tr>
              <Td>WT231020</Td>
              <Td>WeFi Treasury 2023-10-20</Td>
              <Td>$100,000</Td>
              <Td>$90,100</Td>
              <Td>$100</Td>
              <Td>$95.55</Td>
              <Td>2023-10-20</Td>
              <Td>4.66%</Td>
            </Tr>
          </Tbody>
          <Tfoot />
        </Table>
      </Box>
    </Box>
  );
};

export default Treasuries;
