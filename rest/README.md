# Proyecto REST

TODO: descripción del proyecto y tecnologías utilizadas.

### Instalación

El proyecto requiere [Node.js](https://nodejs.org/) v4+ para funcionar.

Configura el entorno de ejecución creando el archivo .env en el root del proyecto

```
NODE_ENV=local
DB=paralela
DBHOST=localhost
DBPASS=root
DBUSER=root
SECRET=paralela2020
```

Instala las dependencias, corre los scripts de inicialización y ejecuta el servidor.

```sh
$ cd rest
$ npm install
$ npm run db:sync
$ npm start
```

### Endpoints

Dillinger is currently extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Nombre        | URL                     | Verbo | Descripción |
| ---------     | ----------------------- | ----- | ----------- |
| careersByName | [localhost:4000/][pldb] | GET   | Consultar los puntajes de postulación para algunas (una o más) carreras en función de ciertos valores que pueden o no pueden estar presente.
| careerByCode  | [localhost:4000/][plgh] | GET   | Consultar los puntajes de postulación para una carrera específica
| topCareers    | [localhost:4000/][plgh] | POST  | Consultar en base a puntajes puntajes, las 10 carreras en las que   mejores opciones se tiene para postular a la Universidad.

### Todos

- Completar README
- Descripción del proyecto
- Completar y mejorar tabla de endpoints

## License

MIT

**Free Software, Hell Yeah!**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[dill]: https://github.com/joemccann/dillinger
[git-repo-url]: https://github.com/joemccann/dillinger.git
[john gruber]: http://daringfireball.net
[df1]: http://daringfireball.net/projects/markdown/
[markdown-it]: https://github.com/markdown-it/markdown-it
[ace editor]: http://ace.ajax.org
[node.js]: http://nodejs.org
[twitter bootstrap]: http://twitter.github.com/bootstrap/
[jquery]: http://jquery.com
[@tjholowaychuk]: http://twitter.com/tjholowaychuk
[express]: http://expressjs.com
[angularjs]: http://angularjs.org
[gulp]: http://gulpjs.com
[pldb]: https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md
[plgh]: https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md
[plgd]: https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md
[plod]: https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md
[plme]: https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md
[plga]: https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md
