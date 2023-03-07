import styled from "styled-components";

interface IPropsButtonStyled {
  background?: string;
  backgroundHover?: string;
  width?: string;
  color?: string;
  borderColor?: string;
  fontSize?: string;
  borderColorHover?: string;
  minButton?: boolean;
}

export const ButtonStyled = styled.button<IPropsButtonStyled>`
  background: ${({ background }) =>
    background ? background : "var(--color-brand-1)"};

  border: ${({ borderColor }) =>
    borderColor
      ? "1.5px solid " + borderColor
      : "1.5px solid var(--color-brand-1)"};

  :hover {
    background: ${({ backgroundHover }) =>
      backgroundHover ? backgroundHover : "var(--color-brand-2)"};

    border: ${({ borderColorHover }) =>
      borderColorHover
        ? "1.5px solid " + borderColorHover
        : "1.5px solid var(--color-brand-2)"};
  }

  border-radius: 4px;
  width: ${({ width }) => (width ? width : "100%")};

  color: ${({ color }) => (color ? color : "var(--color-whiteFixed)")};
  font-weight: 600;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "16px")};
  padding: ${({ minButton }) => (minButton ? "12px 0" : "16px 0")};
`;
