<?php
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Include database connection
require_once 'db_connection.php';

try {
    // Get database connection
    $database = new Database();
    $conn = $database->getConnection();

    // Get and validate input
    $input = json_decode(file_get_contents('php://input'));

    if (!$input || !isset($input->name, $input->email, $input->phone)) {
        throw new Exception("Invalid input data", 400);
    }

    // Prepare and execute statement
    $stmt = $conn->prepare("INSERT INTO users (name, email, phone) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $input->name, $input->email, $input->phone);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(["message" => "Submission successful"]);
    } else {
        throw new Exception("Database error", 500);
    }
} catch (Exception $e) {
    http_response_code($e->getCode() ?: 500);
    echo json_encode(["message" => $e->getMessage()]);
} finally {
    if (isset($stmt)) $stmt->close();
    if (isset($conn)) $conn->close();
}








/*
header("Access-Control-Allow-Origin: http://localhost:3001");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database connection - UPDATE THESE VALUES!
$db_host = "localhost";
$db_user = "root";      // Default XAMPP username
$db_pass = "";          // Default XAMPP password
$db_name = "study"; // Your database name

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode([
        "message" => "Database connection failed",
        "error" => $conn->connect_error
    ]));
}

// Get and validate input
$input = json_decode(file_get_contents('php://input'));

if (!$input || !isset($input->name, $input->email, $input->phone)) {
    http_response_code(400);
    die(json_encode(["message" => "Invalid input data"]));
}

// Prepare and execute statement
$stmt = $conn->prepare("INSERT INTO users (name, email, phone) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $input->name, $input->email, $input->phone);

if ($stmt->execute()) {
    http_response_code(201);
    echo json_encode(["message" => "Submission successful"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Database error"]);
}

$stmt->close();
$conn->close();



*/
?>

