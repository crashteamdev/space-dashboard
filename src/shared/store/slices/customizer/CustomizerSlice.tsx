import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  activeDir?: string | any;
  activeMode?: string; // This can be light or dark
  activeTheme?: string; // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
  SidebarWidth?: number;
  MiniSidebarWidth?: number;
  TopbarHeight?: number;
  isCollapse?: boolean;
  isLayout?: string;
  isSidebarHover?: boolean;
  isMobileSidebar?: boolean;
  isHorizontal?: boolean;
  isLanguage?: string;
  isCardShadow?: boolean;
  borderRadius?: number | any;
  isHeader?: boolean;
  isBreadcrumb?: boolean;
}

const initialState: StateType = {
  activeDir: "ltr",
  activeMode: "dark", // This can be light or dark
  activeTheme: "CUSTOM_THEME", // BLUE_THEME, CUSTOM_THEME
  SidebarWidth: 270,
  MiniSidebarWidth: 87,
  TopbarHeight: 70,
  isLayout: "full", // This can be full or boxed
  isCollapse: false, // to make sidebar Mini by default
  isSidebarHover: false,
  isMobileSidebar: false,
  isHorizontal: false,
  isLanguage: "ru",
  isCardShadow: true,
  borderRadius: 7,
  isHeader: true,
  isBreadcrumb: true,
};

export const CustomizerSlice = createSlice({
  name: "customizer",
  initialState,
  reducers: {
    setTheme: (state: StateType, action) => {
      state.activeTheme = action.payload;
    },
    setDarkMode: (state: StateType, action) => {
      state.activeMode = action.payload;
    },
    setDir: (state: StateType, action) => {
      state.activeDir = action.payload;
    },
    setLanguage: (state: StateType, action) => {
      localStorage.setItem("lng", action.payload);
      state.isLanguage = action.payload;
    },
    setCardShadow: (state: StateType, action) => {
      state.isCardShadow = action.payload;
    },
    toggleSidebar: (state) => {
      state.isCollapse = !state.isCollapse;
    },
    hoverSidebar: (state: StateType, action) => {
      state.isSidebarHover = action.payload;
    },
    toggleMobileSidebar: (state) => {
      state.isMobileSidebar = !state.isMobileSidebar;
    },
    toggleLayout: (state: StateType, action) => {
      state.isLayout = action.payload;
    },
    toggleHorizontal: (state: StateType, action) => {
      state.isHorizontal = action.payload;
    },
    setBorderRadius: (state: StateType, action) => {
      state.borderRadius = action.payload;
    },
    toggleHeader: (state: StateType, action) => {
      state.isHeader = action.payload;
    },
  },
});

export const {
  setTheme,
  setDarkMode,
  setDir,
  toggleSidebar,
  hoverSidebar,
  toggleMobileSidebar,
  toggleLayout,
  setBorderRadius,
  toggleHorizontal,
  setLanguage,
  setCardShadow
} = CustomizerSlice.actions;

export default CustomizerSlice.reducer;
