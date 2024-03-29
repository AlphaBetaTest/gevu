<?php
require_once 'codes.php';

// Sélectionne la requête que l'on veut
$query = 'SELECT a.id_lieu, a.ref, adresse, lat, lng, kml
FROM gevu_antennes a
INNER JOIN gevu_geos g ON g.id_lieu = a.id_lieu
WHERE kml !=  '';';
	//AND a.id_lieu = '.$_GET['idLieu']';';
$result = mysql_query($query);
if (!$result) 
{
  die('Invalid query: ' . mysql_error());
}

//mysql_query("SELECT id_lieu, lat, lng, adresse, kml FROM gevu_geos WHERE id_lieu = 3 AND id_geo = 2", $connection);

// Création document
$dom = new DOMDocument('1.0', 'UTF-8');

// Créer l'élément KML et l'ajoute à la racine du document
$nodeKML = $dom->createElementNS('http://earth.google.com/kml/2.1', 'kml');
$dom->appendChild($nodeKML);

// Crée un élément du document KML et l'ajouter à l'élément KML.
$nodeDoc = $dom->createElement('Document');
$nodeKML->appendChild($nodeDoc);
 
// Parcourt les résultats de MySQL, créer un repère pour chaque ligne.
while ($row = @mysql_fetch_assoc($result))
{
  	//Crée un style  et l'ajouter au document.
	$nodeS = getKMLStyle($dom, $row);
	$nodeDoc->appendChild($nodeS);
	/*
	$nodeMS = getMapStyle($dom, $row);
	$nodeDoc->appendChild($nodeMS);
	*/
	// Crée un repère Placemark et l'ajouter au document.
	$nodeP = getKMLPlacemark($dom, $row);
	$nodeDoc->appendChild($nodeP);
}	


$kmlOutput = $dom->saveXML();
header('Content-type: application/vnd.google-earth.kml+xml'); //mon Php a comme header un content-type. Ce qu'on génère comme xml est du kml.
echo $kmlOutput;


function getKMLStyle($dom, $row){
	$styleNode = $dom->createElement('Style');
	//$nodeStyleUrl = $dom->createElement('styleUrl', '#' . $row['type'] . 'COLOR[].value');	
	$styleNode->setAttribute('id', 's_' . $row['id_lieu']);

	
	$LineStyleNode = $dom->createElement('LineStyle');
		$nodeLineColor = $dom->createElement('color', 'ffff0000');
	$LineStyleNode->appendChild($nodeLineColor);
	$PolyStyleNode = $dom->createElement('PolyStyle');
		$nodePolyColor = $dom->createElement('color', 'ff0000ff');	
	$PolyStyleNode->appendChild($nodePolyColor);	

	$styleNode->appendChild($LineStyleNode);
	$styleNode->appendChild($PolyStyleNode);

	return $styleNode;
}
	

//Créer balise style de carte	
function getMapStyle($dom, $row){
	$StyleMapnode = $dom->createElement('StyleMap');
	//$nodeStyleUrl = $dom->createElement('styleUrl', '#' . $row['type'] . 'COLOR[].value');	
	$StyleMapnode->setAttribute('id', 'm_' . $row['id_lieu']);

	$nodePair = $dom->createElement('pair');
		$key = $dom->createElement('key', 'normal');
		//$nodeStyleUrl = $dom->createElement('styleUrl', '#' . $row['type'] . 'COLOR[].value');	
		$styleUrl = $dom->createElement('styleUrl', '#'.'s_'.$row['id_lieu']);
	$nodePair->appendChild($styleUrl);
	$nodePair->appendChild($key);
	$StyleMapnode->appendChild($nodePair);
	
	return $StyleMapnode;
}

function getKMLPlacemark($dom, $row){

	// Créer des coordonnées en donnant latitude et longitude
	if (false){
		//charge le kml dans un objet xml
		$xml = simplexml_load_string($row['kml']);
		//récupère les coordonnées de la surface
		$result = $xml->xpath('//coordinates');
		$coorStr = $result[0]."";
	}else{
		$coorStr = $row['lng'].','.$row['lat'].',0 '
				.($row['lng']-0.00027169).','.($row['lat']+0.000486).',0 '
				.($row['lng']-0.00056495).','.($row['lat']-0.000054).',0 '
				.$row['lng'].','.$row['lat'].',0 ';
		//$coorStr = '0.1105855171821202,49.52564189740646,0 0.1103138214001675,49.52612762237801,0 0.1100205604428695,49.52558762241633,0 0.1105855171821202,49.52564189740646,0'
	}
	
	
	$nodePlace = $dom->createElement('Placemark');
	// Crée un attribut id et attribuez-lui la valeur de la colonne id.
	$nodePlace->setAttribute('id_lieu', 'placemark' . $row['id_lieu']);
	// Créer nom, éléments de description, attributs, et adresse
	$nodeName = $dom->createElement('name',htmlentities('Antenne '.$row['ref']));
	$nodePlace->appendChild($nodeName);

	$nodeDesc = $dom->createElement('description', $row['adresse']);
	$nodePlace->appendChild($nodeDesc);

	$nodeStyleUrl = $dom->createElement('styleUrl', '#'.'s_'.$row['id_lieu']);
	//$nodeStyleUrl = $dom->createElement('styleUrl', '#' . $row['type'] . 'COLOR[].value');
	$nodePlace->appendChild($nodeStyleUrl);

	$nodePoly = $dom->createElement('Polygon');
		$nodeTessa = $dom->createElement('tessellate', '1');
		$nodeOuter = $dom->createElement('outerBoundaryIs');
			$nodeLineRing = $dom->createElement('LinearRing');
				$nodeCoor = $dom->createElement('coordinates', $coorStr);
				$moyAge = $dom->createElement('moyAge', $StyleCarte);
			$nodeLineRing->appendChild($nodeCoor);
		$nodeOuter->appendChild($nodeLineRing);
	$nodePoly->appendChild($nodeOuter);
	$nodePoly->appendChild($nodeTessa);

	$nodePlace->appendChild($nodePoly);

	return $nodePlace;
}

//Création échelle couleur
/*header(
		var nb = json.children.length
		for(var i=0;i<nb;i++){
			var item = json.children[i];
			Logements.push({location: new google.maps.LatLng(item.lat, item.lng), weight: item.valeur});
		}
)*/

?>