import { useFormikContext } from "formik";
import { Calendar } from "primereact/calendar";

const CalendarInput = () => {

    const { values, setFieldValue } = useFormikContext();

    return (
        <Calendar
            value={values.dates}
            onChange={(e) => setFieldValue('dates', e.value)}
            dateFormat={'dd/mm/yy'}
            inline
            selectionMode="multiple"
        />
    )
}
export default CalendarInput