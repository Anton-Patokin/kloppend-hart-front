<?php
    namespace core\dao;
    class GenericDAO {
        
        public $DB;
        public $table;
        public $cols;
        public $colsString;
        
        protected function init(&$pdo, $tableName, $columns=array()){

			$this->DB = $pdo;
			
            $this->table = $tableName;
            if(!empty($columns)){
                $this->cols = $columns;
            }
            else {                
                require_once (ROOT . 'util/ShowColumnsUtil.class.php');
                $this->cols = \util\ShowColumnsUtil::getColumns ($this->DB, $tableName);
              
            }
            //extract column fields into a string format for easy access
            $this->colsString = implode(',', array_map(function($column){return $column["Field"];}, $this->cols));
        }
        
        //********************************//
        //*** generic select functions ***//
        //********************************//
        protected function getAll(){
           $query = $this->DB->prepare("SELECT $this->colsString FROM $this->table");
           $succes = $query->execute();
           if(!$succes) {
               errorHandler();
               return;
           }
           $result = $query->fetchAll(\PDO::FETCH_ASSOC);
           return $result;
        }
        
        protected function getById($id, $identifier = NULL){
            if(empty($identifier)) $identifier = $this->table . '_id';
            $query = $this->DB->prepare("SELECT $this->colsString FROM $this->table WHERE $identifier = ?");
            $succes = $query->execute(array($id));
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetch(\PDO::FETCH_OBJ);
            return $result;
        }
        
        protected function getByPrimaryKey($values, $identifiers){
            $keyCond = implode(' = ? AND ', $identifiers) . ' = ? ';
            $query = $this->DB->prepare("SELECT $this->colsString FROM $this->table WHERE $keyCond");
            $succes = $query->execute($values);
            if(!$succes) {
               errorHandler();
               return;
            }
            $result = $query->fetch(\PDO::FETCH_OBJ);
            return $result;
        }

        //********************************//
        //*** generic insert functions ***//
        //********************************//
        protected function insertRecord($properties){
            $insertCols = array();
            $insertVals = array();
            $insertVars = array();
            foreach ($properties as $key => $value){
                foreach ($this->cols as $column){
                    if($key === $column['Field'] && $column['Extra'] != 'auto_increment'){
                        $insertCols[] = $column['Field'];
                        $insertVals[] = $value;
                        $insertVars[] = '?';
                    }
                }
            }
            $insertColsString = implode(', ', $insertCols);
            $insertVarsString = implode(',', $insertVars);
            $query = $this->DB->prepare("INSERT INTO $this->table ($insertColsString) VALUES ($insertVarsString)");
 
            $succes = $query->execute($insertVals);
            if(!$succes) {
               errorHandler();
               return;
            }
            return $this->DB->lastInsertId();
        }
        
        protected function insertRecords($array){
            $inserts = array();
            foreach ($array as $object){
                $inserts[] = $this->insertRecord($object);
            }
            return $inserts;
        }
        
        //********************************//
        //*** generic update functions ***//
        //********************************//
        protected function updateRecordById($properties, $id, $identifier = NULL){
            if(empty($identifier)) $identifier = $this->table . '_id';
            $updateVars = array();
            $updateVals = array();
            foreach ($properties as $key => $value){
                foreach ($this->cols as $column){
                    if($key === $column['Field']){
                        $updateVars[] = $column['Field'].' = ?';
                        $updateVals[] = $value;
                    }
                }
            }
            $updateVals[] = $id;
            $updateVarsString = implode(', ', $updateVars);
            $query = $this->DB->prepare("UPDATE $this->table SET $updateVarsString WHERE $identifier = ?");
            $succes = $query->execute($updateVals);
            if(!$succes) {
               errorHandler();
               return;
            }
            return $id;
        }
        
        protected function updateRecordByPrimaryKey($properties, $values, $identifiers){
            $keyCond = implode(' = ? AND ', $identifiers) . ' = ? ';
            $updateVars = array();
            $updateVals = array();
            foreach ($properties as $key => $value){
                foreach ($this->cols as $column){
                    if($key === $column['Field']){
                        $updateVars[] = $column['Field'].' = ?';
                        $updateVals[] = $value;
                    }
                }
            }
            $updateVarsString = implode(', ', $updateVars);
            foreach ($values as $id) {
                $updateVals[] = $id;
            }
            $query = $this->DB->prepare("UPDATE $this->table SET $updateVarsString WHERE $keyCond");
            $succes = $query->execute($updateVals);
            if(!$succes) {
               errorHandler();
            }
        }        

        //********************************//
        //*** generic delete functions ***//
        //********************************//
        protected function deleteById($id, $identifier = NULL){
            if(empty($identifier)) $identifier = $this->table . '_id';
            $query = $this->DB->prepare("DELETE FROM $this->table WHERE $identifier = ?");
            $succes = $query->execute(array($id));
            if(!$succes) {
               errorHandler();
            }
        }
        
        protected function deleteByPrimaryKey($values, $identifiers){
            $keyCond = implode(' = ? AND ', $identifiers) . ' = ? ';
            $query = $this->DB->prepare("DELETE FROM $this->table WHERE $keyCond");
            $succes = $query->execute($values);
            if(!$succes) {
               errorHandler();
            }
        }
        
        //******************************//
        //*** generic error handling ***//
        //******************************//
        protected function errorHandler(){
            //todo: implement error handling
            echo 'error';
        }
		public function __destruct() { // close connection
			unset($this->pdo);
		}
    }

?>
