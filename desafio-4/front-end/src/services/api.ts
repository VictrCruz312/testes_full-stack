import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000,
});

export const getEstabeleciments = async () => {
  return api.get("/mongodb/estabelecimentos/").then(({ data }) => data);
};

export const getEstabelecimentById = async (id: string) => {
  return api.get(`/mongodb/estabelecimentos/${id}/`).then(({ data }) => data);
};

export const createEstabeleciments = async (data: any) => {
  return api.post("/mongodb/estabelecimentos/", data).then(({ data }) => data);
};

export const updateEstabeleciments = async (data: any, id: string) => {
  return api
    .patch(`/mongodb/estabelecimentos/${id}`, data)
    .then(({ data }) => data)
    .catch((err) => console.log(err));
};

export const deleteEstabeleciments = async (id: string) => {
  return api.delete(`/elastic/estabelecimentos/${id}`).then(({ data }) => data);
};

export const getEstabelecimentsElastic = async () => {
  return api.get("/elastic/estabelecimentos/").then(({ data }) => data);
};

export const getEstabelecimentByIdElastic = async (id: string) => {
  return api.get(`/elastic/estabelecimentos/${id}/`).then(({ data }) => data);
};

export const createEstabelecimentsElastic = async (data: any) => {
  return api.post("/elastic/estabelecimentos/", data).then(({ data }) => data);
};

export const updateEstabelecimentsElastic = async (data: any, id: string) => {
  return api
    .patch(`/elastic/estabelecimentos/${id}`, data)
    .then(({ data }) => data)
    .catch((err) => console.log(err));
};

export const deleteEstabelecimentsElastic = async (id: string) => {
  return api.delete(`/elastic/estabelecimentos/${id}`).then(({ data }) => data);
};
