import React from 'react';
import { useScreenshots } from '../../hooks/UseActivity';
import TimeContainer from './TimeContainer';
import { Screenshot } from '../../types/Activitytypes';
import moment from 'moment';


const TimeScreenshot= ({
  screenshotTime ,
   refetch ,
   error 
}:{
  screenshotTime:any , refetch:any ,error:any 
}) => {


  const groupedData:any = screenshotTime?.data?.groupedData;
  const calculateTotalTime = (screenshots: Screenshot[]): string => {
    const totalMinutes = screenshots.length * 10; // Assuming each screenshot represents 10 minutes of work
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:00`;
  };
  return ( 
    <>
    {groupedData===undefined && <div className='text-xl font-bold text-center mt-28 '>No Records...</div>}
    
      {groupedData && Object.keys(groupedData).map((timestamp) => {
        const screenshots: Screenshot[] = groupedData[timestamp].screenshots;
        const parsedTimestamp = moment(timestamp, 'DD/MM/YYYY HH:mm');
        const timeRange = parsedTimestamp.format('HH:mm') + ' - ' + parsedTimestamp.add(1, 'hour').format('HH:mm');
        const date = parsedTimestamp.format('DD/MM/YYYY');

        return (
          <div className="flex w-full  border border-gray-300" key={timestamp}>
            {/* {time.map((cv, index) => ( */}
              <div className="w-52 p-4" >
                <h1 className="text-lg font-bold">{timeRange}</h1>
                <p className="mt-6 -ml-32">{date }</p>
                <p className='-mt-12'>Total Time Worked: {calculateTotalTime(screenshots)}</p>
                <p className="text-gray-400">{parsedTimestamp.format('MMM ,DD, YYYY')}</p>
              </div>
            {/* ))} */}
            <div className="flex bg-transparent w-5/6 overflow-x-auto"> 
              <div className="relative">
                <TimeContainer screenshots={screenshots} timeRange={timeRange} refetch={refetch}  />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TimeScreenshot;
