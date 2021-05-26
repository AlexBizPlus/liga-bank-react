import React, { useEffect, useState } from "react";
import cl from "clsx";
import s from "./HomePage.module.scss";
import Header from "../../components/Header/Header";
import Slider from "../../components/Slider/Slider";
import TabWrapper from "../../components/TabWrapper/TabWrapper";
import { Tabs } from "../../const";
import Calculator from "../../components/Calculator/Calculator";
import Map from "../../components/Map/Map";
import Footer from "../../components/Footer/Footer";
import Popup from "../../components/Popup/Popup";
import LoginPopup from "../../components/LoginPopup/LoginPopup";

const HomePage = () => {
  const [isShowPopupContact, setIsShowPopupContact] = useState<boolean>(false);
  const [isShowLoginPopup, setIsShowLoginPopup] = useState<boolean>(false);
  const handlePopupContactClose = (): void => {
    setIsShowPopupContact(false);
  };
  const handlePopupLoginClose = (): void => {
    setIsShowLoginPopup(false);
  };
  const handleCalculatorSuccess = (): void => {
    setIsShowPopupContact(true);
  };
  const handleLoginClick = (): void => {
    setIsShowLoginPopup(true);
  };
  const handleHomePageKeyDown = (ev: KeyboardEvent) => {
    if (ev.code === "Escape") {
      setIsShowPopupContact(false);
      setIsShowLoginPopup(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleHomePageKeyDown);
    return () => window.removeEventListener("keydown", handleHomePageKeyDown);
  }, []);

  return (
    <div
      className={cl(s.homePage, { [s.homePage__fixed]: isShowPopupContact || isShowLoginPopup })}
    >
      <Header onLoginClick={handleLoginClick} />
      <Slider />
      <TabWrapper tabs={Tabs} />
      <Calculator onSuccess={handleCalculatorSuccess} />
      <Map />
      <Footer />
      <Popup isShow={isShowPopupContact} onClose={handlePopupContactClose} className={cl(s.popup)}>
        <p className={cl(s.popupCaption)}>Спасибо за обращение в наш банк.</p>
        <p className={cl(s.popupText)}>
          Наш менеджер скоро свяжется с вами по указанному номеру телефона.
        </p>
      </Popup>
      <Popup
        isShow={isShowLoginPopup}
        onClose={handlePopupLoginClose}
        className={cl(s.popupLogin)}
        classNameClose={cl(s.popupLoginClose)}
      >
        <LoginPopup onSubmit={handlePopupLoginClose} />
      </Popup>
    </div>
  );
};

export default HomePage;
