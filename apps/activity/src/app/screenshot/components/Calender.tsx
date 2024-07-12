
import React from "react";
import { Calendar } from "react-multi-date-picker";
import { DateObject } from "react-multi-date-picker";

interface CustomCalendarProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ startDate, endDate, onDateChange }) => {
  const handleSelect = (dateObjects: DateObject[]) => {
    if (dateObjects.length === 2) {
      const start = dateObjects[0].toDate();
      const end = dateObjects[1].toDate();
      onDateChange(start, end);
    }
  };

  return (
    <Calendar
      className="h-72 mt-12 ml-4 w-96 text-sx"
      numberOfMonths={2}
      disableMonthPicker
      disableYearPicker
      range
      value={[startDate, endDate]}
      onChange={handleSelect}
    />
  );
};

export default CustomCalendar;



