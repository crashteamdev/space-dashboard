import { useState, useEffect } from "react";

export function useDebounce(value: string, delay: number) {
  // Состояние для хранения дебаунсированного значения
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Установка таймера для задержки
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Очистка таймера при каждом изменении значения
    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
}