"use client";
import React, { useState } from "react";
import { Table } from "./components/Table";
import { marketplace, period, sortingDropdown } from "./statics";
import {Container } from "@mui/material";
import clsx from "clsx";
import { useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import { AppButton } from "@/shared/components/AppButton";
import { Listbox } from "@headlessui/react";
import { ArrowLongDownIcon, ArrowLongUpIcon, CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useLocalStorage } from "@uidotdev/usehooks";

const Categories = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const [sorting, setSorting] = useState(sortingDropdown[0]);

  const [periodDay, setPeriodDay] = useLocalStorage("period", "WEEK");
  const [market, setMarket] = useLocalStorage("market", marketplace[1]);

  const handleUpdateSorting = ({name, value}: any) => {
    const isAscending = sorting.value === "+" + value;
    const isDescending = sorting.value === "-" + value;

    if (isAscending) {
      setSorting({
        name,
        value: "-" + value
      });
    } else if (isDescending) {
      setSorting({
        name,
        value: "+" + value
      });
    } else {
      setSorting({
        name,
        value: "+" + value
      });
    }
  };
  
  const renderArrow = (value: string) => {
    if (sorting.value === "+" + value) {
      return <ArrowLongDownIcon />;
    } else if (sorting.value === "-" + value) {
      return <ArrowLongUpIcon />;
    }
    return null;
  };

  return (
    <div className="flex flex-col">
      <div className="heading-layout">
        <Container
          sx={{
            maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important"
          }}>
          <div className="mdb-heading-1">Категории</div>
          <div className="flex gap-3 justify-between">
            <div className="flex gap-2 w-full">
              {period.map((item, key) => (
                <AppButton themeType="sorting" tag="button" key={key} onClick={() => setPeriodDay(item.period)} className={clsx("mdb-button-1", {
                  "mdb-button-1-active": periodDay === item.period
                })}>
                  {item.text}
                </AppButton>
              ))}
              <Listbox value={market} onChange={setMarket}>
                <div className="w-full max-w-[150px] relative">
                  <Listbox.Button className="mdb-button-1 rounded h-full w-full flex justify-between items-center">
                    <span className="pl-[16px]">Маркетплейс</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                    <Listbox.Options className="absolute z-[9999] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {marketplace.map((item, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-1 pl-2 pr-2 hover:bg-[#ebebeb] ${
                              active ? "bg-[#d6d6d6]" : ""
                            }`
                          }
                          value={item}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-bold" : "font-normal"
                                }`}
                              >
                                {item.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 right-2 flex items-center pl-3 text-amber-600">
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                </div>
              </Listbox>
            </div>
            <Listbox value={sorting} onChange={handleUpdateSorting}>
              <div className="w-full max-w-[150px] relative">
                <Listbox.Button className="mdb-button-1 rounded h-full w-full flex justify-between items-center">
                  <span className="pl-[16px]">Сортировка</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                  <Listbox.Options className="absolute z-[9999] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {sortingDropdown.map((item, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-1 pl-2 pr-2 hover:bg-[#ebebeb] ${
                            active ? "bg-[#d6d6d6]" : ""
                          }`
                        }
                        value={item}
                      >
                        <>
                          {item.name}
                          {renderArrow(item.value)}
                        </>
                        {/* {renderArrow(item.value)}

                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-bold" : "font-normal"
                              }`}
                            >
                              {item.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                {renderArrow(item.value)}
                              </span>
                            ) : null}
                          </>
                        )} */}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </Container>
      </div>
        <Container
          sx={{
            maxWidth: customizer.isLayout === "boxed" ? "lg" : "100%!important"
          }}>
          <div className="middle-layout">
            <Table
              market={market.value} 
              period={periodDay}
              sorting={sorting.value}
            />  
          </div>
        </Container>
    </div>
  );
};

export default Categories;
