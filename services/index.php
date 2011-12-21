<?php
require_once( "../param/ParamAppli.php" );


try {
	
	/*
	$idBase = "gevu_new_alceane";
	$idExi = 1;
	$d = new GEVU_Diagnostique();
	$d->setChoix($idExi, 212, "il pleut encore", array(array("id_critere"=>40,"id_reponse"=>1, "id_type_controle"=>2),array("id_critere"=>27,"id_reponse"=>1, "id_type_controle"=>2)), $idBase);
	$d->getDiagComplet(218,$idBase,48);
	$d->getScenarioComplet(9);
	$arr = $d->getDiagListe(array("idLieu"=>1,"handi"=>"moteur","niv"=>2),$idBase);
	$arr = $d->getNodeRelatedData(212,$idExi,$idBase);
	$arr = $d->calculDiagForLieu(1,-1,$idBase);
	$d->findLieu(212,"",$idBase);
	$xml = $d->getXmlNode(212,$idBase);
	$db = $d->getDb($idBase);
	$o = new Models_DbTable_Gevu_diagnostics($db);
	$o->getAllDesc(13);
	$o = new Models_DbTable_Gevu_observations();
	$arr = $o->ajouter(array("num_marker"=>"2121","lib"=>"test","id_diag"=>-100),1,$idBase);
	$o = new Models_DbTable_Gevu_problemes();
	$arr = $o->findDocs(329,$idBase);
	$s = new Models_DbTable_Gevu_scenario();
	$s->ajouter(array("lib"=>"test sam"));
	*/
		
$server = new Zend_Amf_Server();

$server->addDirectory(APPLICATION_PATH);
$server->addDirectory(dirname(__FILE__) .'/../library/php/');

/*pour l'authentification*/
$server->setClassMap('LoginVO','AUTH_LoginVO');	

$server->setProduction(false);

$response = $server->handle();
//var_dump($server->getFunctions());   		

}catch (Zend_Exception $e) {
	echo "Récupère exception: " . get_class($e) . "\n";
    echo "Message: " . $e->getMessage() . "\n";
}
echo $response;

