import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, PropsWithChildren } from "react";
import Link, { LinkProps as NextLinkProps } from "next/link";
import { AppSpinner } from "@/shared/components/AppSpinner";
import { clsx } from "clsx";
import { omit } from "rambda";
import { IconType } from "@/shared/components/AppIcon/types";
import { AppIcon } from "@/shared/components/AppIcon";

type CommonProps = {
  themeSize?: "small" | "default" | "large";
  themeType?: "primary" | "secondary" | "outline";
  themeColor?: "primary" | "secondary" | "danger";
  iconType?: IconType;
  rounded?: boolean;
  className?: string;
  iconClassName?: string;
};

type ButtonProps = {
  tag: "button";
  id?: string;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

type LinkProps = {
  tag: "a";
} & (NextLinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>);

type Props = CommonProps & (ButtonProps | LinkProps);

export const AppButton: React.FC<PropsWithChildren<Props>> = ({
  children,
  id = "",
  themeSize = "default",
  themeType = "primary",
  rounded = false,
  iconType,
  className = "",
  iconClassName = "",
  ...props
}) => {
  const classes = clsx(
    "inline-flex group rounded-[4px]",
    "px-[16px] py-[10px]",
    "text-sm font-medium shadow-base",
    {
      "bg-blue text-white hover:bg-blue-hover": themeType === "primary",
      "bg-white text-blue hover:bg-white-hover": themeType === "secondary",
      "!rounded-full": rounded
    },
    className
  );

  return props.tag === "button" ? (
    <button
      id={id}
      {...omit(["tag", "loading"], props)}
      disabled={props.disabled ?? props.loading ?? false}
      className={clsx(classes, {
        "pointer-events-none relative": props.loading,
        "bg-gray-800 !text-gray-400 hover:bg-gray-800": props.disabled
      })}
    >
      {props.loading && <AppSpinner className='absolute w-6 h-6' themeType='primary' />}
      {children && (
        <span
          className={clsx("leading-none", {
            invisible: props.loading
          })}
        >
          {children}
        </span>
      )}
      {iconType && (
        <AppIcon
          type={iconType}
          className={clsx("w-5 h-5 ", { "md:w-6 md:h-6 ": themeSize === "large" }, iconClassName)}
        />
      )}
    </button>
  ) : (
    <Link {...omit("tag", props)} className={classes}>
      {children && <span className=''>{children}</span>}
      {iconType && (
        <AppIcon
          type={iconType}
          className={clsx("w-5 h-5", { "md:w-6 md:h-6": themeSize === "large" }, iconClassName)}
        />
      )}
    </Link>
  );
};

AppButton.displayName = "AppButton";
