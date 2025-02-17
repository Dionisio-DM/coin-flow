const allowedCharacters = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
];

export const filterAllowedCharacters = (input: string): string => {
  return input
    .split("")
    .filter((char) => allowedCharacters.includes(char))
    .join("");
};
