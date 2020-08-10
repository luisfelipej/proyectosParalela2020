#include <mpi.h>
#include <string>
#include <stdio.h>
#include <iostream>
#include <fstream>
#include <time.h>
#include <opencv2/opencv.hpp>
#include <opencv4/opencv2/core/core.hpp>

using namespace std;
using namespace cv;

// TODO: pasar a utils
void sendMat(Mat& m, int dest);
Mat recvMat(int source);
Mat transformImgByOption(int option, Mat m);
void mergeImage(Mat m, Mat & final);
string dateTime();

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

    int option = stoi(argv[1]);

    if (option < 1 || option > 3) {
        cout << "Opcion ingresada no valida" << endl;
        return -1;
    }

    // Initializes the MPI execution environment
    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &size);

    string imgPath = argv[2];
    Mat img = imread(imgPath, 1);
    if (!img.data || img.empty()) {
        cout << "No se pudo leer la imagen" << endl;
        return -1;
    }
    int sliceLength = img.cols/(size-1);

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
        s << "operacion_" << option << "_" << dateTime() << ".png";
        imwrite(s.str(), finalImg);
    }
    else {
        Mat cuttedImg = recvMat(0);
        Mat finishedImg = transformImgByOption(option, cuttedImg);
        sendMat(finishedImg, 0);

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

Mat transformImgByOption(int option, Mat m) {
    Mat finalImg;
    if (option == 1) {
        GaussianBlur(m, finalImg, Size(m.cols, m.rows), 0);
    }
    if (option == 2) {
        cvtColor(m, finalImg, COLOR_RGB2GRAY);
    }
    if (option == 3) {
        resize(m, finalImg, Size(m.cols*1.334, m.rows*1.334), 0.334, 0.334);
    }
    return finalImg;
}

void mergeImage(Mat m, Mat & final) {
    if (final.empty()) {
        final = m.clone();
    }
    else {
        hconcat(final, m, final);
    }
}

string dateTime(){
    time_t now = time(0);
    struct tm tstruct;
    char buf[80];
    tstruct = *localtime(&now);
    strftime(buf, sizeof(buf), "%Y%m%d%H%M%S", &tstruct);
    return buf;
}