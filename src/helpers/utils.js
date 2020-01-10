import { useState, useEffect } from "react";
export const formatNumberThousand = string => {
  let formatter = new Intl.NumberFormat();
  return formatter.format(string);
};

export const maxNumberInt = number => {
  return number > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : number;
};

export const isNumber = string => {
  return !isNaN(string);
};

export const removeComma = string => {
  return string.replace(/,/g, "");
};

export const isEmpty = string => {
  if (string === undefined || string === null) return true;
  return string.length === 0;
};

export const hasDot = string => {
  return (string.match(/\./g) || []).length > 0 ? true : false;
};

export const handleNumber = string => {
  let number = string;
  number = number.replace(/[^0-9 , .]/, "");
  number = removeComma(number);

  if (hasDot(number)) {
    let array = number.split(".");
    let odd = array[0];
    let even = array[1];
    if (even.length > 8) {
      even = even.substr(0, 8);
    }

    if (isNumber(odd)) {
      odd = maxNumberInt(odd);
      odd = formatNumberThousand(odd);
    }

    return [odd, even].join(".");
  } else {
    if (isNumber(number)) {
      number = maxNumberInt(number);
      number = formatNumberThousand(number);
    }

    return number;
  }
};

export const setSelectionRange = (input, selectionStart, selectionEnd) => {
  if (input) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    } else if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd("character", selectionEnd);
      range.moveStart("character", selectionStart);
      range.select();
    }
  }
};

export const setCaretToPos = (inputId, pos) => {
  let input = document.getElementById(inputId);
  setSelectionRange(input, pos, pos);
};

export const useStateFromProp = initialValue => {
  const [inputs, setInputs] = useState(initialValue);

  useEffect(() => setInputs(initialValue), [initialValue]);

  return [inputs, setInputs];
};

export const generateUUID = id => {
  if (id === undefined || id === null || id.toString().length === 0) {
    return [
      "uuid",
      Math.random()
        .toString(36)
        .substr(2, 9)
    ].join("_");
  } else {
    return [
      id,
      Math.random()
        .toString(36)
        .substr(2, 9)
    ].join("_");
  }
};
