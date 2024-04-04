"use client";
import React, { useState } from "react";
// import {ArrowDown, ArrowUp} from "@gravity-ui/icons";
import { Table } from "./components/Table";
import { sortingDropdown } from "./statics";
import { Breadcrumbs, Button, FormControl, InputLabel, Link, MenuItem, Select, Typography } from "@mui/material";

const Categories = () => {
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

      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">Аналитика</Link>
        <Typography color="text.primary">Категории</Typography>
      </Breadcrumbs>

      <Typography variant="h2">Аналитика категорий</Typography>

      <div className="flex gap-3">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-standard-label">Маркетплейс</InputLabel>
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
          <div className="flex gap-2">
            <Button variant={periodDay == "WEEK" ? "contained" : "outlined"} onClick={() => setPeriodDay("WEEK")}>
              7 дней
            </Button>
            <Button variant={periodDay == "TWO_WEEK" ? "contained" : "outlined"} onClick={() => setPeriodDay("TWO_WEEK")}>
              14 дней
            </Button>
            <Button variant={periodDay == "MONTH" ? "contained" : "outlined"} onClick={() => setPeriodDay("MONTH")}>
              30 дней
            </Button>
            <Button variant={periodDay == "TWO_MONTH" ? "contained" : "outlined"} onClick={() => setPeriodDay("TWO_MONTH")}>
              60 дней
            </Button>
          </div>
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
          </FormControl>
        </div>

        <Table
          className="mt-5"
          market={market} 
          period={periodDay}
          sorting={sorting}
        />  
    </div>
  );
};

export default Categories;
