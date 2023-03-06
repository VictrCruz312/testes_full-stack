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

interface IFormDeleteProps {
  estabeleciment: IDataEstabeleciment | null;
}

const ModalDeleteEstabeleciments = ({ estabeleciment }: IFormDeleteProps) => {
  return (
    <ModalDeleteStyled>
      {estabeleciment ? (
        <>
          <h1>Tem certeza que deseja deletar este estabelecimento:</h1>
          <br />
          <h3>NOME FANTASIA: {estabeleciment["NOME FANTASIA"]}</h3>
          <br />
          <h3>CNPJ: {estabeleciment["CNPJ COMPLETO"]}</h3>
          <Button
            type="button"
            onClick={() => deleteEstabeleciments(estabeleciment._id)}
          >
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
