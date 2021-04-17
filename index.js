const carregador = new (require("./Carregador"))()

carregador.addModulo("0", [])
carregador.addModulo("1", [])
carregador.addModulo("4", [])
carregador.addModulo("2", [1])
carregador.addModulo("3", [0])
carregador.addModulo("5", [3])
carregador.addModulo("7", [5, 6])
carregador.addModulo("6", [2, 4, 5])

//Curiosidade 1: Caso o modulo mais dependente seja o primeiro adicionado, o sistema tem melhor desempenho, pois pegará o
//modulo e mandará carregar suas dependencias. Ao final da primeira interação o sistema verá que já carregou boa parte dos
//modulos e não será necessário passar por todos os modulos (numero de interações: 12)

//Curiosidade: 2: Caso os modulos sejam adicionados de forma ordenada do modulo com menor dependencia para o com maior dependencia teremos o
//pior desempenho, pois o carregador irá ter que passar por todos os modulos e o numero de iterações será maior (número de interações: 18)

//Contudo em ambos os casos o sistema consegue carregar os modulos seguindo a ordem correta.

carregador.iniciar()