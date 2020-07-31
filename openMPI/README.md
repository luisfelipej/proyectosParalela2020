# Proyecto Manipulación de imagenes

## Instalación

Instalar las librerías de openCV para manipulación de imagenes
```sh
$ mkdir libs
$ cd libs
$ git clone https://github.com/opencv/opencv.git
$ mkdir buid_opencv
$ cd build_opencv
$ cmake ../opencv
$ make
$ cd ../../
```

Uso de la aplicación
```sh
$ cd build
$ cmake .
$ make
$ mpirun ./Images <operacion> <ruta_imagen>
```