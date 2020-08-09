// This program shows off the basics of using MPI with C++
// with synchronized output
// By: Nick from CoffeeBeforeArch

#include <mpi.h>
#include <string>
#include <stdio.h>
#include <iostream>
#include <fstream>
#include <opencv2/opencv.hpp>

using namespace std;
using namespace cv;

// TODO: pasar a utils
void sendMat(Mat& m, int dest);
Mat recvMat(int source);
Mat transformImgByOption(int option, Mat m);
void mergeImage(Mat m, Mat & final);

const int MAXBYTES=8*1920*1920;
uchar buffer[MAXBYTES];

int main(int argc, char *argv[]) {
	// Si no tiene los parametros
    if (argc < 2) {
        cout << "Parametros no validos" << endl;
        return 0;
    }
    // Se cargan variables necesarias para MPI
    int rank;
    int size;
    ostringstream s;
	// Obtengo el valor solicitado
    int option = stoi(argv[1]);
	// Proceso dicho valor, si no es valido, termino.
    if (option < 1 || option > 3) {
        cout << "Opcion ingresada no valida" << endl;
        return -1;
    }
    // Una vez validado comenzamos las llamadas MPI
    MPI_Init(&argc, &argv);
    // Obtenemos rango y numero de procesos
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);
	// Obtenemos la ruta de nuestra imagen
    string imgPath = argv[2];
    // Hago lectura del archivo
    Mat img = imread(imgPath, 1);
    // Si no es valido, desplegar y termino.
    if (!img.data || img.empty()) {
        cout << "No se pudo leer la imagen" << endl;
        return -1;
    }
    // Divido la imagen en base a la cantidad de hilos disponibles.
    int sliceLength = img.cols/(size-1);
	// Si soy el hilo 0, repartir el trabajo
    if (rank == 0) {
        Mat finalImg;
        int idx = 1;

        for (int c=0;c < img.cols; c+= sliceLength) {
            Mat sliceImg = img(Rect(c, 0, sliceLength, img.rows)).clone();
            sendMat(sliceImg, idx);
            Mat m = recvMat(idx);
            mergeImage(m, finalImg);
            idx++;
        }
        s << "./final.jpg";
        imwrite(s.str(), finalImg);
    }
    else {
        Mat cuttedImg = recvMat(0);
        Mat finishedImg = transformImgByOption(option, cuttedImg);
        sendMat(finishedImg, 0);

    }

    // Termino de trabajar
    MPI_Finalize();
}

void sendMat(Mat& m, int dest) {
    int rows = m.rows;
    int cols = m.cols;
    int type = m.type();
    int channels = m.channels();
    memcpy(&buffer[0 * sizeof(int)], (uchar*)&rows, sizeof(int));
    memcpy(&buffer[1 * sizeof(int)], (uchar*)&cols, sizeof(int));
    memcpy(&buffer[2 * sizeof(int)], (uchar*)&type, sizeof(int));
    int bytes = m.rows*m.cols*channels;
    if (m.isContinuous()) {
        m = m.clone();
    }
    memcpy(&buffer[3*sizeof(int)], m.data, bytes);
    MPI_Send(&buffer, bytes+3*sizeof(int), MPI_UNSIGNED_CHAR, dest, 0, MPI_COMM_WORLD);
}

Mat recvMat(int source) {
    MPI_Status status;
    int count, rows, cols, type, channels;
    MPI_Recv(&buffer, sizeof(buffer), MPI_UNSIGNED_CHAR, source, 0, MPI_COMM_WORLD, &status);
    MPI_Get_count(&status, MPI_UNSIGNED_CHAR, &count);
    memcpy((uchar*)&rows, &buffer[0 * sizeof(int)], sizeof(int));
    memcpy((uchar*)&cols, &buffer[1 * sizeof(int)], sizeof(int));
    memcpy((uchar*)&type, &buffer[2 * sizeof(int)], sizeof(int));

    return Mat(rows, cols, type, (uchar*)&buffer[3*sizeof(int)]);
}

// Proceso la imagen segun las opciones solicitadas.
Mat transformImgByOption(int option, Mat m) {
	// Creo la imagen final
    Mat finalImg;
    // Se genera el difuminado mediante Gaussian
    if (option == 1) {
        GaussianBlur(m, finalImg, Size(5, 5), 0);
    }
    // Se amplifica la foto en un 33,34%
    if (option == 3) {
        resize(m, finalImg, Size(m.cols*1.334, m.rows*1.334), 0.334, 0.334);
    }
    return finalImg;
}

// Funcion que nos permite combinar las imagenes
void mergeImage(Mat m, Mat & final) {
    if (final.empty()) {
        final = m.clone();
    }
    else {
        hconcat(final, m, final);
    }
}
