import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import * as d3 from 'd3';
import Svg, { Path, Circle, Line, Text as SvgText, G } from 'react-native-svg';
import { WeightsTable } from '../../../../../lib/interfaces/Animal';
import { newColors } from '../../../../styles/colors';

interface GraficWeightsProps {
  weights: WeightsTable[];
}

const GraficWeights: React.FC<GraficWeightsProps> = ({ weights }) => {
  // Si no hay datos, no renderizar nada
  if (!weights || weights.length === 0) {
    return null;
  }

  // Configuración del gráfico
  const screenWidth = Dimensions.get('window').width;
  const width = screenWidth - 20; // Padding lateral mínimo
  const height = 320; // Altura fija para el gráfico
  const margin = {
    top: 30,
    right: 30,
    bottom: 80, // Espacio para fechas
    left: 70, // Espacio para etiquetas de peso
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Procesar y ordenar datos
  const sortedWeights = [...weights].sort((a, b) =>
    new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  );

  // Configurar escalas
  const xExtent = d3.extent(sortedWeights, (d: WeightsTable) => new Date(d.fecha)) as [Date, Date];
  const xScale = d3.scaleTime()
    .domain(xExtent)
    .range([0, innerWidth]);

  const yExtent = d3.extent(sortedWeights, (d: WeightsTable) => parseFloat(d.peso)) as [number, number];
  const yPadding = (yExtent[1] - yExtent[0]) * 0.1; // 10% de padding
  const yScale = d3.scaleLinear()
    .domain([
      Math.max(0, yExtent[0] - yPadding), // No valores negativos
      yExtent[1] + yPadding,
    ])
    .range([innerHeight, 0]);

  // Generar línea del gráfico
  const line = d3.line<WeightsTable>()
    .x((d: WeightsTable) => xScale(new Date(d.fecha)))
    .y((d: WeightsTable) => yScale(parseFloat(d.peso)))
    .curve(d3.curveMonotoneX); // Línea suavizada

  // Generar ticks para los ejes
  const yTicks = yScale.ticks(6).map((tick: number) => ({
    value: tick,
    y: yScale(tick),
  }));

  // Seleccionar fechas para mostrar (máximo 5 para evitar superposición)
  const maxXTicks = Math.min(5, sortedWeights.length);
  const xTickIndices = sortedWeights.length <= maxXTicks
    ? sortedWeights.map((_, i) => i)
    : Array.from({length: maxXTicks}, (_, i) =>
        Math.floor(i * (sortedWeights.length - 1) / (maxXTicks - 1))
      );

  return (
    <View style={styles.chartContainer}>
      <Svg width={width} height={height}>
        <G transform={`translate(${margin.left},${margin.top})`}>
          {/* Líneas de cuadrícula horizontales */}
          {yTicks.map((tick) => (
            <Line
              key={`grid-y-${tick.value}`}
              x1={0}
              y1={tick.y}
              x2={innerWidth}
              y2={tick.y}
              stroke={newColors.fondo_secundario}
              strokeWidth={0.5}
              opacity={0.3}
            />
          ))}

          {/* Líneas de cuadrícula verticales */}
          {xTickIndices.map((index) => {
            const d = sortedWeights[index];
            const x = xScale(new Date(d.fecha));
            return (
              <Line
                key={`grid-x-${d.id}`}
                x1={x}
                y1={0}
                x2={x}
                y2={innerHeight}
                stroke={newColors.fondo_secundario}
                strokeWidth={0.5}
                opacity={0.3}
              />
            );
          })}

          {/* Línea principal del gráfico */}
          <Path
            d={line(sortedWeights) || ''}
            fill="none"
            stroke={newColors.verde_light}
            strokeWidth={3}
          />

          {/* Puntos de datos */}
          {sortedWeights.map((d: WeightsTable) => (
            <Circle
              key={d.id}
              cx={xScale(new Date(d.fecha))}
              cy={yScale(parseFloat(d.peso))}
              r={5}
              fill={newColors.rojo}
              stroke={newColors.fondo_principal}
              strokeWidth={2}
            />
          ))}

          {/* Ejes principales */}
          <Line
            x1={0}
            y1={innerHeight}
            x2={innerWidth}
            y2={innerHeight}
            stroke={newColors.fondo_secundario}
            strokeWidth={2}
          />
          <Line
            x1={0}
            y1={0}
            x2={0}
            y2={innerHeight}
            stroke={newColors.fondo_secundario}
            strokeWidth={2}
          />

          {/* Etiquetas del eje Y (pesos) */}
          {yTicks.map((tick) => (
            <SvgText
              key={tick.value}
              x={-15}
              y={tick.y + 4}
              fontSize={12}
              fill={newColors.fondo_secundario}
              textAnchor="end"
              fontWeight="500"
            >
              {`${tick.value.toFixed(1)} kg`}
            </SvgText>
          ))}

          {/* Etiquetas del eje X (fechas) */}
          {xTickIndices.map((index) => {
            const d = sortedWeights[index];
            const x = xScale(new Date(d.fecha));
            const dateStr = new Date(d.fecha).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
            });

            return (
              <G key={d.id}>
                <SvgText
                  x={x}
                  y={innerHeight + 20}
                  fontSize={11}
                  fill={newColors.fondo_secundario}
                  textAnchor="middle"
                  fontWeight="500"
                >
                  {dateStr}
                </SvgText>
                {/* Año en línea separada */}
                <SvgText
                  x={x}
                  y={innerHeight + 35}
                  fontSize={10}
                  fill={newColors.fondo_secundario}
                  textAnchor="middle"
                  opacity={0.7}
                >
                  {new Date(d.fecha).getFullYear()}
                </SvgText>
              </G>
            );
          })}
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    backgroundColor: newColors.fondo_principal,
  },
});

export default GraficWeights;
