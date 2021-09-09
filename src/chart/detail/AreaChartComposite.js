import React, {useEffect, useState} from 'react'
import {
    AreaChart,
    CartesianGrid,
    YAxis,
    Tooltip,
    Area,
    XAxis,
    ResponsiveContainer
} from "recharts";
import {format, toDate} from "date-fns";
import TypeToFunction from "../ChartTypeToFunction";
import {useDataContext} from "../../context/ChartDataUpdateContextProvider";
import * as config from "../../config";
import {ChartType} from "../rawDataType";
import TimeFormatter from "../TimeFormatter";


function AreaChartComposite({rawDataType, dateType}) {
    /**TODO: props로 넘겨줘야할 것
     1. RawDataType( type, title 등등)
     2. initiate API ( 여기서는 getCPUUsage)
     3. update함수
     4. X축, y축 정보
     */
    const typeInfo = ChartType.AREA_CHART;
    const [data, setData] = useState([]);

    const UpdateInfo = useDataContext();

    useEffect(() => {
        const afterThen = (x) => {
            setData(x);
        }
        TypeToFunction(rawDataType.type, typeInfo,
            afterThen
        );
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
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4}/>
                            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05}/>
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3"/>
                    <YAxis dataKey={rawDataType.YAxisDataKey}/>
                    <Area dataKey={rawDataType.YAxisDataKey} stroke="#2451B7" fill="url(#color)"
                          isAnimationActive={false}/>

                    <XAxis
                        dataKey="logTime"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(logTime) => {
                            const date = toDate(logTime * 1000);

                            return TimeFormatter(date, dateType);
                        }}
                    />

                    <YAxis
                        datakey={rawDataType.YAxisDataKey}
                        axisLine={false}
                        tickLine={false}
                        tickCount={8}
                        domain={[0, 100]}
                        tickFormatter={(number) => number}
                    />

                    <Tooltip content={<CustomTooltip/>}/>
                    <CartesianGrid opacity={0.1} vertical={false}/>
                </AreaChart>
            </ResponsiveContainer>
        </>
    );
}

const CustomTooltip = ({active, payload, label}) => {
    if (active) {
        return (
            //TODO: tooltip style
            <div className="tooltip">
                <p>{format(toDate(label * 1000), config.BASIC_TOOLTIP, config.CURRENT_LOCALE)}</p>
                <p>{payload[0].value.toFixed(0)}%</p>
            </div>
        );
    }

    return null;
};

export default AreaChartComposite;