import Button from "../Button";
import Input from "../Input";
import { FormCreateStyled } from "./styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createEstabeleciments } from "../../services/api";

export interface IEstabelecimentRequest {
  cnpj: string;
  nome: string;
  cep: string;
  telefone: string;
  correio: string;
}

const FormCreateEstabeleciments = () => {
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

  return (
    <FormCreateStyled onSubmit={handleSubmit(createEstabeleciments)}>
      <Input
        placeholder="ex: 361147170034445"
        label="CNPJ COMPLETO"
        type="text"
        register={register}
        registerName="cnpj"
      />

      <Input
        placeholder="ex: João Fulano"
        label="NOME FANTASIA"
        type="text"
        register={register}
        registerName="nome"
      />
      <Input
        placeholder="ex: 01123123"
        label="CEP"
        type="text"
        register={register}
        registerName="cep"
      />
      <Input
        placeholder="ex: 11222223333"
        label="TELEFONE"
        type="text"
        register={register}
        registerName="telefone"
      />
      <Input
        placeholder="ex: joao@mail.com"
        label="CORREIO ELETRÔNICO"
        type="text"
        register={register}
        registerName="correio"
      />
      <Button type="submit">Salvar alterações</Button>
    </FormCreateStyled>
  );
};

export default FormCreateEstabeleciments;
