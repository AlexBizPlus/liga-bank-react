import React, { TouchEventHandler, useEffect, useState, lazy } from "react";
import cl from "clsx";
import s from "./Slider.module.scss";
import { changeSlidesAction, ISlide } from "../../types";
import SlideHero from "../SlideHero/SlideHero";
import SlideRegular from "../SlideRegular/SlideRegular";
import SliderImg1 from "../../img/slider-1.png";
import SliderImg2 from "../../img/slider-2.png";
import { REFRESH_INTERVAL } from "../../const";

const slides: ISlide[] = [
  {
    slide: (
      <SlideHero
        header={"Лига Банк"}
        text={"Кредиты на любой случай"}
        buttonText={"Рассчитать кредит"}
      />
    ),
  },
  {
    slide: (
      <SlideRegular
        img={SliderImg1}
        header={"Лига Банк"}
        text={"Ваша уверенность в завтрашнем дне"}
      />
    ),
    backgroundColor: "ghostwhite",
  },
  {
    slide: (
      <SlideRegular
        img={SliderImg2}
        header={"Лига Банк"}
        text={"Всегда рядом"}
        buttonText={"Найти отделение"}
      />
    ),
    backgroundColor: "ghostwhite",
  },
];

let activeIndex = 0;

const Slider = () => {
  const [isSlideMoveLeft, setIsSlideMoveLeft] = useState<boolean>(false);
  let buffer: ISlide | undefined;
  const [coordX, setCoordX] = useState<number | undefined>();
  let timer: NodeJS.Timeout;
  const changeSlides = (direction: changeSlidesAction) => {
    if (direction === "increase") {
      setIsSlideMoveLeft(true);
    }
    if (direction === "reduce") {
      buffer = slides.pop();
      slides.unshift(buffer ? buffer : { slide: <></> });
    }

    setTimeout(() => {
      if (direction === "reduce") {
        activeIndex = activeIndex >= 1 ? activeIndex - 1 : slides.length - 1;
      }

      if (direction === "increase") {
        activeIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
        buffer = slides.shift();
        slides.push(buffer ? buffer : { slide: <></> });
        setIsSlideMoveLeft(false);
      }
    }, 550);
  };

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (evt) => {
    setCoordX(evt.touches[0].clientX);
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (evt) => {
    if (coordX && evt.changedTouches[0].clientX > coordX)
      changeSlides("reduce");

    if (coordX && evt.changedTouches[0].clientX < coordX) {
      changeSlides("increase");
    }
  };

  const runTimer = () => {
    timer = global.setInterval(
      () => changeSlides("increase"),
      REFRESH_INTERVAL
    );
  };

  useEffect(() => {
    runTimer();
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className={cl(
        s.heroWrap,
        { [s.heroWrap__moveLeftSlide]: isSlideMoveLeft }
      )}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((item, i) => {
        return <React.Fragment key={`item${i}`}>{item.slide}</React.Fragment>;
      })}
      <div className={cl(s.paggination)}>
        {slides.map((item, i) => {
          return (
            <div
              className={cl(s.dot, { [s.dot__active]: i === activeIndex })}
              key={`item${i}`}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Slider;
