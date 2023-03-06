import styled from "styled-components";

interface IPropsModalGlobalStyled {
  closeModal: boolean;
}

export const ModalGlobalStyled = styled.div<IPropsModalGlobalStyled>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: ${({ closeModal }) => (closeModal ? "none" : "flex")};
  justify-content: center;
  align-items: flex-start;
  padding-top: 94px;
  background-color: rgba(0, 0, 0, 0.5);

  @media screen and (min-width: 520px) {
    padding-top: 80px;
  }

  .containerModal {
    width: 99vw;
    background: var(--color-whiteFixed);
    border-radius: 8px;
    padding: 18px 16px 16px 16px;
    @media screen and (min-width: 520px) {
      width: 520px;
      padding: 18px 24px 24px 24px;
    }

    .modalInfo {
      padding-bottom: 55px;
      display: flex;
      justify-content: space-between;

      @media screen and (min-width: 520px) {
        padding-bottom: 38px;
      }

      p {
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        color: var(--color-gray-1);
      }

      button {
        border: none;
        padding: 0;
        margin: 0;
        background: inherit;

        svg {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
`;
