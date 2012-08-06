<?php
  
  // include 'outils/include.php';
  
  $script = isset($_GET['script']) ? $_GET['script'] : "";
  $logPath = "/c/www/piwigo/bin/ajout/log.txt";
  
  $commande = dirname(dirname(__FILE__)). DIRECTORY_SEPARATOR."scripts". DIRECTORY_SEPARATOR.$script." > ".$logPath." 2>&1";
  //pclose(popen($commande, "r"));
 
  echo $commande;
  
?>