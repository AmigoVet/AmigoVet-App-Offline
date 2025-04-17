import * as React from "react"
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from "react-native-svg"
import { newColors } from "../../styles/colors"
const ArcoArribaIzquierda = (props: SvgProps) => (
  <Svg
    data-name="Capa 2"
    viewBox="0 0 300 100"
    {...props}
  >

      <Path
        d="M271.7 99.5c-5.64-9.11-12.42-17.67-20.16-25.46l-28.38-21.93c-21.87-12.69-45.72-19.14-70.96-19.22-1.46-.06-2.95-.08-4.41-.08-17.62 0-34.36 4.1-49.77 12.2-17.28 5.61-32.51 15.4-45.19 29.05-6.79 6.3-12.69 13.32-17.52 20.84C13.83 87.88.5 74.22.5 59.18V.5h299v99h-27.8Z"
        fill={newColors.fondo_secundario}
      />

  </Svg>
)
export default ArcoArribaIzquierda
