import React from 'react';

interface ProgressBarProps {
  value: number;
  label?: string;
  height:number;
  width?:number;
  background?:string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, label,height,width ,background}) => {
  return (
    <div className="relative w-full bg-gray-300 rounded  top-3 " style={{ height: `${height}px`, marginTop: '12px' ,width:`${width}px` }}>
      {label && (
        <div className="mb-2 text-gray-700">{label}</div>
      )}
      <div className="absolute inset-y-0 left-0  bg-purple rounded bg-blue-700" style={{ width: `${value}%` ,background:`${background}` }}>
        <div className="flex justify-center items-center h-full text-white font-semibold text-xs">
          {`${value}%`}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

