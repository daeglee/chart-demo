import React, {useEffect, useState} from 'react'
import {
    ScatterChart,
    CartesianGrid,
    YAxis,
    Tooltip,
    XAxis, Legend, Scatter, ResponsiveContainer, ZAxis
} from "recharts";
import TypeToFunction from "../functions/RawDataTypeToApiCall";
import {useDataContext} from "../../context/ChartDataUpdateContextProvider";
import * as config from "../../config";
import {ChartType} from "../RawDataType";
import {toDate} from "date-fns";
import TimeFormatter from "../functions/TimeFormatter";
import MockChartUpdate from "../functions/MockChartUpdate";


function AreaChartComposite({rawDataType, dateType}) {
    const typeInfo = ChartType.SCATTER_CHART;
    const [data, setData] = useState([]);

    const UpdateInfo = useDataContext();

    useEffect(() => {
        MockChartUpdate(typeInfo, rawDataType, dateType, data, setData);
    }, []);




    //TODO: 리소스가 여러개인 경우, 이렇게하면 되는 듯 하다.
    // const COLORS = ["#8884d8", "#82ca9d"];
    // const ScatterList = datas.map((data, index) => (<Scatter data={data} fill={COLORS[index % COLORS.length]}/>))

    return (
        <>
            <div>
                <h2>
                    {rawDataType.title}
                </h2>
            </div>

            <ResponsiveContainer width={config.GRAPH_WIDTH} height={config.GRAPH_HEIGHT}>
            <ScatterChart
                data={data}>
                <CartesianGrid/>
                <XAxis type="number" dataKey="logTime"

                       tickFormatter={(logTime) => {
                    const date = toDate(logTime * 1000);

                    return TimeFormatter(date, dateType);
                }}/>
                <YAxis type="number" dataKey={rawDataType.YAxisDataKey}/>
                <Legend/>

                <Scatter name="data 1" dataKey={rawDataType.YAxisDataKey} fill="#8884d8"/>
            </ScatterChart>
            </ResponsiveContainer>
        </>
    );
}

export default AreaChartComposite;