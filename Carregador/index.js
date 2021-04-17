const Modulo = require("../Modulo")

module.exports = class Carregador {
    constructor() {
        this.numInteracoes = 0
        this.sistema = []
        this.modulosCarregados = []
        this.ordemCarregamento = "Ordem de carregamento: "
    }
    addModulo(nome, dependencias) {
        this.sistema.push(new Modulo(nome, dependencias))
    }

    iniciar() {
        console.log("Iniciando carregamento do sistema...")
        for (let i = 0; i < this.sistema.length; i++) {
            this.numInteracoes++

            //Caso todos os modulos ja tenham sido carregados não porque continuar, pois tudo foi carregado
            if (this.modulosCarregados.length === this.sistema.length) {
                break
            }
            this.verificaDependencia(this.sistema[i])
        }
        console.log("Sistema carregado.")
        console.log(this.ordemCarregamento)
        console.log(`Número de interações: ${this.numInteracoes}`)
    }
    verificaDependencia(modulo) {
        //Caso o modulo já tenha sido carregado pule para o proximo
        if (modulo.carregado) return

        //Caso o modulo não tenha dependencias ou suas dependencias já tenha sido carregadas
        if (modulo.dependencias.length === 0 || this.verificaDependenciasCarregadas(modulo)) {
            this.carregaModulo(modulo)
        }
        else {
            for (const dependencia of modulo.dependencias) {
                this.numInteracoes++
                const index = this.sistema.findIndex(elem => elem.nome == dependencia)
                this.verificaDependencia(this.sistema[index])
            }
            this.carregaModulo(modulo)
        }
    }
    verificaDependenciasCarregadas(modulo) {
        //Caso o numero de dependencia dos modulos seja maior do que as já carregadas, já sabemos que este modulo não tem como ser carregado
        if (modulo.dependencias.length > this.modulosCarregados.length) return false

        let numDependencias = 0
        for (const dependencia of modulo.dependencias) {
            this.numInteracoes++
            if (this.modulosCarregados[dependencia] == dependencia) {
                numDependencias++

                if (numDependencias === modulo.dependencias.length) {
                    return true
                }
            }
            else {
                return false
            }
        }
    }
    carregaModulo(modulo) {
        const result = modulo.inicializarModulo()
        this.ordemCarregamento += ` ${result} -> `
        this.modulosCarregados[result] = result
    }
}