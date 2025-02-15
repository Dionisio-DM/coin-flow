import { Card, ScrollArea, SegmentedControl } from "@radix-ui/themes";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCurrencies } from "../Hooks/useCurrencies";

export const ChartCard: React.FC = () => {
  const {
    seriesData,
    maxInPeriod,
    minInPeriod,
    baseCurrency,
    targetCurrency,
    getSeriesData,
  } = useCurrencies();

  const onChangeHandle = (value: string) => {
    console.log(value);
    let months = 0;
    switch (value) {
      case "month":
        months = 1;
        break;
      case "semester":
        months = 6;
        break;

      case "year":
        months = 12;
        break;

      case "halfDecade":
        months = 60;
        break;
      default:
        break;
    }
    getSeriesData(months, baseCurrency, targetCurrency);
  };

  return (
    <Card>
      <ScrollArea scrollbars="horizontal">
        <SegmentedControl.Root
          defaultValue="month"
          mb={"5"}
          mt={"2"}
          ml={"2"}
          onValueChange={onChangeHandle}
        >
          <SegmentedControl.Item value="month">1 mês</SegmentedControl.Item>
          <SegmentedControl.Item value="semester">
            6 meses
          </SegmentedControl.Item>
          <SegmentedControl.Item value="year">1 ano</SegmentedControl.Item>
          <SegmentedControl.Item value="halfDecade">
            5 ano
          </SegmentedControl.Item>
          {/* <SegmentedControl.Item value="max">max</SegmentedControl.Item> */}
        </SegmentedControl.Root>
      </ScrollArea>

      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart
          width={500}
          height={200}
          data={seriesData}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 10,
            bottom: 27,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis
            dataKey="date"
            tick={{ fill: "#ccc" }}
            tickMargin={20}
            angle={-45}
          />

          <YAxis
            domain={[minInPeriod - 0.05, maxInPeriod + 0.1]}
            tick={{ fill: "#ccc" }}
            tickMargin={8}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            fill="#8884d8"
            dot={{ r: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
