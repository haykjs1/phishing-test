import type { FC, ReactElement } from "react";
import { Helmet } from "react-helmet";

import "./HelmetLayout.css";

interface HelmetProps {
  title: string;
  children: ReactElement;
}

const HelmetLayout: FC<HelmetProps> = ({ children, title }) => (
  <div className="helmet_wrapper">
    <Helmet>
      <title>{title}</title>
    </Helmet>

    {children}
  </div>
);

export default HelmetLayout;
