<?php
  
  if(!isset($_GET['script'])) {
      echo json_encode(array("status"=>"error","message"=>"Nom du script non spécifié"));
      exit(1);
  }
  
  $script = $_GET['script'];
  $logPath = dirname(__FILE__).DIRECTORY_SEPARATOR."temp".DIRECTORY_SEPARATOR.uniqid();
  
  $commande = dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR."scripts".DIRECTORY_SEPARATOR.$script." > ".$logPath." 2>&1";
  pclose(popen($commande, "r"));
 
  echo json_encode(array("status"=>"ok","commande"=>$commande,"logPath"=>$logPath));
  
?>