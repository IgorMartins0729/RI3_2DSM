class Telefone {
    constructor(codArea, digitos) {
        this.ddd = codArea;
        this.numero = digitos;
    }
    
    getDddAlta() { return String(this.ddd).toUpperCase(); }
    getDddBaixa() { return String(this.ddd).toLowerCase(); }
    getNumeroAlta() { return String(this.numero).toUpperCase(); }
    getNumeroBaixa() { return String(this.numero).toLowerCase(); }
}

class Endereco {
    constructor(uf, municipio, via, numLocal) {
        this.estado = uf;
        this.cidade = municipio;
        this.rua = via;
        this.numero = numLocal;
    }
    
    getEstadoAlta() { return String(this.estado).toUpperCase(); }
    getEstadoBaixa() { return String(this.estado).toLowerCase(); }
    getCidadeAlta() { return String(this.cidade).toUpperCase(); }
    getCidadeBaixa() { return String(this.cidade).toLowerCase(); }
    getRuaAlta() { return String(this.rua).toUpperCase(); }
    getRuaBaixa() { return String(this.rua).toLowerCase(); }
}

class Cliente {
    #cpf;
    
    constructor(nomePessoa, docCpf, localHabitacao) {
        this.nome = nomePessoa;
        this.#cpf = docCpf;
        this.endereco = localHabitacao;
        this.telefones = new Set();
    }
    
    getCpf() { return this.#cpf; }
    getNomeAlta() { return String(this.nome).toUpperCase(); }
    getNomeBaixa() { return String(this.nome).toLowerCase(); }
}

class Empresa {
    #cnpj;
    
    constructor(razao, fantasia, docCnpj, sede) {
        this.razaoSocial = razao;
        this.nomeFantasia = fantasia;
        this.#cnpj = docCnpj;
        this.endereco = sede;
        this.clientes = new Set();
        this.telefones = new Set();
    }
    
    getCnpj() { return this.#cnpj; }
    getRazaoSocialAlta() { return String(this.razaoSocial).toUpperCase(); }
    getRazaoSocialBaixa() { return String(this.razaoSocial).toLowerCase(); }
    getNomeFantasiaAlta() { return String(this.nomeFantasia).toUpperCase(); }
    getNomeFantasiaBaixa() { return String(this.nomeFantasia).toLowerCase(); }

    detalhe() {
        let extrato = `Razão Social: ${this.razaoSocial}\nNome fantasia: ${this.nomeFantasia}\n`;
        
        this.clientes.forEach(fregues => {
            extrato += `Nome: ${fregues.nome}\n`;
            extrato += `Estado: ${fregues.endereco.estado} cidade: ${fregues.endereco.cidade} rua: ${fregues.endereco.rua} numero: ${fregues.endereco.numero}\n`;
            
            fregues.telefones.forEach(contato => {
                extrato += `ddd: ${contato.ddd} numero: ${contato.numero}\n`;
            });
        });

        return extrato;
    }
}

const baseDaFirma = new Endereco("SP", "São José dos Campos", "Av. Cassiano Ricardo", "1000");
const firmaPrincipal = new Empresa("ABC LTDA", "Mercado Online", "12.345.678/0001-90", baseDaFirma);

firmaPrincipal.telefones.add(new Telefone("11", "33334444"));
firmaPrincipal.telefones.add(new Telefone("11", "55556666"));

function fabricarConsumidor(n, doc, uf, cid, logradouro, numCasa, cod, cel1, cel2) {
    const moradia = new Endereco(uf, cid, logradouro, numCasa);
    const individuo = new Cliente(n, doc, moradia);
    individuo.telefones.add(new Telefone(cod, cel1));
    individuo.telefones.add(new Telefone(cod, cel2));
    return individuo;
}

//pedi pra ia gerar valores para mim
const compradorA = fabricarConsumidor("João", "111.111.111-11", "SP", "São José dos Campos", "Av Andrômeda", "987", "12", "99999999", "99999999");
const compradorB = fabricarConsumidor("Gabriel", "222.222.222-22", "SP", "São José dos Campos", "Av Andrômeda", "412", "12", "88888888", "88888888");
const compradorC = fabricarConsumidor("Barbara", "333.333.333-33", "SP", "São José dos Campos", "Av São João", "789", "12", "77777777", "77777777");
const compradorD = fabricarConsumidor("Márcia", "444.444.444-44", "SP", "São José dos Campos", "Av Andromeda", "452", "12", "66666666", "66666666");
const compradorE = fabricarConsumidor("Lucas", "555.555.555-55", "SP", "São José dos Campos", "Rua das Flores", "123", "12", "55555555", "55555555");

firmaPrincipal.clientes.add(compradorA);
firmaPrincipal.clientes.add(compradorB);
firmaPrincipal.clientes.add(compradorC);
firmaPrincipal.clientes.add(compradorD);
firmaPrincipal.clientes.add(compradorE);

console.log(firmaPrincipal.detalhe());