"use client";
import React, { useState } from "react";
import {Button, Select, Text} from "@gravity-ui/uikit";
import {Breadcrumbs} from "@gravity-ui/uikit";
import {ArrowDown, ArrowUp} from "@gravity-ui/icons";
import { Table } from "./components/Table";
import { sortingDropdown } from "./statics";

const Categories = () => {
  const [market, setMarket] = useState<string>("KE");
  const [sorting, setSorting] = useState<string>("");
  const [periodDay, setPeriodDay] = useState<number>(30);
  
  const handleUpdateSorting = (value: string) => {
    const isAscending = sorting === "+" + value;
    const isDescending = sorting === "-" + value;

    if (isAscending) {
      setSorting("-" + value);
    } else if (isDescending) {
      setSorting("+" + value);
    } else {
      setSorting("+" + value);
    }
  };
  
  const renderArrow = (value: string) => {
    if (sorting === "+" + value) {
      return <ArrowUp />;
    } else if (sorting === "-" + value) {
      return <ArrowDown />;
    }
    return null;
  };

  return (
    <div className="flex flex-col">
        <Breadcrumbs
          className="mb-5"
          items={[
            {
              text: "Аналитика",
              action: () => {},
            },
            {
              text: "Категории",
              action: () => {},
            },
          ]}
          firstDisplayedItemsCount={1}
          lastDisplayedItemsCount={1}
        />
        <Text variant="header-1">Аналитика категорий</Text>
        <div className="flex gap-3">
          <Select placeholder="Маркетплейс" defaultValue={["KE"]} onUpdate={(e) => setMarket(e[0])}>
            <Select.Option value="KE">KazanExpress</Select.Option>
            <Select.Option value="UZ">Uzum</Select.Option>
          </Select>
          <div className="flex gap-2">
            <Button view="outlined" size="l" onClick={() => setPeriodDay(30)}>
              30 дней
            </Button>
            <Button view="outlined" size="l" onClick={() => setPeriodDay(60)}>
              60 дней
            </Button>
          </div>
          <Select 
            renderControl={({onClick, onKeyDown, ref}) => {
              return <button ref={ref} onClick={onClick} extraProps={{onKeyDown}}>Сортировка</button>
            }}
            renderOption={(e) => (
              <div onClick={() => handleUpdateSorting(e.value)}> {e.children} {renderArrow(e.value)}</div>
            )}>
            {sortingDropdown.map((item, index) => (
              <Select.Option key={index} value={item.value}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </div>

        <Table 
          market={market} 
          period={periodDay}
          sorting={sorting}
        />
    </div>
  );
};

export default Categories;
