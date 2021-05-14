# Analytics Watcher

<div align="center">
  <img src="https://raw.githubusercontent.com/DP6/templates-centro-de-inovacoes/main/public/images/centro_de_inovacao_dp6.png" height="100px" />
</div>

Analytics Watcher é uma extensão do Google Chrome para ajudar na depuração do Universal Analytics. Ele irá registrar todos os acessos enviados aos servidores do Google, para que você possa verificar facilmente quais parâmetros estão sendo enviados, juntamente com seus valores, em um formato amigável. Além disso, fornece uma visualização fácil de quais ocorrências foram definidas incorretamente, com parâmetros ausentes ou incorretos.

Contém também um módulo conjunto com o Penguin DataLayer, realizando um processo de validação da camada de dados (DataLayer) através da inserção de um modelo de dados (schema json).


# Conteúdo

- Instalação
- Como Utilizar
  - Módulo de Requisições do Google Analytics
  - Módulo de Validação da Camada de Dados
  - JSON Schema
    - Tipos Suportados
    - Regras de validação
    - Estrutura do JSON Schema


# Instalação

## Versão em Produção

A versão em produção já está disponível na loja de extensões do Google Chrome, busque pelo nome Roger Watcher ou [acesse o link da loja por aqui](https://chrome.google.com/webstore/detail/roger-watcher/impckkpjcejdmacpmkpegegnpagddajk), instale a versão apresentada e utilize por meio do devtools.

## Versão em desenvolvimento

Realize o download do repositório do github e insira os comandos abaixo para gerar o arquivo utilizado pela extensão do Google Chrome:

```
$ npm install -g grunt-cli
$ npm install
$ grunt
```

Esse comando gerará uma pasta nomeada dist, ela será utilizada para importar a ferramenta ao Google Chrome. Para isso, habilite o modo desenvolvedor do navegador, através da janela de extensões, escolha o carregamento sem compactação e selecione a pasta gerada anteriormente (dist).

Com isso, a extensão estará disponível dentro do painel devtools do navegador.


# Como Utilizar

## Módulo de Requisições do Google Analytics

Para visualizar as requisições do Google Analytics habilite o painel da extensão e realize as interações com o site, a cada hit disparado para o servido do Google Analytics a extensão do Analytics Watcher irá apresentar um bloco, informando quais foram os dados passados e quais parâmetros foram populados.

Utilize o barra de navegação para facilitar a visualização, adicionando filtros conforme o tipo de hit ou através do conteúdo inserido no campo de busca.

## Módulo de Validação da Camada de Dados

O módulo de validação da camada de dados utiliza como core a biblioteca [penguin-datalayer](https://www.npmjs.com/package/@dp6/penguin-datalayer-core) desenvolvida para garantir a qualidade dos dados inseridos dentro da camada de dados do site, monitorando sua estrutura e o valores através de um modelo de dados (schema) inserido previamente na extensão.

Para utilizar a funcionalidade, através da aba Penguin DataLayer faça o upload das informações do schema modelo, informe qual a nomenclatura do objeto que é utilizado como dataLayer no site, a URL da página que será validada e importe o arquivo JSON que será utilizado como modelo. 

A partir da importação, realize as interações com o site para popular a camada de dados e finalize a execução, com isso a aplicação irá apresentar o resultado da validação, informando o status de cada objeto validado.

- - - 

### JSON Schema

O JSON Schema é uma estrutura que permite a **validação** de documentos JSON. Esta estrutura é utilizada no projeto pois permite a declaração dos formatos de dados esperados dentro da camada de dados.

#### Tipos Suportados

Os seguintes tip;;os de dados são suportados:

- String
- Number
- Boolean
- Object
- Array

#### Regras de validação

As seguintes regras para validação são aceitas:

- **Enum (Equals)**: A ser utilizada quando houver a necessidade de validar a **igualdade** entre o valor informado no schema _versus_ o que foi enviado para a camada de dados
- **Pattern (Regex - String)**: É possível criar expressões regulares para validar valores das chaves
- **minItems (Array)**: Valida o número mínimo de itens contidos no array
- **Required**: Quando houver a obrigatoriedade de validar uma determinada chave

#### Estrutura do JSON Schema

A estrutura a seguir é um exemplo de um JSON Schema:

```json
{
  "$schema": "",
  "title": "Schema example",
  "array": {
    "$id": "#/properties/schema",
    "type": "array",
    "items": [
      {
        "type": "object",
        "properties": {
          "event": {
            "type": "string",
            "enum": ["teste"]
          },
          "key1": {
            "type": "object",
            "properties": {
              "key1_sub1": {
                "type": "number",
                "enum": [10]
              },
              "key1_sub2": {
                "type": "string",
                "pattern": "teste|test|.*"
              },
              "key1_sub3": {
                "type": "string",
                "enum": ["producao"]
              },
              "key1_sub4": {
                "type": "boolean",
                "enum": "desktop|mobile|msite"
              }
            },
            "required": ["key1_sub1", "key1_sub2", "key1_sub3", "key1_sub4"]
          }
        },
        "required": ["event"]
      }
    ]
  }
}
```


# Como contribuir

Pull requests são bem-vindos! Nós vamos adorar ajuda para evoluir esse modulo. Sinta-se livre para navegar por _open issues_ buscando por algo que possa fazer. Caso tenha uma nova _feature_ ou _bug_, por favor abra uma nova _issue_ para ser acompanhada pelo nosso time.

## Requisitos obrigatórios

Só serão aceito as contribuições que estiverem seguindo os seguintes requisitos:

- [Padrão de commit](https://www.conventionalcommits.org/en/v1.0.0/)

## Suporte:

**DP6 Koopa-troopa Team**

_e-mail: <koopas@dp6.com.br>_

<img src="https://raw.githubusercontent.com/DP6/templates-centro-de-inovacoes/main/public/images/koopa.png" height="100" />