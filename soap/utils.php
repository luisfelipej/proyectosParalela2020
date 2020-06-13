<?php
require 'vendor/autoload.php';
require __DIR__ . "/vendor/autoload.php";
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

function managePostulants($postulants){
  $PDO = new PDO("mysql:host=localhost;dbname=paralela","root","root");
  $getCareersQuery = $PDO->prepare("SELECT id, lang, math, ciencHist, avgMathLang, ranking, nem, code, name, vacancies FROM Careers");
  $getCareersQuery->execute();
  $careers = $getCareersQuery->fetchAll();
  insertPostulants($postulants, $PDO, $careers);

  printExcel($careers, $PDO);
  $file = file_get_contents('rep.xlsx');
  return base64_encode($file);
}

function printExcel($careers, $PDO){
  try {
    $getPostulantsByCareerQuery = $PDO->prepare("SELECT Postulations.postulantId, Postulations.score 
    FROM Postulations INNER JOIN Postulants ON Postulations.postulantId = Postulants.rut
    WHERE Postulations.careerId=:careerId AND Postulants.careerId IS NULL
    ORDER BY score DESC LIMIT :vacancies");
    $spreadsheet = new Spreadsheet();
    $headers = [["Postulante", "Puntaje"]];
    $index = 0;
    foreach($careers as $career){
      $spreadsheet->createSheet();
      $careerTitle = substr($career["name"], 0, 23);
      $worksheet = $spreadsheet->getSheet($index)->setTitle($careerTitle);
      $getPostulantsByCareerQuery->bindParam(':careerId', $career["id"], PDO::PARAM_INT);
      $getPostulantsByCareerQuery->bindParam(':vacancies', $career["vacancies"], PDO::PARAM_INT);
      $getPostulantsByCareerQuery->execute();
      $postulants = $getPostulantsByCareerQuery->fetchAll();
      $body = array_merge($headers, normalizeArray($postulants));
      $worksheet->fromArray($body, NULL, 'A1');
      managePostualtion($postulants, $career["id"], $PDO);
      $index += 1;
    }
    $writer = new Xlsx($spreadsheet);
    $writer->save('postulations.xlsx');
  } catch (\Throwable $th) {
    echo "error";
    print_r($th);
  }
}

function managePostualtion($postulants, $careerId, $PDO){
  $setCareerToPostulantQuery = $PDO->prepare("UPDATE Postulants SET careerId=:careerId WHERE rut=:rut");
  foreach ($postulants as $postulant) {
    $setCareerToPostulantQuery->bindParam(':careerId', $careerId, PDO::PARAM_INT);
    $setCareerToPostulantQuery->bindParam(':rut', $postulant["postulantId"], PDO::PARAM_INT);
    $setCareerToPostulantQuery->execute();
  }
}

function insertPostulants($postulants, $PDO, $careers){
  $insertPostulantQuery = $PDO->prepare("INSERT INTO Postulants (rut, nem, ranking, math, lang, cienc, hist) VALUES (?,?,?,?,?,?,?)");
  foreach ($postulants as $key => $scores) {
    $decodedLine = explode(";",$scores);
    calculatePonderation($decodedLine, $careers, $PDO);
    $insertPostulantQuery->execute($decodedLine);
  }
}

function calculatePonderation($scores, $careers, $PDO) {
  $insertPostulationQuery = $PDO->prepare("INSERT INTO Postulations (postulantId, careerId, score) VALUES (?,?,?)");
  foreach ($careers as $career) {
    $cienc = $career["ciencHist"]/100 * $scores[5]; 
    $hist = $career["ciencHist"]/100 * $scores[6];
    $ciencHist = $cienc > $hist ? $cienc : $hist;
    $ponderation = $career["lang"]/100 * $scores[4] + $career["math"]/100 * $scores[3] + 
      $ciencHist + $career["ranking"]/100 * $score[2] + $career["nem"]/100 * $scores[1];
    $insertPostulationQuery->execute(array(0 => $scores[0], 1 => $career[0], 2 => $ponderation));
  }
}

function normalizeArray($array){
  return array_map("array_unique", $array);
}