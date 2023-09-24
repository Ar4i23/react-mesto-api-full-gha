import { useCallback, useState } from "react";

export const useFormValidation = () => {
  const [value, setValue] = useState({});
  const [error, setError] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isInputValid, setIsInputValid] = useState({});
  const hendleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const validationMessage = e.target.validationMessage;
    const valid = e.target.validity.valid;
    const form = e.target.form;
    setValue((prevValue) => {
      return { ...prevValue, [name]: value };
    });
    setError((prevError) => {
      return { ...prevError, [name]: validationMessage };
    });
    setIsInputValid((prevIsValid) => {
      return { ...prevIsValid, [name]: valid };
    });
    setIsValid(form.checkValidity());
  };
  const resetInput = (data = {}) => {
    setValue(data);
    setError({});
    setIsValid(false);
    setIsInputValid({});
  };

  const setValueInput = useCallback(({ name, about }) => {
    setValue((prevValue) => {
      return { ...prevValue, name, about };
    });
  }, []);

  return {
    value,
    error,
    isValid,
    isInputValid,
    hendleChange,
    resetInput,
    setValueInput,
  };
};
