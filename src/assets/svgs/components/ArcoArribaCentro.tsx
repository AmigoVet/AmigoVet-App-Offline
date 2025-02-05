import * as React from "react"
import Svg, {
  SvgProps,
  Defs,
  LinearGradient,
  Stop,
  Path,
} from "react-native-svg"
import { newColors } from "../../styles/colors"
const ArcoArribaCentro = (props: SvgProps) => (
    <Svg
    data-name="Capa 2"
    viewBox="0 0 300 100"
    {...props}
  >
      <Path
        d="M281.28 99.5c-7.03-18.08-17.66-34.35-31.59-48.38l-28.38-21.93c-21.87-12.69-45.72-19.14-70.96-19.22-1.46-.06-2.95-.08-4.41-.08-17.62 0-34.36 4.1-49.77 12.2-17.28 5.61-32.51 15.4-45.19 29.05C37.35 63.8 27.57 79.03 21.92 96.38c-.5.93-1.03 1.98-1.58 3.12H.5V.5h299v99h-18.22Z"
        fill={newColors.fondo_secundario}
      />

  </Svg>
)
export default ArcoArribaCentro
