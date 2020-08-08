#include <mpi.h>
#include <stdio.h>
#include <iostream>
#include <opencv4/opencv2/imgproc/imgproc.hpp>
#include <opencv4/opencv2/opencv.hpp>

using namespace std;



Mat scaleImg(Mat src, float scale);


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
      int *send_counts = new int[size];
      int *displacements = new int[size];

      Mat img = imread(imgName, 1);
      if(!img.data) exit(-1);
      int index = 1; 
      int diferents = img.cols / size;
      for(int i = 0; i < img.cols; i+=img.rows){
        Mat imgsplt(Size(diferents, img.rows), img.type()).clone();
        MPI_Scatterv(img.data,send_counts, displacements, MPI_BYTE, NULL, 0, MPI_BYTE, 0, MPI_COMM_WORLD);
        //MPI_Isend(imgsplt.data, diferents, MPI_BYTE, index, 0, MPI_COMM_WOLRD, &send_request);
        delete [] send_counts;
        delete [] displacements;
        index++;
      }
      
      

    } else {
      MPI_Status state;
      size_t total, size_element;
      int sizes[3];
      Mat newImg = scaleImg(imgsplt, 2.0);
      MPI_Recv(sizes, 3, MPI_INT, src, 0, MPI_COMM_WORLD,&state);

    }


    }
    MPI_Finalize();
    return 0;
}


/**
 * solo para recordar las variables, luego modificar
 * @param src imagen de origen
 * @param dst imagen de destino
 * @param fx factor de escala eje horizontal
 * @param fy factor de escala eje vertical
 * @param dsize tamaño de imagen de salida
*/
Mat scaleImg(Mat src, float scale){
  int col = src.cols * scale;
  int row = src.rows * scale;
  Mat dst(row, col, CV8UC3);
  for (int i = 0; i < row; i++){
    for (int j = 0; j < col; j++){
      float fx = ((float)(i) / col) * (source.cols - 1);
      float fy = ((float)(i) / row) * (source.rows - 1);

      dzise = dst.size(round(fx*src.cols).round(fy*src.row));
    }
  }
  return resize(src, dst, dst.size(), 0, 0, interpolation = INTER_LINEAR);
}

