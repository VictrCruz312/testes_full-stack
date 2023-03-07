import React, { createContext, useContext } from "react";

interface IContextMongo {}

const MongoContext = createContext<IContextMongo>({} as IContextMongo);

interface IPropsMongo {
  children: React.ReactNode;
}

export const Mongo = ({ children }: IPropsMongo) => {
  return <MongoContext.Provider value={{}}>{children}</MongoContext.Provider>;
};

export const useMongo = () => useContext(MongoContext);
