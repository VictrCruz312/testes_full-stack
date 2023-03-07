import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import FormCreateEstabeleciments from "../../components/FormCreate";
import ModalDeleteEstabeleciments from "../../components/FormDelete";
import FormUpdateEstabeleciments, {
  IDataEstabeleciment,
} from "../../components/FormUpdate";
import ModalGlobal from "../../components/ModalGlobal";
import { getEstabeleciments } from "../../services/api";
import { HomeStyled } from "./styles";
import { GrFormClose } from "react-icons/gr";

const Home: React.FC = () => {
  const [closeModal, setCloseModal] = useState<boolean>(true);
  const [dataModal, setDataModal] = useState<IDataEstabeleciment | null>(null);
  const [typeRequest, setTypeRequest] = useState<"post" | "patch" | "delete">(
    "post"
  );
  const [estabeleciments, setEstabeleciments] = useState<
    Array<IDataEstabeleciment | null>
  >([]);

  const controllerCrud = {
    post: "Cadastrar estabelecimento",
    patch: "Atualizar estabelecimento",
    delete: "Deletar estabelecimento",
  };

  useEffect(() => {
    getEstabeleciments().then((response) => {
      setEstabeleciments(response);
      console.log(response);
    });
  }, [closeModal]);
  return (
    <HomeStyled>
      <div className="containerEstabeleciments">
        <table>
          <thead>
            <tr>
              <th>CNPJ COMPLETO</th>
              <th>NOME FANTASIA</th>
              <th>CEP</th>
              <th>TELEFONE</th>
              <th>CORREIO ELETRÔNICO</th>
              <th>OPÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {estabeleciments.map((estabeleciment) => (
              <tr key={estabeleciment?._id}>
                <td>{estabeleciment?.["CNPJ COMPLETO"]}</td>
                <td>{estabeleciment?.["NOME FANTASIA"]}</td>
                <td>{estabeleciment?.CEP}</td>
                <td>{estabeleciment?.TELEFONE}</td>
                <td>{estabeleciment?.["CORREIO ELETRÔNICO"]}</td>
                <td className="options">
                  <button
                    type="button"
                    onClick={() => {
                      setDataModal(estabeleciment);
                      setTypeRequest("patch");
                      setCloseModal(false);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDataModal(estabeleciment);
                      setTypeRequest("delete");
                      setCloseModal(false);
                    }}
                  >
                    <GrFormClose />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalGlobal
        title={controllerCrud[typeRequest]}
        closeModal={closeModal}
        setCloseModal={setCloseModal}
      >
        {typeRequest === "post" ? (
          <FormCreateEstabeleciments />
        ) : typeRequest === "patch" ? (
          dataModal ? (
            <FormUpdateEstabeleciments
              estabeleciment={dataModal}
              setEstabeleciment={setDataModal}
            />
          ) : (
            ""
          )
        ) : (
          <ModalDeleteEstabeleciments estabeleciment={dataModal} />
        )}
      </ModalGlobal>
    </HomeStyled>
  );
};

export default Home;
