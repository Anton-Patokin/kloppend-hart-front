<?php
    namespace source\factory;
    require_once (ROOT . 'core/factory/GenericFactory.class.php');  
    require_once (ROOT . 'source/model/Source.class.php');
    require_once (ROOT . 'source/dao/SourceDAO.class.php');
    
    class SourceFactory extends \core\factory\GenericFactory{
        
        public function __construct() {
            parent::__construct(new \source\model\Source());
            $this->dao = new \source\dao\SourceDAO();
        }
        
        public function createSourceByName($name){
            return $this->toObject($this->dao->getByName($name));
        }
    }
?>
