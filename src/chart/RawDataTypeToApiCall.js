import {getCpuUsages, getMemoryUsages} from "../repository/ChartDataRepository";
import {ChartType, ConstType} from "./ConstType";

function TypeToFunction(dataType, type, afterThen){
    let dataSize = 20;
    switch (type){
        case ChartType.AREA_CHART:
            dataSize = 20;
            break;
        case ChartType.PIE_CHART:
            dataSize = 1;
            break;
        case ChartType.LINE_CHART:
            dataSize = 20;
            break;
        case ChartType.BAR_CHART:
            dataSize = 10;
            break;
        default:
            break;
    }


    switch (dataType){
        case ConstType.CPU.type:
            getCpuUsages(dataSize).then(afterThen)
            break;
        case ConstType.MEMORY.type:
            getMemoryUsages(dataSize).then(afterThen)
            break;
        default:
    }
}

export default TypeToFunction;