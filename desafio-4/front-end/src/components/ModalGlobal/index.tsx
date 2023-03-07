import React from "react";
import { ModalGlobalStyled } from "./styles";
import { GrFormClose } from "react-icons/gr";
import { useMongo } from "../../Context/CrudMongo";

interface IPropsModalGlobal {
  children: React.ReactNode;
  title: string;
}

const ModalGlobal = ({ children, title }: IPropsModalGlobal) => {
  const { closeModal, setCloseModal } = useMongo();
  return (
    <ModalGlobalStyled closeModal={closeModal}>
      <div className="containerModal">
        <div className="modalInfo">
          <p>{title}</p>
          <button onClick={() => setCloseModal(true)}>
            <GrFormClose />
          </button>
        </div>
        <div className="containerInfos">{children}</div>
      </div>
    </ModalGlobalStyled>
  );
};

export default ModalGlobal;
