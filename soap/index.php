<?php
	include_once('lib/nusoap.php');
	
	/* Configuracion server */
	$sn = "urn:webService";
	$server = new soap_server();
	$server->configureWSDL("webService", $sn);
  $server->schemaTargetNamespace = $sn;

  // Aqui debiese ir algun middleware de auth
  
  // Registro de rutas
  $server->register("postulation", 
    array('fileName' => 'xsd:string', 'mimeType' => 'xsd:string', 'file' => 'xsd:base64Binary'),
    array('filaName' => 'xsd:string', 'mimeType' => 'xsd:string', 'file' => 'xsd:base64Binary'),
    $sn
  );

  // Metodos
  function postulation($fileName, $mimeTypem, $file){
    global $HTTP_SERVER_VARS;
    $decodedFile = base64_decode($file);
    $parsedCsv = str_getcsv($decodedFile);
    return [$fileName, 'testttttting'];
  }
	
	
	$HTTP_RAW_POST_DATA = isset($HTTP_RAW_POST_DATA) ? $HTTP_RAW_POST_DATA : '';
	$server->service(file_get_contents("php://input"));
	?>