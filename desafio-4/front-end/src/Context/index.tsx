import React from "react";
import { Elastic } from "./CrudElastic";
import { Mongo } from "./CrudMongo";

interface IPropsContext {
  children: React.ReactNode;
}

const Context = ({ children }: IPropsContext) => (
  <Elastic>
    <Mongo>{children}</Mongo>
  </Elastic>
);

export default Context;
