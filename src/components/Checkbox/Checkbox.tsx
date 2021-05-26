import React, { ChangeEvent, useEffect, useState } from "react";
import cl from "clsx";
import s from "./Checkbox.module.scss";
import { nanoid } from "nanoid";
import { Values } from "../../types";

interface ICheckbox {
  onChange: (value: Values) => void;
  className?: string;
  labelClassName?: string;
  labelText: string;
  valueChecked: Values;
  valueNotChecked: Values;
}

const Checkbox = ({
  className,
  labelClassName,
  labelText,
  onChange,
  valueChecked,
  valueNotChecked,
}: ICheckbox) => {
  const inputId = nanoid(11);
  const handleCheckboxChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    let currentTarget = evt.currentTarget;
    onChange(currentTarget.checked ? valueChecked : valueNotChecked);
  };
  return (
    <div className={cl(s.wrap, className)}>
      <input
        className={cl("display-none", s.input)}
        type="checkbox"
        id={inputId}
        name={inputId}
        onChange={handleCheckboxChange}
      />
      <label className={cl(s.label, labelClassName)} htmlFor={inputId}>
        {labelText}
      </label>
    </div>
  );
};

export default Checkbox;
