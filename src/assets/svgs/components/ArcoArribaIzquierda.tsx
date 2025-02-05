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
        d="M282.68 99.5c-7.01-16.88-17.22-32.14-30.37-45.38l-28.38-21.93c-21.87-12.69-45.72-19.14-70.96-19.22-1.46-.06-2.95-.08-4.41-.08-17.62 0-34.36 4.1-49.77 12.2-17.28 5.61-32.51 15.4-45.19 29.05C42 64.91 33.16 77.59 27.33 91.81 10.52 84.21.5 72.05.5 59.18V.5h299v99h-16.82Z"
        fill={newColors.fondo_secundario}
      />
  </Svg>
)
export default ArcoArribaIzquierda
