# Proyecto Manipulación de imagenes

## Descripcion
El proyecto consiste en cortar la imagen que se introduce en tantas columnas como procesadores disponibles haya mediante MPI, donde el procesador padre es el que realiza la tarea de cortar y repartir la imagen hacia los esclavos para que estos la devuelvan al procesador padre para construir la imagen final.

**Nota:** El tratamiento de imagenes codifican y decodifican un objeto Mat de OpenCV (imagen), esta libreria es fundamental para el trabajo de imagenes en este proyecto.
 
## Instalación y Ejecución

Instalar las librerías de openCV para manipulación de imagenes.
En Ubuntu 20.04
```sh
$ sudo apt-get install libopencv-dev
```

Uso de la aplicación
```sh
$ cd build
$ cmake .
$ make
$ mpirun -np 3 Images <operacion> <ruta_imagen>
```
## Ejemplo de Salida

A continuación se presenta la salida de la ejecución del programa, donde tenemos la Difuminacion de la imagen, a partir de la imagen en colores pasar a escala de grises y por ultimo el escalado de la imagen en un 25%, respectivamente
```
mpirun -np 3 Images 1 <ruta_imagen>
mpirun -np 3 Images 2 <ruta_imagen>
mpirun -np 3 Images 3 <ruta_imagen>
```
![Imagen original](https://github.com/luisfelipej/proyectosParalela2020/blob/master/openMPI/img-examples/hombre-feliz.png)
![Difuminado](https://github.com/luisfelipej/proyectosParalela2020/blob/master/openMPI/img-examples/operacion_1_20200812170128.png)
![Escala de grises](https://github.com/luisfelipej/proyectosParalela2020/blob/master/openMPI/img-examples/operacion_2_20200812170137.png)
![Escalado de imagen en un 25%](https://github.com/luisfelipej/proyectosParalela2020/blob/master/openMPI/img-examples/operacion_3_20200812170144.png)

## License

MIT

**Free Software, Hell Yeah!**
