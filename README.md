# API - TchonBet Frontend
> Aplicação desenvolvida para estudo da diciplina Engenharia de Software

## Dependência

- Node.js 

## Instalação e Execução

Para instalar as dependências e rodar a aplicação, siga os passos abaixo:

1. Instalação:

Execute o seguinte comando para instalar todas as dependências do projeto:

```bash
    npm install
```

2. Execução:

Inicie o ambiente de desenvolvimento com o comando:

```bash
    npm run dev
```
## Padrão de projeto

Neste projeto, adotamos o padrão de Fachada para simplificar e abstrair as camadas internas do software. Em arquiteturas tradicionais, a divisão de responsabilidades ocorre da seguinte forma:

- Repository: Responsável pelo acesso direto ao banco de dados.

- Service: Gerencia a lógica de negócio e invoca os métodos dos repositórios.

Na nossa abordagem, essas funções foram unificadas em uma única camada. Ou seja, ao chamar o service, ele é responsável tanto por processar a lógica de negócio quanto por acessar os dados no banco. Essa integração resulta em:

- Simplificação da Arquitetura: Menor complexidade na interação entre camadas.

- Facilidade de Manutenção: Uma estrutura mais intuitiva e coesa para futuras alterações.

## Considerações Finais

A implementação do padrão de fachada visa tornar o código mais limpo e de fácil compreensão, contribuindo para a eficiência no desenvolvimento e manutenção do projeto.

