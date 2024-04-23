import React, {useState} from "react";
import { marketplace, period, sortingDropdown } from "../../../statics";
import { AppButton } from "@/shared/components/AppButton";
import clsx from "clsx";
import { useLocalStorage } from "@uidotdev/usehooks";
import useSorting from "@/shared/hooks/useSorting";
import { AppSelect } from "@/shared/components/AppSelect";
import { Table } from "./components/Table/Table";
import { Filter } from "./components/Filter";

export const Products = (category: any) => {    
    const [periodDay, setPeriodDay] = useLocalStorage("period", "WEEK");
    const { sorting, handleUpdateSorting, renderArrow } = useSorting();
    const [market,] = useLocalStorage("market", marketplace[1]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [filters, setFilters] = useState({});

    const handleFilters = (newFilters: any) => {
        setFilters(newFilters);
    };
    
    return (
        <>  
            <Filter isOpen={isOpen} setIsOpen={setIsOpen} onApplyFilters={handleFilters} />
            <div className="heading-layout">
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
                    </div>
                    <div className="flex gap-2 justify-end w-full">
                        <AppButton iconType="filter" themeType="sorting" tag="button" onClick={() => setIsOpen(true)} className={clsx("mdb-button-1 items-center gap-[5px]")}>
                            Фильтр
                        </AppButton>
                        <AppSelect sortingDropdown={sortingDropdown} sorting={sorting} handleUpdateSorting={handleUpdateSorting} renderArrow={renderArrow}  />
                    </div>
                </div>
            </div>
            <Table sorting={sorting.value} period={periodDay} category={category} market={market.value} filters={filters} />
        </>
    );
};