import { useEffect, useState } from "react";
import { ContainerInputStyled } from "./styles";

interface IPropsButton {
  placeholder: string;
  label: string;
  type: "text" | "password";
  register: any; //register do yup, caso não use passe:  () => null
  registerName: string; //name do input que será utilizado no register
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  error?: string;
}

const Input = (props: IPropsButton) => {
  const {
    label,
    register,
    registerName,
    onChange,
    value,
    error,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };
  return (
    <ContainerInputStyled>
      <label>
        {label} <span>{error}</span>
      </label>
      <input
        {...restProps}
        {...register(registerName)}
        value={inputValue}
        onChange={handleChange}
      />
    </ContainerInputStyled>
  );
};

export default Input;
