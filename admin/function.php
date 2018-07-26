<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "eshop";
header("Content-Type: text/html; charset=UTF-8");
function connect(){
    $conn = mysqli_connect("mysql91.1gb.ru", "gb_x_tehn032d", "7844a6dfqwr", "gb_x_tehn032d");
	mysqli_set_charset($conn, 'utf8');
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    return $conn;
}

function init(){
    //вывожу список товаров
    $conn = connect();
	// mysqli_set_charset($conn, 'utf8');
    $sql = "SELECT id, name FROM goods";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function catinit(){
    //вывожу список товаров
    $conn = connect();
	// mysqli_set_charset($conn, 'utf8');
    $sql = "SELECT id, category FROM category";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function catchange(){
	    //вывожу список товаров
    $conn = connect();
	$id = $_POST['id'];
	// mysqli_set_charset($conn, 'utf8');
    $sql = "SELECT * FROM goods WHERE ord='$id'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function goodopen(){
	//вывожу список товаров
    $conn = connect();
	$id = $_POST['id'];
	// mysqli_set_charset($conn, 'utf8');
    $sql = "SELECT * FROM goods WHERE id='$id'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_assoc($result); 
        echo json_encode($row);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function selectonegoods(){
	$conn = connect();
	$id = $_POST['gid'];
	// mysqli_set_charset($conn, 'utf8');
    $sql = "SELECT * FROM goods WHERE id = '$id'";
    $result = mysqli_query($conn, $sql);
	
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function updategoods(){
	$conn = connect();
	// mysqli_set_charset($conn, 'utf8');
	$id=$_POST['id'];
	$name=$_POST['gname'];
	$cost=$_POST['gcost'];
	$descr=$_POST['gdescr'];
	$order=$_POST['gorder'];
	$img=$_POST['gimg'];
	
	$sql = "UPDATE goods SET name='$name', cost='$cost', description='$descr', ord='$order', img='$img' WHERE id='$id' ";

	if (mysqli_query($conn, $sql)) {
		echo "1";
	} else {
		echo "Error updating record: " . mysqli_error($conn);
	}
	mysqli_close($conn);
	writeJSON();
}

function newgoods(){
	$conn = connect();
	// mysqli_set_charset($conn, 'utf8');
	$name=$_POST['gname'];
	$cost=$_POST['gcost'];
	$descr=$_POST['gdescr'];
	$order=$_POST['gorder'];
	$img=$_POST['gimg'];
	
	$sql = "INSERT INTO goods (name, cost, description, ord, img) VALUES ('$name', '$cost', '$descr', '$order', '$img')";

	if (mysqli_query($conn, $sql)) {
		echo "1";
	} else {
		echo "Error: " . $sql . "<br>" . mysqli_error($conn);
	}
	
	mysqli_close($conn);
	writeJSON();
}

function loadgoods() {
	$conn = connect();
	// mysqli_set_charset($conn, 'utf8');
    $sql = "SELECT * FROM goods";
	$result = mysqli_query($conn, $sql);
	if (mysqli_num_rows($result) > 0) {
        $out = array();
        while($row = mysqli_fetch_assoc($result)) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function cartadding() {
	$conn = connect();
	$id=$_POST['id'];
	$sql = "SELECT * FROM goods WHERE id = '$id'";
	$result = mysqli_query($conn, $sql);
	
	if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function writingcart(){
	$conn = connect();
	$id=$_POST['id'];
	$sql = "SELECT * FROM goods WHERE id = '$id'";
	$result = mysqli_query($conn, $sql);
	
	if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo "0";
    }
    mysqli_close($conn);
}

function writeJSON() {
	$conn = connect();
	$sql = "SELECT * FROM goods";
	$result = mysqli_query($conn, $sql);
	
		if (mysqli_num_rows($result)>0) {
			$out = array();
			while($row = mysqli_fetch_assoc($result)) {
				$out[$row["id"]] = $row;
			}
			$a = file_put_contents('../goods.json', json_encode($out));
			echo 'write'.$a;
		} else {
			echo "0";
		}
		mysqli_close($conn);
}









