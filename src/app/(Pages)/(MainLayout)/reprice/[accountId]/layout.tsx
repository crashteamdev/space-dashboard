"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "@/shared/store/hooks";
import { AppState } from "@/shared/store/store";
import { useRouter } from "next/navigation";


export default function RepriceLayout({ children }: { children: React.ReactNode }) {
  
  const router = useRouter();
  const company = useSelector((state: AppState) => state.companyChanger) as any;

  const [currentCompany, setCurrentCompany] = useState(company.activeCompany) as any;

  useEffect(() => {
    if (company.activeCompany !== currentCompany) {
      console.log("work");
      router.push("/reprice");
      setCurrentCompany(company.activeCompany);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company.activeCompany]);

  return (
    <div>
      {children}
    </div>
  );
}
