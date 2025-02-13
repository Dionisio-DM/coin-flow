import { Card, SegmentedControl } from "@radix-ui/themes";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "2025-01-01",
    uv: 4000,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const ChartCard: React.FC = () => {
  return (
    <Card>
      <SegmentedControl.Root defaultValue="inbox" mb={"5"} mt={"2"} ml={"2"}>
        <SegmentedControl.Item value="month">1 mês</SegmentedControl.Item>
        <SegmentedControl.Item value="semester">6 meses</SegmentedControl.Item>
        <SegmentedControl.Item value="year">1 ano</SegmentedControl.Item>
        <SegmentedControl.Item value="halfDecade">5 ano</SegmentedControl.Item>
        <SegmentedControl.Item value="max">max</SegmentedControl.Item>
      </SegmentedControl.Root>

      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="name" tick={{ fill: "#ccc" }} tickMargin={8} />

          <YAxis tick={{ fill: "#ccc" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              color: "#fff",
              border: "none",
            }}
          />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
