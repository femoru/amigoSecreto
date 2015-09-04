<?php 
 
 $fecha = time();
 $personaje = $_REQUEST['personaje'];
 $comentario = $_REQUEST['comentario'];

$jsonString = file_get_contents('../data.json');
$data = json_decode($jsonString);

$arrayName = array('fecha' => $fecha , 'personaje'=>$personaje, 'comentario'=> $comentario);
$data[] = $arrayName;

$newJsonString = json_encode($data);
file_put_contents('../data.json', $newJsonString);

echo $arrayName;

 ?>
