import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Defs, G, Path, Ellipse, SvgProps } from 'react-native-svg'
import { newColors } from '../../../styles/colors'

const CatSvg = (props: SvgProps) => {
  return (
    <Svg
    id="Capa_2"
    data-name="Capa 2"
    viewBox="0 0 187.7 196.26"
    {...props}
  >
    <Defs></Defs>
    <G id="Capa_5" data-name="Capa 5">
      <Path
        d="M187.7 0v138.7c-6.46 14.46-12.92 28.91-19.38 43.37-3.14 4.2-6.91 7.92-12.43 14.2-6.39-13.37-12.17-24.3-16.88-35.68-3.57-8.62-8.67-10.43-16.88-6.98-22.42 9.41-41.43 5.83-58.6-12.66-10.3-11.08-24.52-15.74-40.59-15.03-5.11.23-12.75-4.33-15.38-8.91C1.73 106.8-.7 96.89.17 87.32 2.64 60.4 28.49 44.57 31.98 42.45c4.87-2.96 9.39-5.17 13.52-6.89 11.96-4.97 22.38-3.23 25.05-7.91 1.95-3.42 0-10.72-16.65-27.65h133.81Z"
      />
      <Ellipse
        cx={102.82}
        cy={102.87}
        rx={26.72}
        ry={21.47}
        fill={newColors.fondo_principal}
      />
      <Ellipse cx={111.79} cy={102.87}  rx={8.97} ry={19.05} />
    </G>
  </Svg>
  )
}

export default CatSvg