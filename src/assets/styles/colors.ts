import { stat } from "react-native-fs"

export const getDynamicColors  = (isDarkTheme: boolean) =>  {
  return {
    fondo: isDarkTheme ? staticColors.negro : lightColors.blancoLight,
    fondoDark: isDarkTheme ? staticColors.negroDark : lightColors.blanco,
    blanco: isDarkTheme ? staticColors.blanco : lightColors.negro,
    blancoLight: isDarkTheme ? staticColors.blancoLight : lightColors.negro,
    naranja:staticColors.naranja,
    naranjaDark: staticColors.naranjaDark,
    rojo: staticColors.rojo,
    rojoLight: staticColors.rojoLight,
    verde: isDarkTheme ? staticColors.verde : staticColors.verdeDark,
    verdeDark: isDarkTheme ? staticColors.verdeDark : staticColors.verde,
    rowBgLight: isDarkTheme ? staticColors.rowBgDark : lightColors.rowBgLight,
    rowBgDark: isDarkTheme ? staticColors.rowBgLight : lightColors.rowBgDark,
  }
}

export const staticColors = {

  negro: '#33322e',
  negroDark: '#262626',
  blanco: '#a9a79f',
  blancoLight: '#f8f9fa',
  blancoMediumLight: '#e6e7e8',
  naranja: '#ee7f27',
  naranjaDark: '#c35a00',
  rojo: '#a80c23',
  rojoLight: '#C94F57', 
  verde: '#04503b',
  verdeDark: '#012d22',
  rowBgLight: '#888b8d',
  rowBgDark: '#625b5b',
}
const lightColors = {
  negro: '#3d3d3d',
  negroDark: '#3d3d3d',
  blanco: '#6d6d6d',
  blancoLight: '#d1d1d1',
  blancoMediumLight: '#e6e7e8',
  naranja: '#c35a00',
  naranjaDark: '#994207',
  rojo: '#7a0f1f',
  rojoLight: '#C94F57', 
  rowBgLight: '#aeb0b2',
  rowBgDark: '#888b8d',
}