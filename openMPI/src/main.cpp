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
const int MAXBYTES=8*1920*1920;
uchar buffer[MAXBYTES];

int main(int argc, char *argv[]) {

    if (argc < 2) {
        cout << "Parametros no validos" << endl;
        return 0;
    }
    int rank;
    int size;
    ostringstream s;

    // Initializes the MPI execution environment
    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);


    string imgPath = argv[1];
    Mat img = imread(imgPath, 1);
    if (!img.data || img.empty()) {
        cout << "No se pudo leer la imagen" << endl;
        return -1;
    }
    int sliceLength = img.cols/(size-1);

    if (rank == 0) {
        int idx = 1;

        for (int c=0;c < img.cols; c+= sliceLength) {
            Mat sliceImg = img(Rect(c, 0, sliceLength, img.rows)).clone();
            sendMat(sliceImg, idx);
            idx++;
        }
    }
    else {
        Mat splittedImg = recvMat(0);
        s << "./" << rank << ".jpg";
        cout << s.str() << endl;
        imwrite(s.str(), splittedImg);

    }

    // Terminate MPI execution environment
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