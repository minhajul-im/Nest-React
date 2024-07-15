"use client";

type SelectProps = {
  idx: number;
  item: any;
  onSelected: (idx: number, e: string) => void;
};

const SelectItem = ({ idx, item, onSelected }: SelectProps) => {
  return (
    <select
      className="appearance-auto bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline text-gray-500 cursor-pointer"
      value={Object.keys(item)[0]}
      onChange={(e) => onSelected(idx, e.target.value)}>
      <option value="wait">Wait</option>
      <option value="delay">Delay</option>
      <option value="click">Click</option>
      <option value="fill">Fill</option>
    </select>
  );
};

export default SelectItem;
