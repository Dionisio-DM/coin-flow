import { Text } from "@radix-ui/themes";
import { useCurrencies } from "../Hooks/useCurrencies";
import { useTheme } from "../Hooks/useThemeControler";

interface CustomTooltipProps {
  payload?: Array<{ name: string; value: number; fill?: string }>;
  label?: string;
  active?: boolean;
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  payload,
  label,
  active,
}) => {
  const { rate, baseCurrency, targetCurrency } = useCurrencies();
  const { appearance } = useTheme();

  if (!active || !payload || payload.length === 0) {
    return null; // Não renderiza nada se o tooltip não estiver ativo ou sem payload
  }
  return (
    <div
      className="custom-tooltip"
      style={{
        backgroundColor: appearance === "light" ? "#EAEAEF" : "#333333",
        padding: "8px",
        borderRadius: "5px",
      }}
    >
      <Text as="p" mb={"1"}>{`${label}`}</Text>
      <Text as="p">
        {rate <= 1
          ? `${payload[0].value.toFixed(2)} ${baseCurrency}`
          : `${payload[0].value.toFixed(2)} ${targetCurrency}`}
      </Text>
    </div>
  );
};
