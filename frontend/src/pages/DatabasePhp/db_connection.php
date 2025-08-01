<?php
// db_connection.php
class Database {
    private $host = "localhost";
    private $username = "root";
    private $password = "";
    private $database = "study";
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database);
            
            if ($this->conn->connect_error) {
                throw new Exception("Connection failed: " . $this->conn->connect_error);
            }
        } catch (Exception $e) {
            http_response_code(500);
            die(json_encode([
                "message" => "Database connection failed",
                "error" => $e->getMessage()
            ]));
        }

        return $this->conn;
    }
}
?>