import React, { useEffect, useState } from "react";
import FormCreateEstabeleciments from "../../components/FormCreate";
import ModalDeleteEstabeleciments from "../../components/FormDelete";
import FormUpdateEstabeleciments, {
  IDataEstabeleciment,
} from "../../components/FormUpdate";
import ModalGlobal from "../../components/ModalGlobal";
import { getEstabeleciments } from "../../services/api";
import { GrFormClose } from "react-icons/gr";
import { useMongo } from "../../Context/CrudMongo";
import { ElasticStyled } from "./styles";

const Elastic: React.FC = () => {
  const {
    dataModal,
    setDataModal,
    closeModal,
    setCloseModal,
    typeRequest,
    setTypeRequest,
  } = useMongo();
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
    <ElasticStyled>
      <div className="containerEstabeleciments">
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

      <ModalGlobal title={controllerCrud[typeRequest]}>
        {typeRequest === "post" ? (
          <FormCreateEstabeleciments />
        ) : typeRequest === "patch" ? (
          dataModal ? (
            <FormUpdateEstabeleciments />
          ) : (
            ""
          )
        ) : (
          <ModalDeleteEstabeleciments />
        )}
      </ModalGlobal>
    </ElasticStyled>
  );
};

export default Elastic;
