<?php
require_once 'db_connection.php';

header("Access-Control-Allow-Origin: http://localhost:3001");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') exit(0);

$data = json_decode(file_get_contents('php://input'));

try {
    $database = new Database();
    $conn = $database->getConnection();
    
    $stmt = $conn->prepare("UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?");
    $stmt->bind_param("sssi", $data->name, $data->email, $data->phone, $data->id);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "User updated successfully"]);
    } else {
        throw new Exception("Failed to update user");
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["message" => $e->getMessage()]);
}
?>