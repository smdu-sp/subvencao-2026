export interface IUsuario {
    id: number;
    login: string;
    nome: string;
    email: string;
    permissao: string;
    criadoEm: Date;
    atualizadoEm: Date;
    ultimoLogin: Date | null;
}