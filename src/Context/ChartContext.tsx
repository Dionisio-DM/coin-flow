import { createContext, ReactNode, useState } from "react";

export interface ChartContextData {
  segmentedControlValue: string;
  updateSegmentedControlValue: (value: string) => void;
}

export const ChartContext = createContext({} as ChartContextData);

interface ChartContextProviderProps {
  children: ReactNode;
}

export const ChartContextProvider: React.FC<ChartContextProviderProps> = ({
  children,
}) => {
  const [segmentedControlValue, setSegmentedControlValue] =
    useState<string>("month");
  const updateSegmentedControlValue = (value: string) => {
    setSegmentedControlValue(value);
  };

  return (
    <ChartContext.Provider
      value={{ segmentedControlValue, updateSegmentedControlValue }}
    >
      {children}
    </ChartContext.Provider>
  );
};
