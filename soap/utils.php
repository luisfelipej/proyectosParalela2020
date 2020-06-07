<?php

function insertPostulants($postulants){
  $PDO = new PDO("mysql:host=localhost;dbname=paralela","root","root");
  $QUERY = $PDO->prepare("INSERT INTO Postulants (rut, nem, ranking, math, lang, cienc, hist) VALUES (?,?,?,?,?,?,?)");

  foreach ($postulants as $key => $scores) {
    $decodedLine = explode(";",$scores);
    $QUERY->execute($decodedLine);
  }
}