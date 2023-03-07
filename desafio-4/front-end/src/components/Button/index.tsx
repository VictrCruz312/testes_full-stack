import { ButtonStyled } from "./styles";

interface IPropsButton {
  children: React.ReactNode;
  type: "button" | "submit";
  onClick?: () => void;

  background?: string;
  backgroundHover?: string;
  width?: string;
  color?: string;
  borderColor?: string;
  borderColorHover?: string;
  fontSize?: string;
  minButton?: boolean;
}

const Button = (props: IPropsButton) => {
  const { children, ...restProps } = props;

  return <ButtonStyled {...restProps}>{children}</ButtonStyled>;
};

export default Button;
