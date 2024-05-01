import React from "react";
import Slider from "@mui/material/Slider";
import styled from "@emotion/styled";

interface RangeSliderProps {
  label: string;
  range: number[];
  setRange: React.Dispatch<React.SetStateAction<number[]>>;
  max: number;
  minDistance?: number;
}

function valuetext(value: number): string {
  return `${value}`;
}

const StyledSlider = styled(Slider)`
  .MuiSlider-track {
    background: #3E4784;
    border-color: #3E4784;
  }
  .MuiSlider-thumb {
    background: #3E4784;
    &:hover {
      box-shadow: 0px 0px 0px 8px #4e5ba62e;
    }
  }
  .MuiSlider-rail {
    background: #4E5BA6;
  }
`;

export const AppSlider: React.FC<RangeSliderProps> = ({ label, range, setRange, max, minDistance = 10 }) => {

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
    const valueStr = event.target.value;
    // Удаление любых нечисловых символов и ведущих нулей, но оставление пустой строки, если ничего не введено
    const sanitizedValue = valueStr === "" ? "" : parseInt(valueStr, 10).toString();
  
    let value = sanitizedValue === "" ? 0 : parseInt(sanitizedValue, 10); // Преобразование обратно в число для последующей логики
    value = Math.max(0, Math.min(max, value)); // Применение минимального и максимального ограничений
  
    const newRange = [...range];
    newRange[index] = value;
  
    // Обеспечение соблюдения минимального расстояния между ползунками
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
            type="text"
            value={range[0]}
            onChange={handleInputChange(0)}
            className="border-[#e7e7e7] border rounded-md p-1 w-full max-w-[135px]"
          />
        </div>
        <div className="flex gap-1 items-center">
          <b>До:</b>
          <input
            type="number"
            value={range[1]}
            onChange={handleInputChange(1)}
            className="border-[#e7e7e7] border rounded-md p-1 w-full max-w-[135px]"
          />
        </div>
      </div>
      <StyledSlider
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
