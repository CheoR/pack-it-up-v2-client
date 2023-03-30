// TODO: move to custom colors tailwind.config
// TODO: find equivalent/approximates tw colors
// tintColorLight : "#00171F" : slate-800
// tintColorDark : "#FFE8E0" : rose-100
// light
// text: "#00171F" : slate-800
// background: "#F2F3EF" : slate-300
// tint: tintColorLight : slate-800
// tabIconDefault: "#797B84" : neutral-500
// tabIconSelected: tintColorLight : slate-800
// warning: "#F40000" : red-500
// action: "#FF6700" : orange-600
// dark
// text: "#FFE8E0" : rose-100
// background: "#0D0C10" : slate-300
// tint: tintColorDark : rose-100
// tabIconDefault: "#0D0C10" : slate-300
// tabIconSelected: tintColorDark : rose-100
// warning: "#FF6700" : orange-600
// action: "#0098FF" : sky-500

const tintColorLight = "#00171F";
const tintColorDark = "#FFE8E0";

const COLORS = {
  light: {
    text: "#00171F",
    background: "#F2F3EF",
    tint: tintColorLight,
    tabIconDefault: "#797B84",
    tabIconSelected: tintColorLight,
    warning: "#F40000",
    action: "#FF6700",
  },
  dark: {
    text: "#FFE8E0",
    background: "#0D0C10",
    tint: tintColorDark,
    tabIconDefault: "#0D0C10",
    tabIconSelected: tintColorDark,
    warning: "#FF6700",
    action: "#0098FF",
  },
};

export default COLORS;
