import React, { useState } from "react";
import { ArrowLongDownIcon, ArrowLongUpIcon } from "@heroicons/react/20/solid";

interface SortingState {
  name: string;
  value: string;
}
  
interface UseSorting {
  sorting: SortingState;
  handleUpdateSorting: (options: { name: string; value: string }) => void;
  renderArrow: (value: string) => JSX.Element | null;
}
  
const useSorting = (): UseSorting => {
  const [sorting, setSorting] = useState<SortingState>({name: "Выручка", value: "-revenue"});
  
  const handleUpdateSorting = ({ name, value }: { name: string; value: string }) => {
    const isAscending = sorting.value === "-" + value.slice(0);
    const isDescending = sorting.value === "+" + value.slice(0);
    if (isAscending) {
      setSorting({
        name,
        value: "+" + value,
      });
    } else if (isDescending) {
      setSorting({
        name,
        value: "-" + value,
      });
    } else {
      setSorting({
        name,
        value: "-" + value,
      });
    }
  };
  
  const renderArrow = (value: string): JSX.Element | null => {
    if (sorting.value === "+" + value) {
      return <ArrowLongDownIcon />;
    } else if (sorting.value === "-" + value) {
      return <ArrowLongUpIcon /> ;
    }
    return null;
  };
  
  return { sorting, handleUpdateSorting, renderArrow };
};
  
export default useSorting;