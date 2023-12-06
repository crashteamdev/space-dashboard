/**
 * @typedef {Object} BackgroundConfig
 * @property {string} default - Цвет фона по умолчанию, соответствующий цвету body.
 * @property {string} paper - Цвет дополнительных блоков
 */
const LightThemeColors = [
  {
    name: "BLUE_THEME",
    palette: {
      primary: {
        main: "#5D87FF",
        light: "#ECF2FF",
        dark: "#4570EA",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#49BEFF",
        light: "#E8F7FF",
        dark: "#23afdb",
        contrastText: "#ffffff",
      },
    },
  },
  {
    name: "CUSTOM_THEME",
    palette: {
      primary: {
        main: "#5D87FF",
        light: "#ECF2FF",
        dark: "#4570EA",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#49BEFF",
        light: "#E8F7FF",
        dark: "#23afdb",
        contrastText: "#ffffff",
      },
      background: {
        default: "#f5f3f4",
        dark: "#2A3547",
        paper: "#f5f3f4",
      },
    },
  },
];

export { LightThemeColors };
