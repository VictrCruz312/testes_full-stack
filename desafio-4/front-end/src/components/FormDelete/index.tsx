import {
  deleteEstabeleciments,
  deleteEstabelecimentsElastic,
} from "../../services/api";
import Button from "../Button";
import { ModalDeleteStyled } from "./styles";

export interface IDataEstabeleciment {
  _id: string;
  "CNPJ COMPLETO": string;
  "NOME FANTASIA": string;
  CEP: string;
  TELEFONE: string;
  "CORREIO ELETRÔNICO": string;
}

interface IPropsModalDelete {
  dataModal: IDataEstabeleciment | null;
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  isMongo?: boolean;
}

const ModalDeleteEstabeleciments = ({
  dataModal,
  setCloseModal,
  isMongo = true,
}: IPropsModalDelete) => {
  const handleDelete = async (id: string) => {
    if (isMongo) {
      await deleteEstabeleciments(id);
    } else {
      await deleteEstabelecimentsElastic(id);
    }
    setTimeout(() => {
      setCloseModal(true);
      window.location.reload();
    }, 500);
  };

  return (
    <ModalDeleteStyled>
      {dataModal ? (
        <>
          <h1>Tem certeza que deseja deletar este estabelecimento:</h1>
          <br />
          <h3>NOME FANTASIA: {dataModal["NOME FANTASIA"]}</h3>
          <br />
          <h3>CNPJ: {dataModal["CNPJ COMPLETO"]}</h3>
          <Button type="button" onClick={() => handleDelete(dataModal._id)}>
            Salvar alterações
          </Button>
        </>
      ) : (
        <h2>estabelecimento não encontrado</h2>
      )}
    </ModalDeleteStyled>
  );
};

export default ModalDeleteEstabeleciments;
