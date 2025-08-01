<?php
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Include database connection
require_once 'db_connection.php';

try {
    // Get database connection
    $database = new Database();
    $conn = $database->getConnection();

    // Prepare and execute query
    $stmt = $conn->prepare("SELECT id, name, phone, email FROM users");
    $stmt->execute();
    
    // Get results
    $result = $stmt->get_result();
    $users = array();
    
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    // Return JSON response
    http_response_code(200);
    echo json_encode($users);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "message" => "Error retrieving users",
        "error" => $e->getMessage()
    ]);
} finally {
    if (isset($stmt)) $stmt->close();
    if (isset($conn)) $conn->close();
}
?>