// OS Resource
// CPU와 Memory가 표시됨
// 5초마다 값을 가져와서
// 해당값으로 업데이트

// PieChart는 Real Time만 지원?
// 가장 최신값만 표시

import React, {useEffect, useState} from 'react';
import { PieChart, Pie, Cell} from 'recharts';
import TypeToFunction from "../ChartTypeToFunction";
import {ChartType, RawDataType} from "../rawDataType";
import * as config from "../../config";

const DEFAULT_COLOR = '#DDDDDD'; // for background color
const COLORS = ['#0088FE', "#FF8042", "#FF2323"]; // normal, yellow, red
const typeInfo = ChartType.PIE_CHART;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {

    const fontSize = 24;
    if(index === 0)
        return (
            <text x={cx - fontSize + fontSize/4} y={cy} fill="black" fontSize={fontSize} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    else
        return "";
};


function PieChartComposite({rawDataType}){
    const [data, setData] = useState([
        { id: 0, value: 33 },
        { id: 1, value: 67 },
    ]);

    useEffect(() => {
        const afterThen = (x) => {
            const lastestValue = x[0][Object.getOwnPropertyNames(x[0])[1]];
            // {"logTime": 1234, "cpuusage": 67 }
            // 과 같은 구조에서 67값을 가져오기 위한 방법
            // 모든 데이터에 logTime이 있으므로 일단 이렇게 사용해도 괜찮을 것 같다.
            // 더 좋은 방법이 있으면 업데이트

            setData([
                {id: 0, value: 100 -lastestValue},
                {id: 1, value: lastestValue}
            ]);
        }
        TypeToFunction(rawDataType.type, typeInfo,
            afterThen
        );
    }, []);

        return (
            <>
                <div>
                    <h2>
                        {rawDataType.title}
                    </h2>
                </div>
            <PieChart width={400} height={400}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    isAnimationActive={false}
                >
                    <Cell key={`cell-0`} fill={data[1].value > config.PIE_RED ? COLORS[2] : data[1].value > config.PIE_YELLOW ? COLORS[1] : COLORS[0]} />

                    <Cell key={`cell-1`} fill={DEFAULT_COLOR} />


                </Pie>
            </PieChart>
            </>
        );

}

export default PieChartComposite;