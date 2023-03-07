import Button from "../Button";
import Input from "../Input";
import { FormUpdateStyled } from "./styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateEstabeleciments } from "../../services/api";
import { IEstabelecimentRequest } from "../FormCreate";
import { useMongo } from "../../Context/CrudMongo";

export interface IDataEstabeleciment {
  _id: string;
  "CNPJ COMPLETO": string;
  "NOME FANTASIA": string;
  CEP: string;
  TELEFONE: string;
  "CORREIO ELETRÔNICO": string;
}

const FormUpdateEstabeleciments = () => {
  const { dataModal, setCloseModal } = useMongo();
  const formSchema = yup.object().shape({
    cnpj: yup.string().required("CNPJ COMPLETO é obrigatório"),
    nome: yup.string().required("NOME FANTASIA obrigatório"),
    cep: yup.string().required("CEP obrigatório"),
    telefone: yup.string().required("TELEFONE obrigatório"),
    correio: yup.string().required("CORREIO ELETRÔNICO obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEstabelecimentRequest>({ resolver: yupResolver(formSchema) });

  const submit = (data: IEstabelecimentRequest) => {
    updateEstabeleciments(data, dataModal ? dataModal["_id"] : "");
    setCloseModal(true);
  };

  return (
    <FormUpdateStyled onSubmit={handleSubmit(submit)}>
      <Input
        value={dataModal ? dataModal["CNPJ COMPLETO"] : ""}
        placeholder="ex: 361147170034445"
        label="CNPJ COMPLETO"
        type="text"
        register={register}
        registerName="cnpj"
      />

      <Input
        value={dataModal ? dataModal["NOME FANTASIA"] : ""}
        placeholder="ex: João Fulano"
        label="NOME FANTASIA"
        type="text"
        register={register}
        registerName="nome"
      />
      <Input
        value={dataModal ? dataModal.CEP : ""}
        placeholder="ex: 01123123"
        label="CEP"
        type="text"
        register={register}
        registerName="cep"
      />
      <Input
        value={dataModal ? dataModal.TELEFONE : ""}
        placeholder="ex: 11222223333"
        label="TELEFONE"
        type="text"
        register={register}
        registerName="telefone"
      />
      <Input
        value={dataModal ? dataModal["CORREIO ELETRÔNICO"] : ""}
        placeholder="ex: joao@mail.com"
        label="CORREIO ELETRÔNICO"
        type="text"
        register={register}
        registerName="correio"
      />
      <Button type="submit">Salvar alterações</Button>
    </FormUpdateStyled>
  );
};

export default FormUpdateEstabeleciments;
