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
        d="M270.91 99.5c-5.98-10.22-13.37-19.8-21.98-28.46l-28.38-21.93c-21.87-12.69-45.72-19.14-70.96-19.22-1.46-.06-2.95-.08-4.41-.08-17.62 0-34.36 4.1-49.77 12.2-17.28 5.61-32.51 15.4-45.19 29.05-9.02 8.37-16.41 17.95-21.96 28.45H.5V.5h299v99h-28.59Z"
        fill={newColors.fondo_secundario}
      />

  </Svg>
)
export default ArcoArribaCentro
