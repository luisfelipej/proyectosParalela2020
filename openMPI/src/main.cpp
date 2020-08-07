#include <mpi.h>
#include <stdio.h>
#include <iostream>

using namespace std;

/**
 * @param argc cantidad de argumentos
 * @param argv arreglo de argumentos
 * @return salida exitosa o fallida
*/

int main(int argc, char **argv) {

  if(argc > 2){
    int rank, size;
    char* imgName = argv[1];
  
    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    if(rank == 0){
      Mat img = imread(imgName, 1);
      if(!img.data) exit(-1);
      int index = 1; 
      int diferents = img.cols / size;
      
      Mat imgsplt(Size(diferents, img.rows), img.type()).clone();


    }

    if(rank != 0){
      Mat otherimg = Mat(512,128,CV_8UC3);
      MPI_Irecv(otherimg.data, 128*512*3, MPI_BYTE, 0, 0, MPI_COMM_WORLD, &rec_request);
      MPI_Wait(&rec_request, &status);

      ostringstream salida;
      salida << rank ;
      imwrite(salida.str(), otherimg)
    }


    }
    MPI_Finalize();
    return 0;
}