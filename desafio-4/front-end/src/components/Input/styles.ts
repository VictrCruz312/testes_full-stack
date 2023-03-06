import styled from "styled-components";

export const ContainerInputStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: var(--color-gray-1);
  }

  input {
    width: 100%;
    padding: 16px;

    background: var(--color-gray-8);
    border: none;
    border-radius: 4px;

    font-size: 16px;

    :focus {
      box-shadow: 0 0 0 0;
      outline: 1.5px solid var(--color-brand-2);
    }

    :hover {
      background: var(--color-gray-9);
    }

    ::placeholder {
      font-weight: 400;
      font-size: 16px;
      color: var(--color-gray-3);
    }
  }
`;
