import Button from "../Button";
import Input from "../Input";
import { FormUpdateStyled } from "./styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateEstabeleciments } from "../../services/api";
import { IEstabelecimentRequest } from "../FormCreate";

export interface IDataEstabeleciment {
  _id: string;
  "CNPJ COMPLETO": string;
  "NOME FANTASIA": string;
  CEP: string;
  TELEFONE: string;
  "CORREIO ELETRÔNICO": string;
}

interface IFormUpdateProps {
  estabeleciment: IDataEstabeleciment;
  setEstabeleciment: React.Dispatch<
    React.SetStateAction<IDataEstabeleciment | null>
  >;
}

const FormUpdateEstabeleciments = ({ estabeleciment }: IFormUpdateProps) => {
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
    updateEstabeleciments(data, estabeleciment["_id"]);
  };

  return (
    <FormUpdateStyled onSubmit={handleSubmit(submit)}>
      <Input
        value={estabeleciment ? estabeleciment["CNPJ COMPLETO"] : ""}
        placeholder="ex: 361147170034445"
        label="CNPJ COMPLETO"
        type="text"
        register={register}
        registerName="cnpj"
      />

      <Input
        value={estabeleciment ? estabeleciment["NOME FANTASIA"] : ""}
        placeholder="ex: João Fulano"
        label="NOME FANTASIA"
        type="text"
        register={register}
        registerName="nome"
      />
      <Input
        value={estabeleciment ? estabeleciment.CEP : ""}
        placeholder="ex: 01123123"
        label="CEP"
        type="text"
        register={register}
        registerName="cep"
      />
      <Input
        value={estabeleciment ? estabeleciment.TELEFONE : ""}
        placeholder="ex: 11222223333"
        label="TELEFONE"
        type="text"
        register={register}
        registerName="telefone"
      />
      <Input
        value={estabeleciment ? estabeleciment["CORREIO ELETRÔNICO"] : ""}
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
