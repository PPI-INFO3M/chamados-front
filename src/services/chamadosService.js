import api from './api'

/* GET */
export async function buscarUsuario() {
    const resposta = await api.get("/eu");
    return resposta.data;
}

export async function listarChamados(filtros) {
    const resposta = await api.get("/chamados", { params: filtros });
    return resposta.data;
}

export async function buscarChamado(id) {
    const resposta = await api.get("/chamados/" + id);
    return resposta.data;
}

/* POST */
export async function criarChamado(chamado) {
    const resposta = await api.post("/chamados", chamado);
    return resposta.data;
}

/* PUT */
export async function editarChamado(id, chamado) {
    const resposta = await api.put("/chamados/" + id, chamado);
    return resposta.data;
}

/* PATCH */
export async function iniciarChamado(id, responsavel) {
    const resposta = await api.patch("/chamados/" + id + "/iniciar", {responsavel: responsavel});
    return resposta.data;
}
export async function resolverChamado(id, solucao) {
    const resposta = await api.patch("/chamados/" + id + "/resolver", {solucao: solucao});
    return resposta.data;
}

/* DELETE */
export async function excluirChamado(id) {
    const resposta = await api.delete("/chamados/" + id);
    return resposta.data;
}

/* LISTAS PARA OS SELECTS */
export async function listarTipos() {
    const resposta = await api.get("/tipos");
    return resposta.data;
}
export async function listarLocais() {
    const resposta = await api.get("/locais");
    return resposta.data;
}
export async function listarPrioridades() {
    const resposta = await api.get("/prioridades");
    return resposta.data;
}