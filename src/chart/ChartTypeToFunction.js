import {getCpuUsages, getMemoryUsages} from "../repository/ChartDataRepository";
import {ChartType, RawDataType} from "./rawDataType";

function TypeToFunction(dataType, type, afterThen){
    let dataSize = 20;
    switch (type){
        case ChartType.AREA_CHART:
            dataSize = 20;
            break;
        case ChartType.PIE_CHART:
            dataSize = 1;
            break;
        default:
            break;
    }


    switch (dataType){
        case RawDataType.CPU.type:
            getCpuUsages(dataSize).then(afterThen)
            break;
        case RawDataType.MEMORY.type:
            getMemoryUsages(dataSize).then(afterThen)
            break;
        default:
    }
}

export default TypeToFunction;