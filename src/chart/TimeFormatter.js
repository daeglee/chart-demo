import {format} from "date-fns";
import {DateType} from "./rawDataType";
import * as config from "../config";

function TimeFormatter(date, dateTypeParam) {

    if(dateTypeParam === DateType.REAL_TIME){
        if (date.getMinutes() === 0 && date.getSeconds() % 5 === 0) {
            return format(date, config.HOUR_MINUTE_SECOND, config.CURRENT_LOCALE);
        } else if (date.getSeconds() % 5 === 0) {
            return format(date, config.MINUTE_SECOND, config.CURRENT_LOCALE);
        }
    }

    return "";
}

export default TimeFormatter;