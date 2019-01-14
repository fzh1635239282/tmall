<?php
    include('db_link.php');
    $user = $_REQUEST['user'];
    $pwd = $_REQUEST['pwd'];

    $sql = "SELECT * FROM tmall_user WHERE u_password='$pwd' AND (u_name='$user' OR u_phone='$user' OR u_email='$user')";
    $res = $mysqli->query($sql);

    if($res->num_rows > 0) {
        $row = $res->fetch_assoc();
        echo json_encode($row);
    } else {
        echo '{"msg":"用户名或密码错误","error":1}';
    }

    $mysqli->close();
?>