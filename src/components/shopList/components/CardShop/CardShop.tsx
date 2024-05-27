import React from "react";
import { AppButton } from "@/shared/components/AppButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type IPropsShop = {
    id: string;
    name: string;
    skuTitle: string;
    shopData: {
        poolItems: number;
        products: number;
        skus: number;
    }
};

type Props = {
    item: IPropsShop;
    accountId: string;
};

export const CardShop: React.FC<Props> = ({ item, accountId }) => {
    return (
        <div key={item.id} className="card bg-white p-3 rounded-lg w-full max-w-[435px] relative">
            <div className="font-bold text-base relative">
                {item.name}
            </div>
            <div className="font-normal text-xs text-[gray]">
                Магнит Маркет
            </div>
            <AppButton tag="a" href={`/reprice/${accountId}/${item.id}`}className="absolute right-3 top-3 !p-2 bg-blueGray-100">
                <NavigateNextIcon className="text-white" />
            </AppButton>
            <div className="flex flex-col gap-4 mt-4 mb-4">
                <div className="flex justify-between border-b border-[#909090] pb-0.5">
                <span className="text-sm text-[#909090]">Товаров в пуле:</span>
                <span className="text-blueGray-900 font-normal">{item.shopData.poolItems}</span>
                </div>
                <div className="flex justify-between border-b border-[#909090] pb-0.5">
                <span className="text-sm text-[#909090]">Количество товаров</span>
                <span className="text-blueGray-900 font-normal">{item.shopData.products}</span>
                </div>
                <div className="flex justify-between border-b border-[#909090] pb-0.5">
                <span className="text-sm text-[#909090]">Количество SKU:</span>
                <span className="text-blueGray-900 font-normal">{item.shopData.skus}</span>
                </div>
            </div>
        </div>
    );
};
