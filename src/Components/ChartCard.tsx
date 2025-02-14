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
  const { seriesData, maxInPeriod, minInPeriod } = useCurrencies();

  return (
    <Card>
      <ScrollArea scrollbars="horizontal">
        <SegmentedControl.Root defaultValue="month" mb={"5"} mt={"2"} ml={"2"}>
          <SegmentedControl.Item value="month">1 mês</SegmentedControl.Item>
          <SegmentedControl.Item value="semester">
            6 meses
          </SegmentedControl.Item>
          <SegmentedControl.Item value="year">1 ano</SegmentedControl.Item>
          <SegmentedControl.Item value="halfDecade">
            5 ano
          </SegmentedControl.Item>
          <SegmentedControl.Item value="max">max</SegmentedControl.Item>
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
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="date" tick={{ fill: "#ccc" }} tickMargin={8} />

          <YAxis
            domain={[minInPeriod - 0.05, maxInPeriod + 0.05]}
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
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
