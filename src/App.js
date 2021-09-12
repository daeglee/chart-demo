import './App.css';
import {useRef, useState} from "react";
import ChartList from "./chart/ChartList";
import {ChartDataUpdateContextProvider} from "./context/ChartDataUpdateContextProvider";
import {ChartType, DateType, ConstType} from "./chart/ConstType";

function App() {
  const [charts, setCharts] = useState([
    {
      id: 1,
      chartType: ChartType.LINE_CHART,
      rawDataType: ConstType.CPU,
      dateType: DateType.REAL_TIME
    },
    {
      id: 2,
      chartType: ChartType.AREA_CHART,
      rawDataType: ConstType.MEMORY,
      dateType: DateType.REAL_TIME
    },
    {
      id: 3,
      chartType: ChartType.PIE_CHART,
      rawDataType: ConstType.CPU,
      dateType: DateType.REAL_TIME // CPU Usage의 PIE CHART는 애초에 dateType이 REAL_TIME밖에 없음
      // 이러한 제약사항을 추가해야할듯
    },
    {
      id: 4,
      chartType: ChartType.BAR_CHART,
      rawDataType: ConstType.MEMORY,
      dateType: DateType.REAL_TIME
    },

    {
      id: 5,
      chartType: ChartType.SCATTER_CHART,
      rawDataType: ConstType.MEMORY,
      dateType: DateType.REAL_TIME
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
