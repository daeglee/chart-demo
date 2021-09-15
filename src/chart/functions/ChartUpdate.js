import axios from "axios";

async function setStateApi(rawDataType, dateType, startTime, endTime) {
    const response = await axios.get(
        `/api/${rawDataType.controllerAddress}/${startTime}/${endTime}/?type=${dateType}`
    );
    return response.data;
}
// 함수의 매개변수가 너무 많아서 리팩토링이 필요할 수도 있습니다.
// setState
function ChartUpdate(chartType, rawDataType, dateType, state, setState, startTime, endTime) {
    // startTime
    // endTime
    let dataSize = chartType.dataSize;
    const currentDataSize = state.length;

    setStateApi(rawDataType, dateType, startTime, endTime).then( (data, length) =>{
        let sliceSize= 0;
        if(dataSize < length + currentDataSize){
            sliceSize = length + currentDataSize - dataSize;
        }

        setState( (prevState) => [...prevState, data].slice(sliceSize));
    })
}
export default ChartUpdate;