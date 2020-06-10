<?php

function insertPostulants($postulants){
  $PDO = new PDO("mysql:host=localhost;dbname=paralela","root","root");
  $insertPostulantQuery = $PDO->prepare("INSERT INTO Postulants (rut, nem, ranking, math, lang, cienc, hist) VALUES (?,?,?,?,?,?,?)");
  $getCareersQuery = $PDO->prepare("SELECT id, lang, math, ciencHist, avgMathLang, ranking, nem FROM Careers");
  $getCareersQuery->execute();
  $careers = $getCareersQuery->fetchAll();

  foreach ($postulants as $key => $scores) {
    $decodedLine = explode(";",$scores);
    calculatePonderation($decodedLine, $careers, $PDO);
    $insertPostulantQuery->execute($decodedLine);
  }
}

function calculatePonderation($scores, $careers, $PDO) {
  $insertPostulationQuery = $PDO->prepare("INSERT INTO Postulations (postulantId, careerId, score) VALUES (?,?,?)");
  foreach ($careers as $career) {
    $cienc = $career[ciencHist]/100 * $scores[5]; 
    $hist = $career[ciencHist]/100 * $scores[6];
    $ciencHist = $cienc > $hist ? $cienc : $hist;
    $ponderation = $career[lang]/100 * $scores[4] + $career[math]/100 * $scores[3] + 
      $ciencHist + $career[ranking]/100 * $score[2] + $career[nem]/100 * $score[1];
    $insertPostulationQuery->execute(array(0 => $scores[0], 1 => $career[0], 2 => $ponderation));
  }
}