import React from "react";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface SortingState {
    name: string;
    value: string;
}

interface IAppSelect {
    sortingDropdown: any;
    sorting: SortingState;
    handleUpdateSorting: (options: { name: string; value: string }) => void;
    renderArrow: (value: string) => JSX.Element | null;
}

export const AppSelect = ({sortingDropdown, sorting, handleUpdateSorting, renderArrow }: IAppSelect): JSX.Element => {
    return (
        <>
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
                    <Listbox.Options className="absolute z-[9999] mt-1 max-h-70 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {sortingDropdown.map((item: SortingState, index: number) => (
                            <Listbox.Option
                                key={index}
                                className={({ active }) =>
                                    `relative cursor-pointer select-none py-1 pr-2 hover:bg-[#ebebeb] flex gap-1 pl-5 ${
                                    active ? "bg-[#d6d6d6]" : ""
                                    }`
                                }
                                value={item}
                            >
                            <>
                                <div className="w-[20px] absolute left-0">{renderArrow(item.value)}</div>
                                <div>{item.name}</div>
                            </>
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </>
    );
};

