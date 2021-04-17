module.exports = class ModuloBase {
    constructor(nome, dependencias) {
        this.nome = nome
        this.dependencias = dependencias
        this.carregado = false
    }
    inicializarModulo() {
        this.carregado = true
        return this.nome
    }
}