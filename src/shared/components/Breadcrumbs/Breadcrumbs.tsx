"use client";
import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { BREADCRUMBS_MAP } from "@/shared/static/breadcrumbsMap";

const getBreadcrumbsItem = (value: string) => {
  return BREADCRUMBS_MAP[value] ?? value;
};

type Props = {
  pageTitle?: string | null;
  className?: string;
  name?: string | undefined;
};

export const Breadcrumbs: React.FC<Props> = ({ pageTitle, name, className = "" }) => {
  const { asPath } = useRouter();
  const paths = asPath.split("/").filter((path) => path !== "");

  return (
    <div className={clsx("bg-gray-background", className)}>
      <nav className='container pt-4 md:pt-8 pb-6 md:pb-16 text-sm'>
        <ul
          className={clsx(
            "flex flex-wrap items-center gap-2 md:gap-4 text-gray-500",
          )}
        >
          <li>
            <Link href='/' className='hover:text-gray-400'>
              <span>Главная</span>
            </Link>
          </li>

          {paths.map((item, index) => {
            const currentHref = `/${paths.slice(0, index + 1).join("/")}`;
            const isLast = paths.length === index + 1;
            const label =
              isLast && pageTitle
                ? pageTitle
                : name && !isLast && !BREADCRUMBS_MAP[item]
                ? name
                : getBreadcrumbsItem(item);

            return (
              <li className='flex flex-wrap items-center gap-2 md:gap-4' key={label}>
                <span>/</span>
                {!isLast ? (
                  <Link className='hover:text-gray-400' href={currentHref}>
                    {label}
                  </Link>
                ) : (
                  <span className={clsx(
                    index !== 0 && "hidden md:block"
                  )}>{label}</span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
