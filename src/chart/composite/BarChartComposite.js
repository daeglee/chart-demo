import React, {useEffect, useState} from 'react'
import {
    CartesianGrid,
    YAxis,
    Tooltip,
    Area,
    XAxis,
    Bar, ResponsiveContainer,
    BarChart
} from "recharts";
import {format, toDate} from "date-fns";
import TypeToFunction from "../functions/RawDataTypeToApiCall";
import {useDataContext} from "../../context/ChartDataUpdateContextProvider";
import * as config from "../../config";
import {ChartType} from "../RawDataType";
import TimeFormatter from "../functions/TimeFormatter";
import ChartToolTip from "../functions/ChartToolTip";
import MockChartUpdate from "../functions/MockChartUpdate";


function BarChartComposite({rawDataType, dateType}) {
    const typeInfo = ChartType.BAR_CHART;
    const [data, setData] = useState([]);

    const UpdateInfo = useDataContext();

    useEffect(() => {
        MockChartUpdate(typeInfo, rawDataType, dateType, data, setData);
    }, []);



    // 어떻게 해야할지 고민중
    // updateInfo 내부의 함수가 업데이트됐다는 것은
    // -> 새로 값을 받아왔다.
    // 1.그 값중에 해당 타입이 있는가?
    // 2. 그 타입중에 현재 logTime보다 최신의 값이 있는가
    // 그렇다면 추가한다..
    useEffect(() => {

        console.log('use Effect called');
        console.log('logTime is changed');
        console.log(UpdateInfo)
        if (UpdateInfo.logTime !== 0) {
            console.log('is not 0')
        }
    }, [UpdateInfo.logTime]);

    // Check update

    return (
        <>
            <div>
                <h2>
                    {rawDataType.title}
                </h2>
            </div>
            <BarChart
                width={config.GRAPH_WIDTH}
                height={config.GRAPH_HEIGHT}
                data={data}>

                <CartesianGrid strokeDasharray="3 3"/>
                <YAxis dataKey={rawDataType.YAxisDataKey}/>

                <XAxis
                    dataKey="logTime"
                    tickFormatter={(logTime) => {
                        const date = toDate(logTime * 1000);

                        return TimeFormatter(date, dateType);
                    }}
                />

                <Bar stackId="a" fill="#8884d8" dataKey={rawDataType.YAxisDataKey}/>
                <Tooltip content={<ChartToolTip/>}/>
                <CartesianGrid opacity={0.1} vertical={false}/>
            </BarChart>
        </>
    );
}

export default BarChartComposite;