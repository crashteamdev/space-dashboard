import React from "react";
import Slider from "@mui/material/Slider";

interface RangeSliderProps {
  label: string;
  range: number[];
  setRange: React.Dispatch<React.SetStateAction<number[]>>;
  max: number;
}

function valuetext(value: number): string {
  return `${value}`;
}

export const AppSlider: React.FC<RangeSliderProps> = ({ label, range, setRange, max }) => {
  const minDistance = 10;

  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], max - minDistance);
        setRange([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setRange([clamped - minDistance, clamped]);
      }
    } else {
      setRange(newValue as number[]);
    }
  };

  const handleInputChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(max, Number(event.target.value)));
    const newRange = [...range];
    newRange[index] = value;
    // Ensure the min distance constraint is respected
    if (index === 0 && newRange[1] - newRange[0] < minDistance) {
      newRange[1] = Math.min(max, newRange[0] + minDistance);
    } else if (index === 1 && newRange[1] - newRange[0] < minDistance) {
      newRange[0] = Math.max(0, newRange[1] - minDistance);
    }
    setRange(newRange);
  };

  return (
    <div className="flex gap-2 flex-col">
      <div className="font-bold text-base">{label}:</div>
      <div className="flex gap-2">
        <div className="flex gap-1 items-center">
          <b>От:</b>
          <input
            type="number"
            value={range[0]}
            onChange={handleInputChange(0)}
            className="border-[#e7e7e7] border rounded-md p-1"
          />
        </div>
        <div className="flex gap-1 items-center">
          <b>До:</b>
          <input
            type="number"
            value={range[1]}
            onChange={handleInputChange(1)}
            className="border-[#e7e7e7] border rounded-md p-1"
          />
        </div>
      </div>
      <Slider
        getAriaLabel={() => "Minimum distance shift"}
        value={range}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        max={max}
      />
    </div>
  );
};
