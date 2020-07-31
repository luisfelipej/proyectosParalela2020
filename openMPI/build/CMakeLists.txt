PROJECT( Images )
cmake_minimum_required(VERSION 2.8)
find_package( OpenCV REQUIRED PATHS "${CMAKE_CURRENT_SOURCE_DIR}/../libs/build_opencv" )
#OpenCV_DIR=/Users/saltala/pipe/paralela/proyectosParalela2020/openMPI/libs/build_opencv
#SET(OpenCV_DIR ${CMAKE_CURRENT_SOURCE_DIR}../libs/build_opencv)
ADD_EXECUTABLE( Images ../src/main.cpp )
SET(CMAKE_C_COMPILER mpicc)
SET(CMAKE_CXX_COMPILER mpicxx)
target_link_libraries( Images mpi ${OpenCV_LIBS} )
