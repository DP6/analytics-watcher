# Analytics Watcher

<div align="center">
  <img src="https://raw.githubusercontent.com/DP6/templates-centro-de-inovacoes/main/public/images/centro_de_inovacao_dp6.png" height="100px" />
</div>

<p align="center">
  <a href="#badge">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
  <a href="https://www.codacy.com/gh/DP6/analytics-watcher/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=DP6/analytics-watcher&amp;utm_campaign=Badge_Grade"><img src="https://app.codacy.com/project/badge/Grade/b336bb63fa374070885b139f3e711dec"/></a>
</p>

Analytics Watcher is a Google Chrome extension developed to help in Universal Analytics and GA4 debugging. The tool records every hit sent to Google Servers, allowing the visualization of its parameters and values through a friendly interface. In addition to that, it provides an easy view of which occurences have been defined incorrectly (either by missing or incorrect parameters).

It also has the Penguin DataLayer module, which performs a DataLayer validation through a given data model (JSON schema).

# Contents

- Installation
- How to use
  - Google Analytics request module
  - Data Layer validation module
  - JSON Schema
    - Supported Data Types
    - Validation rules
    - JSON Schema Structure


# Installation

## Production ready version

The production ready version is available in the Google Chrome extension store under the name [**Analytics Watcher**](https://chrome.google.com/webstore/detail/roger-watcher/impckkpjcejdmacpmkpegegnpagddajk). After installing the extension, it will be available for use via devtools

## Development version

Clone this repo and use the following commands to create the Google Chrome extension file:

```
$ npm install -g grunt-cli
$ npm install
$ grunt
```

The above commands will create a _dist_ folder, which will be used to import the extension in Google Chrome. To do so, enable the Chrome developer mode through the extension window and choose the option **Load Unpacked** and select the dist folder previously created.

After performing these steps, the extension will be available in the devtools panel.

# How to use

## Google Analytics request module

In order to visualize the Google Analytics requests, enable the extension panel and perform a couple interactions with the desired page/website. For each hit sent to Google Analytics servers, the extension will show a block containing which parameters and values were sent.

You can also use the navigation bar for a better data visualization by adding filters to each hit type or through the search field.

## Data Layer validation module

The data layer validation module leverages the library [penguin-datalayer](https://www.npmjs.com/package/@dp6/penguin-datalayer-core), which had its development focused to ensure the quality of the data inside the website data layer, by monitoring its structure and values through a data model (schema) imported to the extension

To use this function click in the **Penguin Datalayer tab**; then click in the **upload icon**; type the data layer object name used on the website and the page URL which is going be validated and import the JSON schema file that will be used as the data model.

After finishing these steps, you can make interactions within the page to send data to the data layer. After performing all interactions needed you can stop its execution, and the module will show the validation results, giving the status of every object that were validated.

- - - 

### JSON Schema

The JSON Schema is a structure that allow the **validation** of JSON documents. This structure is used in the project because it allows the declaration of expected data formats in the data layer.


#### Supported Data Types

The following Data Types are currently supported within this module:

- String
- Number
- Boolean
- Object
- Array

#### Validation Rules

The following validation rules are accepted:

- **Enum (Equals)**: Should be used to validate the **parity** between the schema value _versus_ the value sent to the data layer;
- **Pattern (Regex - String)**: Create regular expressions to validate the values of each key;
- **minItems (Array)**: Validates the minimum itens contained in an array;
- **Required**: Should be used when a given key is required in the data layer

#### JSON Schema Structure

The following structure is a JSON Schema example:

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
            "enum": ["test"]
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
                "enum": ["production"]
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


# How to contribute

Pull requests welcome! We would love some help to evolve this module. Feel free to search for _open issues_. If there's a new _feature_ or _bug_, please open a new _issue_, so our team can follow up.

## Prerequirements

It will only be accepted contributions that follows the below requirements:

- [Padrão de commit](https://www.conventionalcommits.org/en/v1.0.0/)

## Support:

**DP6 Koopa-troopa Team**

_e-mail: <koopas@dp6.com.br>_

<img src="https://raw.githubusercontent.com/DP6/templates-centro-de-inovacoes/main/public/images/koopa.png" height="100" />
