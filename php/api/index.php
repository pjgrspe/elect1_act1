<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    //Get function
    case "GET":
        $sql = "SELECT * FROM studentrecords_tbl";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
        break;
    
    //Add function
    case "POST": 
        $user = json_decode(file_get_contents('php://input'));
    
        // Calculate final grade
        $sql = "INSERT INTO studentrecords_tbl(firstname, lastname, prelim, midterm, finals, final_grade) 
        VALUES(:firstname, :lastname, :prelim, :midterm, :finals, (:prelim + :midterm + :finals) / 3)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':firstname', $user->firstname);
        $stmt->bindParam(':lastname', $user->lastname);
        $stmt->bindParam(':prelim', $user->prelim);
        $stmt->bindParam(':midterm', $user->midterm);
        $stmt->bindParam(':finals', $user->finals);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to record.'];
        }
        echo json_encode($response);
        break;
    
    //Update function
    case "PUT":
        $data = json_decode(file_get_contents('php://input'), true);

        if (!empty($data['users'])) {
        $usersToUpdate = $data['users'];
        $response = ['status' => 1, 'message' => 'Record updated successfully.']; // Initialize $response here
        foreach ($usersToUpdate as $user) {
        $sql = "UPDATE studentrecords_tbl SET firstname = :firstname, lastname = :lastname, prelim = :prelim, midterm = :midterm, finals = :finals, final_grade = (:prelim + :midterm + :finals) / 3 WHERE id = :id";
            $stmt = $conn->prepare($sql);
            
            $stmt->bindParam(':id', $user['id']);
            $stmt->bindParam(':firstname', $user['firstname']);
            $stmt->bindParam(':lastname', $user['lastname']);
            $stmt->bindParam(':prelim', $user['prelim']);
            $stmt->bindParam(':midterm', $user['midterm']);
            $stmt->bindParam(':finals', $user['finals']);

            if (!$stmt->execute()) {
                $response = ['status' => 0, 'message' => 'Failed to update records.'];
                break; // Stop further updates on failure
            }
        }
    } else {
        $response = ['status' => 0, 'message' => 'Invalid or missing user data.'];
    }

    echo json_encode($response);
    break;

    // Delete function
    case "DELETE": 
        $user_id = $_GET['id']; // Assuming the ID is sent as a parameter in the URL

        if (!empty($user_id)) {
            $sql = "DELETE FROM studentrecords_tbl WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $user_id);

            if ($stmt->execute()) {
                $response = ['status' => 1, 'message' => 'Record deleted successfully.'];
            } else {
                $response = ['status' => 0, 'message' => 'Failed to delete.'];
            }
        } else {
            $response = ['status' => 0, 'message' => 'Invalid or missing user ID.'];
        }

        echo json_encode($response);
        break;
    
/*     //Select function
    case "SELECT": 
        $user = json_decode(file_get_contents('php://input'));
    
        $stmt = $conn->prepare($sql);
    
        if ($stmt->execute()) {
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response = ['status' => 1, 'data' => $result];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to execute SELECT statement.'];
        }
        echo json_encode($response);
        break; */
}