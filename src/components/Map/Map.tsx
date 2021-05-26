import React from "react";
import cl from "clsx";
import s from "./Map.module.scss";
import SimpleMap from "../SimpeMap/SimpleMap"

const Map = () => {
  return (
    <div className={cl(s.wrap)}>
      <div className={cl(s.content)} id="calculator">
        <h2 className={cl(s.header)}>Отделения Лига Банка</h2>
        <SimpleMap />
      </div>
    </div>
  );
};

export default Map;
