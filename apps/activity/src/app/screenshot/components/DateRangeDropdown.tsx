import React, { useEffect, useState } from 'react';
import { MenuItem, Menu, Button, Popper } from '@mui/material';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import CustomCalendar from './Calender'; 
import { AddRangeDropdown } from './ScreenshotEnums';


interface DateRangeDropdownProps {
  onDateChange: (startDate: number, endDate: number) => void;
  selected: {
    startDate: number,
    endDate: number
  }
}

const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return moment(date).format('DD/MM/YYYY');
};

const DateRangeDropdown: React.FC<DateRangeDropdownProps> = ({ onDateChange, selected }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [startDate, setStartDate] = useState<Date | null>(moment().utc().subtract(30, 'days').startOf('day').toDate());
  const [endDate, setEndDate] = useState<Date | null>(moment.utc().endOf('day').toDate());
  const [selectedRange, setSelectedRange] = useState<string>('This Month');
  const [showCustomRange, setShowCustomRange] = useState<boolean>(false);


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    if (!showCustomRange) {
      setAnchorEl(null);
    }
  };
  const handleRangeSelect = (range: string) => {
    setSelectedRange(range);
    setShowCustomRange(false);

    let start = moment();
    let end = moment();

    switch (range) {
      case 'Today':
        start = moment().utc().startOf('day');
        end = moment().utc().endOf('day');
        break;
      case 'Yesterday':
        start = moment().utc().subtract(1, 'days').startOf('day');
        end = moment().utc().subtract(1, 'days').endOf('day');
        break;
      case 'Last 7 Days':
        start = moment().utc().subtract(7, 'days').startOf('day');
        end = moment().utc().endOf('day');
        break;
      case 'Last 30 Days':
        start = moment().utc().subtract(30, 'days').startOf('day');
        end = moment().utc().endOf('day');
        break;
      case 'This Month':
        start = moment().utc().startOf('month');
        end = moment().utc().endOf('month');
        break;
      case 'Last Month':
        start = moment().utc().subtract(1, 'month').startOf('month');
        end = moment().utc().subtract(1, 'month').endOf('month');
        break;
      case 'Custom Range':
        setShowCustomRange(true);
        return;
      default:
        break;
    }

    setStartDate(start.toDate());
    setEndDate(end.toDate());
   
    onDateChange(start.valueOf(), end.valueOf());
    setAnchorEl(null);
  };

  const handleApply = () => {
    if (startDate && endDate) {
      const adjustedEndDate = moment(endDate).endOf('day').toDate();
      setShowCustomRange(false);
      onDateChange(moment(startDate).valueOf(), moment(adjustedEndDate).valueOf());
      setEndDate(adjustedEndDate);
      setAnchorEl(null);
    }
  };

  const handleCancel = () => {
    setShowCustomRange(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClick}
        className="h-14 w-56 text-nowrap overflow-hidden"
      >
        <span
          className="text-neutral-900 text-base"
          style={{ overflow: 'auto', scrollbarWidth: 'none' }}
        >
          {selectedRange ? ` ${formatDate(startDate)} - ${formatDate(endDate)}` : 'Select Date Range'}
        </span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        {[
          AddRangeDropdown.Today,
          AddRangeDropdown.Yesterday,
          AddRangeDropdown.Last_7_Days,
          AddRangeDropdown.Last_30_Days,
          AddRangeDropdown.This_Month,
          AddRangeDropdown.Last_Month,
          AddRangeDropdown.Custom_Range
        ].map((range) => (
          <MenuItem
            key={range}
            onClick={() => handleRangeSelect(range)}
            className="h-10 w-36"
          >
            {range}
          </MenuItem>
        ))}
      </Menu>
      {showCustomRange && (
        <Popper
          open={showCustomRange}
          anchorEl={anchorEl}
          placement="right-start"
          sx={{ zIndex: 1300, width: '300%', height: '300px' }}
        >
          <div
            className="flex justify-between mb-2"
            style={{
              width: '100%',
              height: 'auto',
              marginLeft: '-95px',
              marginTop: '6px',
            }}
          >
            <CustomCalendar
              startDate={startDate}
              endDate={endDate}
              onDateChange={(start, end) => {
                if (!start || !end) {
                  return;
                }
                setStartDate(start);
                setEndDate(end);
              }}
            />
          </div>
          <div
            className="flex flex-col bg-white p-4 rounded shadow-lg border-t-2 border-gray-300 absolute"
            style={{
              width: '653px',
              height: 'fit-content',
              marginTop: '-8px',
              marginLeft: '-225px',
            }}
          >
            <div className="absolute flex mt-2">
              <p className="ml-64 text-sm">
                {startDate ? formatDate(startDate) : 'N/A'}
              </p>
              <p className="text-sm">
                {' '}
                - {endDate ? formatDate(endDate) : 'N/A'}
              </p>
            </div>
            <div className="text-end">
              <Button
                variant="outlined"
                onClick={handleCancel}
                style={{ marginRight: '8px' }}
              >
                Cancel
              </Button>
              <Button variant="contained" onClick={handleApply}>
                Apply
              </Button>
            </div>
          </div>
        </Popper>
      )}
    </div>
  );
};

export default DateRangeDropdown;
