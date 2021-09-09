import AreaChartComposite from "./detail/AreaChartComposite";
import {ChartType, RawDataType} from "./rawDataType";
import PieChartComposite from "./detail/PieChartComposite";

function SingleChart({chartType, rawDataType, dateType}){

    switch (chartType){
        case ChartType.AREA_CHART:
            return (
                <AreaChartComposite rawDataType={rawDataType} dateType={dateType}/>
            );
        case ChartType.PIE_CHART:
            return (
                <PieChartComposite rawDataType={rawDataType}/>
            );
        default:
            return (
                <div/>
            )
    }

}



function ChartComposite({ chart }){
    return (
        <SingleChart
            chartType={chart.chartType}
            rawDataType={chart.rawDataType}
            dateType={chart.dateType}
        />
    );
}

export default ChartComposite;