export const newColors = {

  principal : '#e9e3dc',
  principalLight : '#e3e6e1',
  
  secundario : '#232322',
  
  fondo_principal : '#e9e3dc',
  fondo_secundario : '#232322',

  rojo: '#a80c23',
  verde: '#495445',
  verde_light: '#7da96c',

  gris: '#888b8d',
  gris_light: '#c0c0c0',
}

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

    verde: isDarkTheme ? staticColors.verdeLight : staticColors.verde,
    verdeDark: isDarkTheme ? staticColors.verdeDark : staticColors.verde,
    verdeLight: staticColors.verdeLight,

    rowBgLight: isDarkTheme ? staticColors.rowBgDark : lightColors.rowBgLight,
    rowBgDark: isDarkTheme ? staticColors.rowBgLight : lightColors.rowBgDark,

    bgLight: '#b0b0b0',
    bgGlassBlock: isDarkTheme ? staticColors.bgGlassBlock : lightColors.bgGlassBlock,
  }
}

export const staticColors = {

  negro: '#3d3d3c',
  negroDark: '#232322',
  
  blanco: '#e9e3dc',
  blancoLight: '#e3e6e1',
  blancoMediumLight: '#e6e7e8',

  naranja: '#ee7f27',
  naranjaDark: '#c35a00',

  rojo: '#a80c23',
  rojoLight: '#a1ac9c', 

  verde: '#495445',
  verdeLight: '#a1ac9c',
  verdeDark: '#2f342d',

  rowBgLight: '#888b8d',
  rowBgDark: '#625b5b',
  bgGlassBlock: '#464644',
}
const lightColors = {
  negro: '#3d3d3d',
  negroDark: '#3d3d3d',
  blanco: '#495445',
  blancoLight: '#e9e3dc',
  blancoMediumLight: '#e6e7e8',
  naranja: '#c35a00',
  naranjaDark: '#994207',
  rojo: '#7a0f1f',
  rojoLight: '#C94F57', 
  rowBgLight: '#aeb0b2',
  rowBgDark: '#888b8d',
  bgGlassBlock: '#f8f6f4',
}