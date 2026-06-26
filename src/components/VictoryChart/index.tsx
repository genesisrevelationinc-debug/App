import React from 'react';
import {View, StyleSheet} from 'react-native';
import {VictoryAxis, VictoryBar, VictoryChart as VictoryChartBase, VictoryGroup, VictoryLegend, VictoryStack, VictoryTooltip} from 'victory-native';
import type {VictoryChartProps} from './types';

    legendData,
    height = 250,
    width,
    padding = {top: 20, bottom: 60, left: 40, right: 20},
    domainPadding = {x: 20, y: 20},
    horizontal = false,
    showLegend = true,
                {showLegend && legendData.length > 0 && (
                    <VictoryLegend
                        x={padding.left ?? 40}
                        y={height - (padding.bottom ?? 60) + 10}
                        data={legendData}
                        orientation="horizontal"
                        gutter={20}