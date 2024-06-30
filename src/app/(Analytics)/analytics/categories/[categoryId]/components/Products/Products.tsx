import React, {useState} from "react";
import { marketplace, period, sortingDropdownProduct } from "../../../statics";
import { AppButton } from "@/shared/components/AppButton";
import clsx from "clsx";
import { useLocalStorage } from "@uidotdev/usehooks";
import useSorting from "@/shared/hooks/useSorting";
import { AppSelect } from "@/shared/components/AppSelect";
import { Table } from "./components/Table/Table";
import { Filter } from "./components/Filter";
import { AppIcon } from "@/shared/components/AppIcon";

export const Products = (category: any) => {    
    const [periodDay, setPeriodDay] = useLocalStorage("period", "WEEK");
    const { sorting, handleUpdateSorting, renderArrow } = useSorting();
    const [market,] = useLocalStorage("market", marketplace[1]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [filters, setFilters] = useState({});

    const handleFilters = (newFilters: any) => {
        setFilters(newFilters);
    };

    const handleSearch = () => {
        setSearchQuery(searchInput);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };
    
    return (
        <>  
            <Filter isOpen={isOpen} setIsOpen={setIsOpen} onApplyFilters={handleFilters} />
            <div className="heading-layout">
                <div className="flex gap-3 justify-between">
                    <div className="flex gap-2 w-full">
                        {period.map((item, key) => (
                            <AppButton themeType="sorting" tag="button" key={key} onClick={() => setPeriodDay(item.period)} className={clsx("mdb-button-1", {
                                "mdb-button-1-active": periodDay === item.period
                            })}>
                                {item.text}
                            </AppButton>
                        ))}
                    </div>
                    <div className="flex gap-2 justify-end w-full">
                        <div className="relative flex items-center w-full max-w-[256px]">
                            <button 
                                className="absolute w-[17px] h-[17px] right-2.5 cursor-pointer" 
                                onClick={handleSearch}
                            >
                                <AppIcon type="search" className="w-full h-full"/>
                            </button>
                            <input 
                                placeholder="Поиск / ProductID" 
                                className="bg-[#e5e5e5] rounded border border-none p-2.5 text-black text-[14px] font-normal w-full placeholder:text-[#000]"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <AppButton iconType="filter" themeType="sorting" tag="button" onClick={() => setIsOpen(true)} className={clsx("mdb-button-1 items-center gap-[5px]")}>
                            Фильтр
                        </AppButton>
                        <AppSelect sortingDropdown={sortingDropdownProduct} sorting={sorting} handleUpdateSorting={handleUpdateSorting} renderArrow={renderArrow}  />
                    </div>
                </div>
            </div>
            <Table search={searchQuery} sorting={sorting.value} period={periodDay} category={category} market={market.value} filters={filters} />
        </>
    );
};