import {
  Card,
  Flex,
  ScrollArea,
  SegmentedControl,
  Text,
} from "@radix-ui/themes";
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
import { useChart } from "../Hooks/useChart";
import { CustomTooltip } from "./CustomTooltip";
import { useTheme } from "../Hooks/useThemeController";

export const ChartCard: React.FC = () => {
  const { appearance } = useTheme();
  const { baseCurrency, targetCurrency, rate, currencyNames } = useCurrencies();
  const {
    seriesData,
    maxInPeriod,
    minInPeriod,
    getSeriesData,
    segmentedControlValue,
    updateSegmentedControlValue,
  } = useChart();

  const segmentedControl = [
    { time: "month", value: 1 },
    { time: "semester", value: 6 },
    { time: "year", value: 12 },
    { time: "halfDecade", value: 60 },
  ];

  const onChangeHandle = (value: string) => {
    const months =
      segmentedControl.find((item) => item.time === value)?.value || 1;

    updateSegmentedControlValue(value);
    getSeriesData(months, baseCurrency, targetCurrency);
  };

  return (
    <Card>
      <Flex justify={"center"}>
        <Text align={"center"} size={"5"} weight={"bold"}>
          {rate <= 1
            ? `Valor de 1 ${currencyNames[targetCurrency]} em ${currencyNames[baseCurrency]}`
            : `Valor de 1 ${currencyNames[baseCurrency]} em ${currencyNames[targetCurrency]}`}
        </Text>
      </Flex>
      <ScrollArea scrollbars="horizontal">
        <SegmentedControl.Root
          value={segmentedControlValue}
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
          <CartesianGrid
            strokeDasharray="4 4"
            stroke={appearance === "light" ? "#8b8b8b" : "#ccc"}
          />
          <XAxis
            dataKey="date"
            tick={{ fill: appearance === "light" ? "#000" : "#ccc" }}
            tickMargin={20}
            angle={-45}
          />

          <YAxis
            domain={[minInPeriod - 0.05, maxInPeriod + 0.1]}
            tick={{ fill: appearance === "light" ? "#000" : "#ccc" }}
            tickMargin={8}
            tickFormatter={(value: number) => value.toFixed(2)}
          />
          <Tooltip content={<CustomTooltip />} />
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
