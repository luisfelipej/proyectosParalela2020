# Proyecto Soap
Web service PHP

## Setup
Como requisito se necesita un servidor apache. Se recomiendo el uso de alguna herramienta que gestione facilmente esto como MAMP, XAMPP, LAMPP u otros. Además, para interactuar con el servicio se debe contar con soapUI.

- Clonar el repositorio en ```[MAMP/XAMPP/LAMPP] > htdocs```
- Descargar [Composer](https://getcomposer.org/download/) y situar composer.phar en el directorio del proyecto
- Instalar dependencias con ```php composer.phar install```
- Cargar la estructura de la base de datos y las carreras (correr script ```DB.sql```)
- Iniciar los servicios Apache y Mysql
- Comprobar el estado del web service en http://localhost/proyectosParalela2020/soap

## Testing
- Iniciar soapUI
- Cargar WSDL disponible en http://localhost/proyectosParalela2020/soap/index.php?wsdl
- Request Postulation
