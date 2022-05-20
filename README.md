# Práctica 12:  API Node/Express de gestión de información musical
## Autores: Joel Francisco Escobar Socas & Micaela Lucia Mungay Juncal
## Asignatura: Desarrollo de Sistemas Informáticos.
## Centro: Universidad de la Laguna.
### 2021/2022


## Introducción:

Se pretente implementar una API REST sobre un sistema que permite almacenar y manejar diversas colecciones de canciones, artistas y playlist. Para ello, se utilizarán para las operaciones CRUD(Create, Read, Update y Delete) que proporciona Node/Express y almacenar toda esta información en una base de datos implementada a través de MongoDB y Mongoose.

Para la ejecución del código se recomienda la utilización de la herramienta de ThunderClient que permite mandar diversas peticiones a nuestra base de datos desplegada con Heroku y MongoDB Atlas. Aunque para mayor comodidad se exportará un fichero con una serie de operaciones básicas la cual se puede importar dentro de ThunderClient para su comprobación.


> Para acceder al informe de la práctica 12 piche [aquí](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-m/blob/main/docs/index.md)

> Para acceder al informe a través de Github Pages, pinche [aquí](https://ull-esit-inf-dsi-2122.github.io/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-m/#id23) o acceda a través del siguiente enlace:https://ull-esit-inf-dsi-2122.github.io/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-m/#id23

> Si desea acceder a la documentación de Typedoc puede acceder a través de la extensión Live Server ejecutando el siguiente.

> [Guión de la Práctica 12](https://ull-esit-inf-dsi-2122.github.io/prct12-music-api/) 

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-m/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-m/actions/workflows/node.js.yml)
<space><space>

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-m/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-m?branch=main)
<space><space>

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct12-music-api-grupo-m&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct12-music-api-grupo-m)
<space><space>
---
# ull-esit-inf-dsi-21-22-prct12-music-api-grupo-m
ull-esit-inf-dsi-21-22-prct12-music-api-grupo-m created by GitHub Classroom

---
