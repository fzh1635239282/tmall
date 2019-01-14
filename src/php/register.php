<?php
    include('db_link.php');
    $phone = $_REQUEST['phone'];

    $sql = "SELECT * FROM tmall_user WHERE u_phone='$phone'";
    $res = $mysqli->query($sql);
    if($res->num_rows > 0) {
        die('{"msg":"手机号已经注册","error":1}');
    }
    $uname = $_REQUEST['uname'];
    if(!$uname) die('{"msg":"手机号可以注册","error":0}'); 
    $email = $_REQUEST['email'];
    $pwd = $_REQUEST['pwd'];

    $sql = "INSERT INTO tmall_user(u_name,u_password,u_email,u_phone) VALUES('$uname','$pwd','$email','$phone')";
    $res = $mysqli->query($sql);
    if($res > 0) {
        echo '{"msg":"注册成功","error":0}';
    } else {
        echo '{"msg":"注册失败","error":0}';
    }

    $mysqli->close();
?>