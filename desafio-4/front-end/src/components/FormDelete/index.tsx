import { useMongo } from "../../Context/CrudMongo";
import { deleteEstabeleciments } from "../../services/api";
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

const ModalDeleteEstabeleciments = () => {
  const { dataModal, setCloseModal } = useMongo();
  const handleDelete = (id: string) => {
    deleteEstabeleciments(id);
    setCloseModal(true);
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
