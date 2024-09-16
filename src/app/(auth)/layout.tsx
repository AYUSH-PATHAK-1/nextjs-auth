import { FC, ReactNode } from "react";

interface AuthlayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthlayoutProps> = ({ children }) => {
  return <div className=" bg-slate-100 p-10 rounded-xl">{children}</div>;
};

export default AuthLayout;
