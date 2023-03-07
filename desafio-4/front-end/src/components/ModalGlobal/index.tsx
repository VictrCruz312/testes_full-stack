import React from "react";
import { ModalGlobalStyled } from "./styles";
import { GrFormClose } from "react-icons/gr";

interface IPropsModalGlobal {
  children: React.ReactNode;
  title: string;
  closeModal: boolean;
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalGlobal = ({
  children,
  title,
  setCloseModal,
  closeModal,
}: IPropsModalGlobal) => {
  return (
    <ModalGlobalStyled closeModal={closeModal}>
      <div className="containerModal">
        <div className="modalInfo">
          <p>{title}</p>
          <button
            onClick={() => {
              setCloseModal(true);
              window.location.reload();
            }}
          >
            <GrFormClose />
          </button>
        </div>
        <div className="containerInfos">{children}</div>
      </div>
    </ModalGlobalStyled>
  );
};

export default ModalGlobal;
