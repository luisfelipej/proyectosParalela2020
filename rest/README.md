# Proyecto REST

Búsqueda de carrearas y postulaciones de la UTEM

### Tecnologías
El proyecto utiliza las siguientes tecnologías para que funcione correctamente:

* [node.js] - eventos I/O para el backend
* [Express] - Framework de NodeJS para creación de servidor REST
* [Sequelize] - ORM para manejo de base de datos
* [MySQL] - Motor de base de datos
* [JWT] - Manejo de autentificación y seguridad de la API

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


| Nombre        | URL                     | Verbo | Descripción | Query Params | Tipo | Body
| ---------     | ----------------------- | ----- | ----------- | -----| ---| ----|
| careersByName | [localhost:3000/careersByName][careersByName] | GET   | Consultar los puntajes de postulación para algunas (una o más) carreras en función de ciertos valores que pueden o no pueden estar presente. | careerNames | string[] | -
| careerByCode  | [localhost:3000/careerByCode][careerByCode] | GET   | Consultar los puntajes de postulación para una carrera específica | code | number | -
| topCareers    | [localhost:3000/topCareers][topCareers] | POST  | Consultar en base a puntajes puntajes, las 10 carreras en las que   mejores opciones se tiene para postular a la Universidad. | - | - | postulant object {}

```
postulantJSON = {
    "nem": number,
    "ranking": number,
    "math": number,
    "lang": number,
    "cienc": number,
    "hist": number
}
```




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
[careersByName]: http://localhost:3000/careersByName
[careerByCode]: http://localhost:3000/careerByCode
[topCareers]: http://localhost:3000/topCareers
[plod]: https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md
[plme]: https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md
[plga]: https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md
[Sequelize]: https://sequelize.org/
[MySQL]: https://www.mysql.com/
[JWT]: https://jwt.io/
