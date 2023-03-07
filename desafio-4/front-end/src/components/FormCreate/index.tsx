import Button from "../Button";
import Input from "../Input";
import { FormCreateStyled } from "./styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createEstabeleciments,
  createEstabelecimentsElastic,
} from "../../services/api";
import { formSchema } from "../FormUpdate";

export interface IEstabelecimentRequest {
  cnpj: string;
  nome: string;
  cep: string;
  telefone: string;
  correio: string;
}

interface IPropsFormUpdate {
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  isMongo?: boolean;
}

const FormCreateEstabeleciments = ({
  setCloseModal,
  isMongo = true,
}: IPropsFormUpdate) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEstabelecimentRequest>({ resolver: yupResolver(formSchema) });

  const submit = async (data: any) => {
    if (isMongo) {
      await createEstabeleciments(data);
    } else {
      await createEstabelecimentsElastic(data);
    }
    setCloseModal(true);
    window.location.reload();
  };

  return (
    <FormCreateStyled onSubmit={handleSubmit(submit)}>
      <Input
        placeholder="ex: 361147170034445"
        label="CNPJ COMPLETO"
        type="text"
        register={register}
        registerName="cnpj"
        error={errors?.cnpj?.message}
      />

      <Input
        placeholder="ex: João Fulano"
        label="NOME FANTASIA"
        type="text"
        register={register}
        registerName="nome"
        error={errors?.cnpj?.message}
      />
      <Input
        placeholder="ex: 01123123"
        label="CEP"
        type="text"
        register={register}
        registerName="cep"
        error={errors?.cnpj?.message}
      />
      <Input
        placeholder="ex: 11222223333"
        label="TELEFONE"
        type="text"
        register={register}
        registerName="telefone"
        error={errors?.cnpj?.message}
      />
      <Input
        placeholder="ex: joao@mail.com"
        label="CORREIO ELETRÔNICO"
        type="text"
        register={register}
        registerName="correio"
        error={errors?.cnpj?.message}
      />
      <Button type="submit">Salvar alterações</Button>
    </FormCreateStyled>
  );
};

export default FormCreateEstabeleciments;
