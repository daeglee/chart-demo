import React, {useEffect, useState} from 'react'
import {
    LineChart,
    CartesianGrid,
    YAxis,
    Tooltip,
    XAxis,
    ResponsiveContainer, Legend, Line
} from "recharts";
import {toDate} from "date-fns";
import {useDataContext} from "../../context/ChartDataUpdateContextProvider";
import * as config from "../../config";
import {ChartType} from "../DataType";
import TimeFormatter from "../functions/TimeFormatter";
import ChartToolTip from "../functions/ChartToolTip";
import MockChartUpdate from "../functions/MockChartUpdate";


function LineChartComposite({rawDataType, dateType}) {
    const typeInfo = ChartType.LINE_CHART;
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
            <ResponsiveContainer width={config.GRAPH_WIDTH} height={config.GRAPH_HEIGHT}>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="logTime"
                           tickFormatter={(logTime) => {
                               const date = toDate(logTime * 1000);

                               return TimeFormatter(date, dateType);
                           }}/>
                    <YAxis dataKey={rawDataType.YAxisDataKey}/>
                    <Tooltip content={<ChartToolTip/>}/>
                    <Legend />
                    <Line type="monotone" dataKey={rawDataType.YAxisDataKey} stroke="#8884d8" activeDot={{ r: 8 }}
                          isAnimationActive={false}/>
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}

export default LineChartComposite;