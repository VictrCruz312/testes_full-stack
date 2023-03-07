import React from "react";
import { Mongo } from "./CrudMongo";

interface IPropsContext {
  children: React.ReactNode;
}

const Context = ({ children }: IPropsContext) => <Mongo>{children}</Mongo>;

export default Context;
