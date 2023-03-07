import React, { createContext, useContext, useState } from "react";
import { IDataEstabeleciment } from "../../components/FormDelete";
import { api } from "../../services/api";

interface IContextElastic {
  closeModalElastic: boolean;
  setCloseModalElastic: React.Dispatch<React.SetStateAction<boolean>>;
  dataModalElastic: IDataEstabeleciment | null;
  setDataModalElastic: React.Dispatch<
    React.SetStateAction<IDataEstabeleciment | null>
  >;
  typeRequestElastic: "post" | "patch" | "delete";
  setTypeRequestElastic: React.Dispatch<
    React.SetStateAction<"post" | "patch" | "delete">
  >;
  getEstabelecimentsElastic: () => Promise<any>;
  getEstabelecimentByIdElastic: (id: string) => Promise<any>;
  createEstabelecimentsElastic: (data: any) => Promise<any>;
  updateEstabelecimentsElastic: (data: any, id: string) => Promise<any>;
  deleteEstabelecimentsElastic: (id: string) => Promise<any>;
}

const ElasticContext = createContext<IContextElastic>({} as IContextElastic);

interface IPropsElastic {
  children: React.ReactNode;
}

export const Elastic = ({ children }: IPropsElastic) => {
  const [closeModalElastic, setCloseModalElastic] = useState<boolean>(true);
  const [dataModalElastic, setDataModalElastic] =
    useState<IDataEstabeleciment | null>(null);
  const [typeRequestElastic, setTypeRequestElastic] = useState<
    "post" | "patch" | "delete"
  >("post");

  const getEstabelecimentsElastic = async () => {
    return api.get("/mongodb/estabelecimentos/").then(({ data }) => data);
  };

  const getEstabelecimentByIdElastic = async (id: string) => {
    return api.get(`/mongodb/estabelecimentos/${id}/`).then(({ data }) => data);
  };

  const createEstabelecimentsElastic = async (data: any) => {
    return api
      .post("/mongodb/estabelecimentos/", data)
      .then(({ data }) => data);
  };

  const updateEstabelecimentsElastic = async (data: any, id: string) => {
    return api
      .patch(`/mongodb/estabelecimentos/${id}`, data)
      .then(({ data }) => data)
      .catch((err) => console.log(err));
  };

  const deleteEstabelecimentsElastic = async (id: string) => {
    return api
      .delete(`/mongodb/estabelecimentos/${id}`)
      .then(({ data }) => data);
  };

  return (
    <ElasticContext.Provider
      value={{
        closeModalElastic,
        setCloseModalElastic,
        dataModalElastic,
        setDataModalElastic,
        typeRequestElastic,
        setTypeRequestElastic,
        getEstabelecimentsElastic,
        getEstabelecimentByIdElastic,
        createEstabelecimentsElastic,
        updateEstabelecimentsElastic,
        deleteEstabelecimentsElastic,
      }}
    >
      {children}
    </ElasticContext.Provider>
  );
};

export const useElastic = () => useContext(ElasticContext);
