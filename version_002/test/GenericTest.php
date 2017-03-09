<?php

    require_once ('dao/TestDAO.class.php');
    require_once ('dao/TestDAO2.class.php');
    require_once ('factory/TestFactory.class.php');
    require_once ('model/TestObject.php');
    require_once ('model/Object.php');
    $dao = new TestDAO();
    $dao2 = new TestDAO2();
    $factory = new TestFactory();
    $model = new TestObject();
    $model->city_date = date('Y-m-d H:i:s', time());
    $model->city_id = 1;
    $model->city_name = 'Antwerp';
    echo '<pre>';
    //$test = $dao->getAll();
    //$test = $dao->getById(76, 'nid');
    //$test = $dao->getByPrimaryKey(array(66,68), array('nid','vid'));
    //$test = $dao->updateRecordById($dao->getById(1, 'poi_id'), 1, 'poi_id');
    //$test = $dao->updateRecordByPrimaryKey($dao->getById(1, 'poi_id'), array(1,100), array('poi_id','nid'));
    //$test = $factory->toObject($dao->getById(1, 'city_id'), new TestObject());
    //$dao->insertRecord($model);
    $test = $factory->toArray($dao->getAll());
    print_r($test);
    echo '</pre>';
?>
