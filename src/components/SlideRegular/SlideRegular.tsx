import React from "react";
import cl from "clsx";
import s from "./SlideRegular.module.scss";
import { useHistory } from "react-router-dom";
import { Routes } from "../../const";

interface SlideRegularProps {
  className?: string;
  header?: string;
  text?: string;
  buttonText?: string;
  img?: string;
}

const SlideRegular = ({
  className,
  header,
  text,
  buttonText,
  img,
}: SlideRegularProps) => {
    let history = useHistory();
  const handleButtonClick = () => {
    history.push(Routes.ERROR404);
  }
  return (
    <div className={cl(s.slide, className)} style={{backgroundImage: `url(${img})` }}>
      {header && <h1 className={cl(s.caption)}>{header}</h1>}
      {text && <p className={cl(s.text)}>{text}</p>}
      {buttonText && (
        <button className={cl(s.button)} type="button" onClick={handleButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default SlideRegular;
