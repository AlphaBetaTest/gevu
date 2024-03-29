<?php
/**
 * Ce fichier contient la classe Gevu_solutionsxproduits.
 *

 * @copyright  2010 Samuel Szoniecky
 * @license    "New" BSD License
*/


/**
 * Classe ORM qui représente la table 'gevu_solutionsxproduits'.
 *

 * @copyright  2010 Samuel Szoniecky
 * @license    "New" BSD License
 */
class Models_DbTable_Gevu_solutionsxproduits extends Zend_Db_Table_Abstract
{
    
    /*
     * Nom de la table.
     */
    protected $_name = 'gevu_solutionsxproduits';
    
    /*
     * Clef primaire de la table.
     */
    protected $_primary = 'id_solution';

    
    /**
     * Vérifie si une entrée Gevu_solutionsxproduits existe.
     *
     * @param array $data
     *
     * @return integer
     */
    public function existe($data)
    {
		$select = $this->select();
		$select->from($this, array('id_solution'));
		foreach($data as $k=>$v){
			$select->where($k.' = ?', $v);
		}
	    $rows = $this->fetchAll($select);        
	    if($rows->count()>0)$id=$rows[0]->id_solution; else $id=false;
        return $id;
    } 
        
    /**
     * Ajoute une entrée Gevu_solutionsxproduits.
     *
     * @param array $data
     * @param boolean $existe
     *  
     * @return integer
     */
    public function ajouter($idSolution, $idProduit, $existe=true)
    {
    	$id=false;
    	$data = array("id_solution"=>$idSolution,"id_produit"=>$idProduit);
    	if($existe)$id = $this->existe($data);
    	if(!$id){
    	 	$id = $this->insert($data);
    	}
    	return $id;
    } 
           
    /**
     * Recherche une entrée Gevu_solutionsxproduits avec la clef primaire spécifiée
     * et modifie cette entrée avec les nouvelles données.
     *
     * @param integer $id
     * @param array $data
     *
     * @return void
     */
    public function edit($id, $data)
    {        
        $this->update($data, 'gevu_solutionsxproduits.id_solution = ' . $id);
    }
    
    /**
     * Recherche une entrée Gevu_solutionsxproduits avec la clef primaire spécifiée
     * et supprime cette entrée.
     *
     * @param integer $id
     *
     * @return void
     */
    public function remove($idSolution, $idProduit=null)
    {
    	if($idProduit == null){
       		$this->delete('gevu_solutionsxproduits.id_solution = ' . $idSolution);
    	}else{
   			$this->delete('gevu_solutionsxproduits.id_solution = ' . $idSolution.' AND gevu_solutionsxproduits.id_produit = ' . $idProduit);
       	}
    }
    
    /**
     * Récupère toutes les entrées Gevu_solutionsxproduits avec certains critères
     * de tri, intervalles
     */
    public function getAll($order=null, $limit=0, $from=0)
    {
        $query = $this->select()
                    ->from( array("gevu_solutionsxproduits" => "gevu_solutionsxproduits") );
                    
        if($order != null)
        {
            $query->order($order);
        }

        if($limit != 0)
        {
            $query->limit($limit, $from);
        }

        return $this->fetchAll($query)->toArray();
    }

    /**
     * Récupère les spécifications des colonnes Gevu_solutionsxproduits 
     */
    public function getCols(){

    	$arr = array("cols"=>array(
    	   	array("titre"=>"id_solution","champ"=>"id_solution","visible"=>true),
    	array("titre"=>"id_produit","champ"=>"id_produit","visible"=>true),
        	
    		));    	
    	return $arr;
		
    }     
    
    /*
     * Recherche une entrée Gevu_solutionsxproduits avec la valeur spécifiée
     * et retourne cette entrée.
     *
     * @param int $id_solution
     */
    public function findByIdSolution($id_solution)
    {
        $query = $this->select()
        			->setIntegrityCheck(false) //pour pouvoir sélectionner des colonnes dans une autre table
                    ->from( array("g" => "gevu_solutionsxproduits"),
                          array('id_solution', 'id_produit') )                           
                   ->joinInner(array('l' => 'gevu_produits'),
                          'g.id_produit = l.id_produit',array('ref'))
                   ->where( "g.id_solution = " . $id_solution );
        return $this->fetchAll($query)->toArray(); 
    }
    /*
     * Recherche une entrée Gevu_solutionsxproduits avec la valeur spécifiée
     * et retourne cette entrée.
     *
     * @param int $id_produit
     */
    public function findByIdProduit($id_produit)
    {
        $query = $this->select()
        			->setIntegrityCheck(false) //pour pouvoir sélectionner des colonnes dans une autre table
                    ->from( array("g" => "gevu_solutionsxproduits"),
                          array('id_solution', 'id_produit') )                           
                   ->joinInner(array('l' => 'gevu_solutions'),
                          'g.id_solution = l.id_solution',array('ref','lib'))
                   ->where( "g.id_produit = " . $id_produit );
        return $this->fetchAll($query)->toArray(); 
    }
    
    
}
