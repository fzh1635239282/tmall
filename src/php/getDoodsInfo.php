<?php
    include('db_link.php');

    $ids = $_REQUEST['id'];
    $arr = array();
    $arr = explode(',',$ids);
    $count = count($arr);
    $str = "id='$arr[0]'";
    for($i = 1; $i < $count; $i++) {
        $str = $str." OR id=".$arr[$i];
    }
    $sql = "SELECT * FROM tmall_goods WHERE ".$str;
    $res = $mysqli->query($sql);

    if($res->num_rows >= 1) {
        $ar = array();
        while($row = $res->fetch_assoc()){
            array_push($ar,$row);
        }
        echo json_encode($ar);
    } else {
        echo '{"msg":"获取失败","error":1}';
    }
    
    $mysqli->close();
?>