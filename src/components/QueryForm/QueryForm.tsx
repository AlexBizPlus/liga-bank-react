import React, { ChangeEventHandler, FormEvent, RefObject, useEffect, useRef, useState } from "react";
import cl from "clsx";
import s from "./QueryForm.module.scss";
import { IContext } from "../../types";
import { REQUEST_NUMBER_DIGITS, START_REQUEST_NUMBER, STORE } from "../../const";
import { formatNumber } from "../../utils/utils";

interface IQueryForm {
  className?: string;
  context: IContext[];
  onSubmit: () => void;
}

let count = START_REQUEST_NUMBER;

const QueryForm = ({ className, context, onSubmit }: IQueryForm) => {
  const inputNameRef = useRef<HTMLInputElement | null>(null);
  const [inputNameValue, setInputNameValue] = useState<string>('');
  const [inputTelValue, setInputTelValue] = useState<string>('');
  const [inputEmailValue, setInputEmailValue] = useState<string>('');
  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    let value = evt.currentTarget.value;
    setInputNameValue(value);
  } 
  const handleTelChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    let value = evt.currentTarget.value;
    value = value.replace(/[^0-9()-]*/g, "");
    setInputTelValue(value);
  } 
  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    let value = evt.currentTarget.value;
    setInputEmailValue(value);
  } 
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (localStorage.getItem(STORE)) {
      localStorage.removeItem(STORE);
    } else count += 1;
    localStorage.setItem(
      STORE,
      JSON.stringify({
        count: count,
        name: inputNameValue,
        tel: inputTelValue,
        email: inputEmailValue,
      })
    );
    onSubmit();
  };

  useEffect(() => {
    inputNameRef?.current?.focus();
    if (localStorage.getItem(STORE)) {
      Object.entries(JSON.parse(localStorage.getItem(STORE) || "")).map(([itemKey, itemValue]) => {
        if (itemKey === "count") count = itemValue as number + 1;
      })
    }
  }, []);

  return (
    <form className={cl(s.queryForm, className)} onSubmit={handleFormSubmit}>
      <h3 className={cl(s.queryCaption)}>Шаг 3. Оформление заявки</h3>
      <div className={cl(s.queryTextWrap)}>
        {context.map((item, i) => {
          return (
            <div className={cl(s.queryTextContainer)} key={`item${i}`}>
              <span className={cl(s.queryText__small)}>{item.name}</span>
              <span className={cl(s.queryText)}>{item.name === "Номер заявки" ? `№${formatNumber(count, REQUEST_NUMBER_DIGITS)}` : item.value }</span>
            </div>
          );
        })}
      </div>
      <div className={cl(s.inputWrap)}>
        <input
          className={cl(s.input, s.input__top)}
          required
          type="text"
          placeholder="ФИО"
          autoComplete="off"
          value={inputNameValue}
          onChange={handleNameChange}
          ref={inputNameRef as RefObject<HTMLInputElement>}
        />
        <input
          className={cl(s.input, s.input__left)}
          required
          type="tel"
          placeholder="Телефон 7(___)___-__-__"
          pattern="7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}"
          autoComplete="off"
          value={inputTelValue}
          onChange={handleTelChange}
        />
        <input
          className={cl(s.input, s.input__right)}
          required
          type="email"
          placeholder="E-mail"
          autoComplete="off"
          value={inputEmailValue}
          onChange={handleEmailChange}
        />
      </div>
      <button className={cl(s.button)} type="submit">
        Отправить
      </button>
    </form>
  );
};

export default QueryForm;
