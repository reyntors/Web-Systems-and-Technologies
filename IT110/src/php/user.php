<?php 
	require ('conn.php');
	
	if($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action']=="register"){
		$pdo->beginTransaction();
		try {
			$sql = 'INSERT INTO user(idnumber, firstname, lastname, gender, bday, program, yearlevel) VALUES(:idnumber, :firstname, :lastname, :gender, :bday, :program, :yearlevel)';
			$statement = $pdo->prepare($sql);
			$statement->execute([
				':idnumber' => $_POST['userdata']['idnumber'],
				':firstname' => $_POST['userdata']['firstname'],
				':lastname' => $_POST['userdata']['lastname'],
				':gender' => (int) $_POST['userdata']['gender'],
				':bday' => $_POST['userdata']['bday'],
				':program' => $_POST['userdata']['program'],
				':yearlevel' => (int) $_POST['userdata']['yearlevel'],
			]);

			echo $pdo->lastInsertId();
			$pdo->commit();
		} catch (Exception $e) {
			$pdo->rollback();
		}
	}

	// Update the data of the selected user from the database

	else if($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] == "user_update"){
	        
	$id  = $_POST['userID'];
	$idNumber  = $_POST['userIDnumber'];
	$firstName  = $_POST['userFirstname'];
	$lastName  = $_POST['userLastname'];
	$gender  = $_POST['userGender'];
	$bday  = $_POST['userBday'];
	$program  = $_POST['userProgram'];
	$yearlevel  = $_POST['userYearlevel'];

	$sql = "UPDATE user SET idnumber='$idNumber', firstname='$firstName', lastname='$lastName', gender='$gender', 
	bday='$bday', program='$program', yearlevel='$yearlevel' WHERE id = '".$id."'";
	$statement = $pdo->query($sql);
}   

	else if($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST['action'] == "delete_user"){
	
	$id  = $_POST['user_id'];

	// Delete selected user from the database
	$sql = "DELETE FROM user WHERE id = '".$id."'";
	$statement = $pdo->query($sql);
	
}

	else if($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['action']=="getusers"){
		$sql = "SELECT * FROM user";
		$statement = $pdo->query($sql);
		$users = $statement->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode($users);
	}
 ?>
