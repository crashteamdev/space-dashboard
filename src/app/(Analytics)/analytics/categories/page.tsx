"use client";
import React, { useState } from "react";
// import {ArrowDown, ArrowUp} from "@gravity-ui/icons";
import { Table } from "./components/Table";
import { period, sortingDropdown } from "./statics";
import {Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import clsx from "clsx";
import { useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import { AppButton } from "@/shared/components/AppButton";

const Categories = () => {
  const customizer = useSelector((state: AppState) => state.customizer);

  const [market, setMarket] = useState<string>("KE");
  const [sorting, setSorting] = useState<string>("");
  const [periodDay, setPeriodDay] = useState<string>("WEEK");
  
  // const handleUpdateSorting = (value: string) => {
  //   const isAscending = sorting === "+" + value;
  //   const isDescending = sorting === "-" + value;

  //   if (isAscending) {
  //     setSorting("-" + value);
  //   } else if (isDescending) {
  //     setSorting("+" + value);
  //   } else {
  //     setSorting("+" + value);
  //   }
  // };
  
  // const renderArrow = (value: string) => {
  //   if (sorting === "+" + value) {
  //     return <ArrowUp />;
  //   } else if (sorting === "-" + value) {
  //     return <ArrowDown />;
  //   }
  //   return null;
  // };

  return (
    <div className="flex flex-col">
      <div className="heading-layout">
        <Container
          sx={{
            maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important"
          }}>
          <div className="mdb-heading-1">Категории</div>
          <div className="flex gap-3">
            <div className="flex gap-2">
              {period.map((item, key) => (
                <AppButton themeType="sorting" tag="button" key={key} onClick={() => setPeriodDay(item.period)} className={clsx("mdb-button-1", {
                  "mdb-button-1-active": periodDay === item.period
                })}>
                  {item.text}
                </AppButton>
              ))}
            </div>
            {/* <FormControl variant="standard">
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                label="market"
                defaultValue="KE"
              >
                <MenuItem value={"KE"}>KazanExpress</MenuItem>
                <MenuItem value={"UZ"}>Uzum</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Сортировка</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={sorting}
                onChange={(e) => setSorting(e.target.value)}
                label="sorting"
                defaultValue="revenue"
              >
                {sortingDropdown.map((item, key) => (
                  <MenuItem key={key} value={item.value}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl> */}
          </div>
        </Container>
      </div>
        <Container
          sx={{
            maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important"
          }}>
          <div className="middle-layout">
            <Table
              market={market} 
              period={periodDay}
              sorting={sorting}
            />  
          </div>
        </Container>
    </div>
  );
};

export default Categories;
