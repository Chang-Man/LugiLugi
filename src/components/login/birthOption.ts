const yearStart = 1950;
const yearEnd = 2022;
export const yearOption = Array.from(Array(yearEnd - yearStart + 1)).map((_, i) => {
  const option = { value: String(i + yearStart), label: String(i + yearStart) + '년' };
  return option;
});
export const monthOption = [
  { value: '1', label: '1월' },
  { value: '2', label: '2월' },
  { value: '3', label: '3월' },
  { value: '4', label: '4월' },
  { value: '5', label: '5월' },
  { value: '6', label: '6월' },
  { value: '7', label: '7월' },
  { value: '8', label: '8월' },
  { value: '9', label: '9월' },
  { value: '10', label: '10월' },
  { value: '11', label: '11월' },
  { value: '12', label: '12월' },
];

export const dayOption = Array.from(Array(31)).map((_, i) => {
  const option = { value: String(i + 1), label: String(i + 1) + '일' };
  return option;
});
