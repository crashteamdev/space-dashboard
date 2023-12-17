import React from "react";
import styles from "./Link.module.scss";
import Link from "next/link";

const CustomLink = ({ isExternal, href, children }: any) => {
  if (isExternal) {
    return (
      <Link className={styles.link} href={href}>
        {children}
      </Link>
    );
  }
  return (
    <a className={styles.link} target='_blank' href={href} rel='noreferrer'>
      {children}
    </a>
  );
};

export default CustomLink;
