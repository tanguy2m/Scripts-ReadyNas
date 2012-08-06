<?php

  include 'outils/include.php';
  
  // Récupération de la dernière version du client (timestamp du fichier)
  $lastmodif = isset($_GET['timestamp']) ? $_GET['timestamp'] : 0;

  while(!file_exists($logPath)) // Pour éviter les problèmes avec un fichier pas encore créé
    usleep(500000);
  $currentmodif = filemtime($logPath); // Récupération de la dernière modif du fichier

  $iterations = 0; 
  while ( ($currentmodif <= $lastmodif)&& ($iterations <= 60) )// Pour éviter la boucle infinie, itérations de 60*0,5= 30s
  {
    usleep(500000); // attente 500ms pour décharger le CPU
    clearstatcache(); // Les I/O sont mis en cache, il faut explicitement vider le cache dans notre cas
    $currentmodif = filemtime($logPath); // Récupération de la dernière modif du fichier
    $iterations++;
  }

  // Lecture du fichier, retour dans un tableau
  $lines = file($logPath);
  $log = "";
  $finished = "false";

  // Récupération de la dernière ligne de log lue  
  $lastLine = isset($_GET['line']) ? $_GET['line'] : 0;
  
  // Affiche toutes les lignes du tableau comme code HTML, avec les numéros de ligne
  for ($i = $lastLine; $i < count($lines); $i++) { //foreach ($lines as $line_num => $line) { // $line_num est le numéro de la ligne dans le fichier
    
    $log .= "<div>" . htmlspecialchars(trim($lines[$i])) . "</div>"; // trim() permet de supprimer le \n à la fin
    
  }
  
  if(strpos($lines[count($lines)-1],"FIN")!== false) // Si la dernière ligne est "FIN"
  {
    unlink($logPath);
    $finished = "true";
  }
  
  $lastLine = count($lines);
  
  // Envoi d'un tableau Json avec le contenu du fichier en htmlet la date de modif associée
  $response = array();
  $response['log'] = $log;
  $response['timestamp'] = $currentmodif;
  $response['line'] = $lastLine;
  $response['finished'] = $finished;
  echo json_encode($response);
  flush();

?>