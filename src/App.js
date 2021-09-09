import './App.css';
import {useRef, useState} from "react";
import ChartList from "./chart/ChartList";
import {ChartDataUpdateContextProvider} from "./context/ChartDataUpdateContextProvider";
import {ChartType, DateType, RawDataType} from "./chart/rawDataType";

function App() {
  const [charts, setCharts] = useState([
    {
      id: 1,
      chartType: ChartType.AREA_CHART,
      rawDataType: RawDataType.CPU,
      dateType: DateType.REAL_TIME
    },
    {
      id: 2,
      chartType: ChartType.AREA_CHART,
      rawDataType: RawDataType.MEMORY,
      dateType: DateType.REAL_TIME
    },
    {
      id: 1,
      chartType: ChartType.PIE_CHART,
      rawDataType: RawDataType.CPU,
      dateType: DateType.REAL_TIME // CPU Usage의 PIE CHART는 애초에 dateType이 REAL_TIME밖에 없음
      // 이러한 제약사항을 추가해야할듯
    },

  ]);

  return (
      <>
        <ChartDataUpdateContextProvider>
          <ChartList charts={charts} />
        </ChartDataUpdateContextProvider>
      </>
  );
}

export default App;
