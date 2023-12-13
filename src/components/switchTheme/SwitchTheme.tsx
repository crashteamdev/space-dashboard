"use client";

import React, { useEffect, useState } from "react";
import styles from "./SwitchTheme.module.scss";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { setDarkMode } from "@/shared/store/slices/customizer/CustomizerSlice";
import { AppState } from "@/shared/store/store";
import Sun from "../../shared/assets/imageComponents/Sun";
import Moon from "../../shared/assets/imageComponents/Moon";

const SwitchTheme = () => {
  const theme = useSelector((state: AppState) => state.customizer) as any;
  const dispatch = useDispatch();
  const [light, setLight] = useState(localStorage.getItem("theme") != "light");

  const changeTheme = () => {
    localStorage.setItem("theme", theme.activeMode === "light" ? "dark" : "light");
    setLight(localStorage.getItem("theme") === "dark");

    dispatch(setDarkMode(theme.activeMode === "light" ? "dark" : "light"));
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setLight(localStorage.getItem("theme") === "light");
    } else {
      setLight(true);
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <label className={styles.container}>
      <div className={styles.switch}>
        <input checked={light} onChange={() => changeTheme()} type='checkbox' />
        <span className={`${styles.slider} ${styles.round}`}></span>
        <div className={styles.image}>
          <Moon />
        </div>
        <div className={styles.imageRight}>
          <Sun />
        </div>
      </div>
    </label>
  );
};

export default SwitchTheme;
