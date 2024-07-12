import { ReactNode } from 'react';

// Interface for props of ScreenWrapper component
interface Props {
  children?: ReactNode;
  title?: string;
  className?: string;
}

// Functional component definition for ScreenWrapper
const ScreenWrapper: React.FC<Props> = ({ children, title, className }) => {
  return (
    <div
      className={`flex rounded-md relative shadow-md border border-slate-300 w-full  bg-white mb-4 ${className}`}
    >
      <div className="flex flex-col flex-1 p-0 w-full">
        {title && (
          <div className="w-full flex items-center h-14 border-b border-solid border-gray-300">
            <span className="self-center opacity-60 pl-4 font-semibold text-lg text-gray-800">
              {title.toUpperCase()}
            </span>
          </div>
        )}
        <div className="w-full pb-2">{children}</div>
      </div>
    </div>
  );
};

export default ScreenWrapper;
