import React, { useEffect, useState } from "react";
import FormCreateEstabeleciments from "../../components/FormCreate";
import ModalDeleteEstabeleciments from "../../components/FormDelete";
import FormUpdateEstabeleciments, {
  IDataEstabeleciment,
} from "../../components/FormUpdate";
import ModalGlobal from "../../components/ModalGlobal";
import { getEstabeleciments } from "../../services/api";
import { MongoStyled } from "./styles";
import { GrFormClose } from "react-icons/gr";
import Button from "../../components/Button";

const Mongo: React.FC = () => {
  const [dataModal, setDataModal] = useState<IDataEstabeleciment | null>(null);
  const [closeModal, setCloseModal] = useState<boolean>(true);
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
    });
  }, [closeModal]);
  return (
    <MongoStyled>
      <div className="containerEstabeleciments">
        <Button
          type="button"
          onClick={() => {
            setTypeRequest("post");
            setCloseModal(false);
          }}
        >
          Cadastrar no MongoDB
        </Button>
        <table>
          <thead>
            <tr>
              <th>CNPJ COMPLETO</th>
              <th>NOME FANTASIA</th>
              <th className="extraInformation">CEP</th>
              <th className="extraInformation">TELEFONE</th>
              <th className="extraInformation">CORREIO ELETRÔNICO</th>
              <th>OPÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {estabeleciments.map((estabeleciment) => (
              <tr key={estabeleciment?._id}>
                <td>{estabeleciment?.["CNPJ COMPLETO"]}</td>
                <td>{estabeleciment?.["NOME FANTASIA"]}</td>
                <td className="extraInformation">{estabeleciment?.CEP}</td>
                <td className="extraInformation">{estabeleciment?.TELEFONE}</td>
                <td className="extraInformation">
                  {estabeleciment?.["CORREIO ELETRÔNICO"]}
                </td>
                <td className="options">
                  <button
                    type="button"
                    onClick={async () => {
                      await getEstabeleciments().then((response) => {
                        setEstabeleciments(response);
                      });
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
          <FormCreateEstabeleciments setCloseModal={setCloseModal} />
        ) : typeRequest === "patch" ? (
          dataModal ? (
            <FormUpdateEstabeleciments
              dataModal={dataModal}
              setCloseModal={setCloseModal}
            />
          ) : (
            ""
          )
        ) : (
          <ModalDeleteEstabeleciments
            dataModal={dataModal}
            setCloseModal={setCloseModal}
          />
        )}
      </ModalGlobal>
    </MongoStyled>
  );
};

export default Mongo;
