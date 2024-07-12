import React from 'react';
import SideWrapper from '../SideWrapper';
interface LoginWrapperProps {
  children: React.ReactNode;
}
const LoginWrapper: React.FC<LoginWrapperProps> = ({ children }) => {
  return (
    <div className="flex">
      <SideWrapper>{children}</SideWrapper>
    </div>
  );
};
export default LoginWrapper;
