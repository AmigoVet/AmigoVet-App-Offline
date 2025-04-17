import * as React from "react"
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from "react-native-svg"
import { newColors } from "../../styles/colors"
const ArcoArribaDerecha = (props: SvgProps) => (
  <Svg
    data-name="Capa 2"
    viewBox="0 0 300 100"
    {...props}
  >
      <Path
        d="M.5 99.5V.5h299V40c0 22.53-13.04 43.45-33.24 53.41-4.86-7.09-10.46-13.84-16.65-20.07l-28.38-21.93c-21.87-12.69-45.72-19.14-70.96-19.22-1.46-.06-2.95-.08-4.41-.08-17.62 0-34.36 4.1-49.77 12.2-17.28 5.61-32.51 15.4-45.19 29.05-8.37 7.77-15.34 16.58-20.72 26.15H.5Z"
        fill={newColors.fondo_secundario}
      />

  </Svg>
)
export default ArcoArribaDerecha
