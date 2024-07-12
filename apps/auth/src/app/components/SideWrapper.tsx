import { ReactNode } from 'react';
import { logo, login } from '@appname/assets';
interface SideWrapperProps {
  children: ReactNode;
  className?: string;
}
const SideWrapper: React.FC<SideWrapperProps> = ({ children, className }) => {
  return (
    <div className={`side-wrapper ${className}`}>
      <div className=" h-screen bg-primary w-3/5  items-center justify-center p-20">
        <div className="text-center bg-white p-3 rounded-lg max-w-52 my-0 mx-auto">
          <img src={logo} alt="logo" className="w-full " />
        </div>
        <div className="text-center w-full ">
          <img
            src={login}
            alt="img"
            className="w-full md:w-auto px-5 text-center"
          />
          <p className="mx-auto my-0 text-white max-w-96 text-lg">
            Invaluable Resources for Every Step of Your Practice’s Lifecycle
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default SideWrapper;
