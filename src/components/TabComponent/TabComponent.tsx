import React, { useEffect, useState } from "react";
import cl from "clsx";
import s from "./TabComponent.module.scss";
import { ITabComponent } from "../../types";
import DesktopImg from "../../img/piggybank.png";
import TabletImg from "../../img/piggybank-middle.png";
import MobileImg from "../../img/piggybank-small.png";
import { DESKTOP_WIDTH, TABLET_WIDTH } from "../../const";
import { formatText } from "../../utils/utils";

interface ITabComponentProps {
  component: ITabComponent;
  onClick?: () => void;
}

const TabComponent = (elem: ITabComponentProps) => {
  const {
    header,
    list,
    text,
    buttonCaption,
    img,
  } = elem.component;

  const [defaultImg, setDefaultImg] = useState(DesktopImg);

  const onClick = elem.onClick;
  
  const resizeImg = () => {
    if (window.innerWidth >= DESKTOP_WIDTH) {
      setDefaultImg(DesktopImg)
    }
    if (window.innerWidth < DESKTOP_WIDTH && window.innerWidth >= TABLET_WIDTH) {
      setDefaultImg(TabletImg)
    }
    if (window.innerWidth < TABLET_WIDTH) {
      setDefaultImg(MobileImg)
    }
  }

  const handleWindowResize = () => {
    resizeImg();
  }

  useEffect(() => {
    resizeImg();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div className={cl(s.tabWrap)}>
      <div className={cl(s.tabContent)}>
        {header ? <div className={cl(s.header)}>{header}</div> : <></>}
        {list && list?.length !== 0 && (
          <ul className={cl(s.list)}>
            {list.map((item, i) => {
              return <li key={`item${i}`}>{item}</li>;
            })}
          </ul>
        )}
        {typeof text === "object" ? <p className={cl(s.text)} dangerouslySetInnerHTML={formatText(text)} /> : <></>}
        {typeof text === "string" ? <p className={cl(s.text)}>{text}</p> : <></>}
        {buttonCaption && onClick && (
          <button className={cl(s.button)} onClick={onClick}>{buttonCaption}</button>
        )}
      </div>
      <img
        className={cl(s.img, {[s.img__default]: !img})}
        src={img || defaultImg}
        alt=""
      />
    </div>
  );
};

export default TabComponent;
