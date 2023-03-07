import React, { createContext, useContext, useState } from "react";
import { IDataEstabeleciment } from "../../components/FormDelete";

interface IContextMongo {
  closeModal: boolean;
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  dataModal: IDataEstabeleciment | null;
  setDataModal: React.Dispatch<
    React.SetStateAction<IDataEstabeleciment | null>
  >;
  typeRequest: "post" | "patch" | "delete";
  setTypeRequest: React.Dispatch<
    React.SetStateAction<"post" | "patch" | "delete">
  >;
}

const MongoContext = createContext<IContextMongo>({} as IContextMongo);

interface IPropsMongo {
  children: React.ReactNode;
}

export const Mongo = ({ children }: IPropsMongo) => {
  const [closeModal, setCloseModal] = useState<boolean>(true);
  const [dataModal, setDataModal] = useState<IDataEstabeleciment | null>(null);
  const [typeRequest, setTypeRequest] = useState<"post" | "patch" | "delete">(
    "post"
  );
  return (
    <MongoContext.Provider
      value={{
        closeModal,
        setCloseModal,
        dataModal,
        setDataModal,
        typeRequest,
        setTypeRequest,
      }}
    >
      {children}
    </MongoContext.Provider>
  );
};

export const useMongo = () => useContext(MongoContext);
