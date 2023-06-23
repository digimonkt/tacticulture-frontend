import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DatePickerProps {
  onDayClick: (dates: Date[]) => void;
  defaultDate: string[];
}

const DatePicker: React.FC<DatePickerProps> = ({ onDayClick, defaultDate }) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const handleDateClick = (date: Date) => {
    const selectedIndex = selectedDates.findIndex(
      (selectedDate) => selectedDate.getTime() === date.getTime()
    );

    if (selectedIndex > -1) {
      // Date already selected, remove it
      const updatedDates = selectedDates.filter(
        (_, index) => index !== selectedIndex
      );
      setSelectedDates(updatedDates);
    } else {
      // Date not selected, add it to the array
      const updatedDates = [...selectedDates, date];
      setSelectedDates(updatedDates);
    }

    onDayClick(selectedDates);
  };

  return (
    <div>
      <DayPicker
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        selected={defaultDate}
        onDayClick={handleDateClick}
        mode="multiple"
      />
    </div>
  );
};

export default DatePicker;
