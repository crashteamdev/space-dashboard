import React, { useEffect } from "react";
import styles from "./SwitchTheme.module.scss";
import { useDispatch, useSelector } from "@/shared/store/hooks";
import { setDarkMode } from "@/shared/store/slices/customizer/CustomizerSlice";
import { AppState } from "@/shared/store/store";
import Sun from "../../shared/assets/imageComponents/Sun";
import Moon from "../../shared/assets/imageComponents/Moon";

const SwitchTheme = () => {
  const theme = useSelector((state: AppState) => state.customizer) as any;
  const dispatch = useDispatch();

  const changeTheme = () => {
    dispatch(setDarkMode(theme.activeMode === "light" ? "dark" : "light"));
    localStorage.setItem(
      "theme",
      theme.activeMode === "light" ? "dark" : "light"
    );
  };

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      localStorage.getItem("theme");
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <label className={styles.container}>
      <div className={styles.switch}>
        <input
          checked={theme.activeMode === "light" ? true : false}
          onChange={() => changeTheme()}
          type="checkbox"
        />
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
