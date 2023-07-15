import React from "react";
import dynamic from "next/dynamic";

const BaseMap = dynamic(() => import("@/components/BaseMap"), { ssr: false });

const HomePage = () => {
  return <BaseMap />;
};

export default HomePage;
