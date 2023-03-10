import Button from "../Button";
import Input from "../Input";
import { FormUpdateStyled } from "./styles";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  updateEstabeleciments,
  updateEstabelecimentsElastic,
} from "../../services/api";
import { IEstabelecimentRequest } from "../FormCreate";
import { useEffect } from "react";

export interface IDataEstabeleciment {
  _id: string;
  "CNPJ COMPLETO": string;
  "NOME FANTASIA": string;
  CEP: string;
  TELEFONE: string;
  "CORREIO ELETRÔNICO": string;
}

interface IPropsFormUpdate {
  dataModal: IDataEstabeleciment | null;
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  isMongo?: boolean;
}
export const formSchema = yup.object().shape({
  cnpj: yup
    .string()
    .matches(
      /^[0-9]{0,14}$/,
      "deve conter somente números e ter no máximo 14 caracteres"
    )
    .required("é obrigatório"),
  nome: yup
    .string()
    .transform((value) => value.toUpperCase())
    .max(150, "deve ter no máximo 150 caracteres")
    .required("obrigatório"),
  cep: yup
    .string()
    .matches(
      /^[0-9]{0,8}$/,
      "deve conter somente números e ter no máximo 8 caracteres"
    )
    .required("obrigatório"),
  telefone: yup
    .string()
    .matches(/^[0-9]{11}$/, "deve ter 11 números, sendo DDD+numero")
    .required("obrigatório"),
  correio: yup
    .string()
    .transform((value) => value.toUpperCase())
    .email("deve ser um email válido")
    .required("obrigatório"),
});

const FormUpdateEstabeleciments = ({
  dataModal,
  setCloseModal,
  isMongo = true,
}: IPropsFormUpdate) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEstabelecimentRequest>({ resolver: yupResolver(formSchema) });

  const submit = async (data: IEstabelecimentRequest) => {
    if (isMongo) {
      await updateEstabeleciments(data, dataModal ? dataModal["_id"] : "");
    } else {
      await updateEstabelecimentsElastic(
        data,
        dataModal ? dataModal["_id"] : ""
      );
    }
    setCloseModal(true);
    window.location.reload();
  };

  useEffect(() => {}, [dataModal]);
  return (
    <FormUpdateStyled onSubmit={handleSubmit(submit)}>
      <Input
        value={dataModal ? dataModal["CNPJ COMPLETO"] : ""}
        placeholder="ex: 361147170034445"
        label="CNPJ COMPLETO"
        type="text"
        register={register}
        registerName="cnpj"
        error={errors?.cnpj?.message}
      />

      <Input
        value={dataModal ? dataModal["NOME FANTASIA"] : ""}
        placeholder="ex: João Fulano"
        label="NOME FANTASIA"
        type="text"
        register={register}
        registerName="nome"
        error={errors?.nome?.message}
      />
      <Input
        value={dataModal ? dataModal.CEP : ""}
        placeholder="ex: 01123123"
        label="CEP"
        type="text"
        register={register}
        registerName="cep"
        error={errors?.cep?.message}
      />
      <Input
        value={dataModal ? dataModal.TELEFONE : ""}
        placeholder="ex: 11222223333"
        label="TELEFONE"
        type="text"
        register={register}
        registerName="telefone"
        error={errors?.telefone?.message}
      />
      <Input
        value={dataModal ? dataModal["CORREIO ELETRÔNICO"] : ""}
        placeholder="ex: joao@mail.com"
        label="CORREIO ELETRÔNICO"
        type="text"
        register={register}
        registerName="correio"
        error={errors?.correio?.message}
      />
      <Button type="submit">Salvar alterações</Button>
    </FormUpdateStyled>
  );
};

export default FormUpdateEstabeleciments;
