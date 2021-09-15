// dateType에 따라
// 임시적인 chartUpdate의 Parameter인
// startTime값과 endTime값을 채워줍니다.

import ChartUpdate from "./ChartUpdate";

function MockChartUpdate(chartType, rawDataType, dateType, state, setState){
    const endTime = Date.now() /1000;
    const startTime = endTime - dateType.second * chartType.dataSize + 1;

    ChartUpdate(chartType, rawDataType, dateType, state, setState, startTime, endTime);
}

export default MockChartUpdate;