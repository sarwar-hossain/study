const questions = [
  // DBMS Questions (10)
  {
    questionId: 1,
    topic: "DBMS",
    question: "What is the full form of DBMS?",
    option1: "Data Backup Management System",
    option2: "Database Management System", 
    option3: "Data Binary Management System",
    option4: "Digital Base Management System",
    answer: "Database Management System",
  },
  {
    questionId: 2,
    topic: "DBMS",
    question: "Which of the following is not a type of database model?",
    option1: "Relational",
    option2: "Hierarchical",
    option3: "Network",
    option4: "Linear",
    answer: "Linear",
  },
  {
    questionId: 3,
    topic: "DBMS",
    question: "What is the primary key in a database table?",
    option1: "A key that can have null values",
    option2: "A key that uniquely identifies each record",
    option3: "A foreign key from another table",
    option4: "A key used for encryption",
    answer: "A key that uniquely identifies each record",
  },
  {
    questionId: 4,
    topic: "DBMS",
    question: "Which SQL command is used to retrieve data from a database?",
    option1: "GET",
    option2: "SELECT",
    option3: "RETRIEVE",
    option4: "FETCH",
    answer: "SELECT",
  },
  {
    questionId: 5,
    topic: "DBMS",
    question: "What does ACID stand for in database transactions?",
    option1: "Atomicity, Consistency, Isolation, Durability",
    option2: "Accuracy, Consistency, Integrity, Durability",
    option3: "Atomicity, Concurrency, Isolation, Durability",
    option4: "Automation, Consistency, Integrity, Durability",
    answer: "Atomicity, Consistency, Isolation, Durability",
  },
  {
    questionId: 6,
    topic: "DBMS",
    question: "Which of these is not a NoSQL database?",
    option1: "MongoDB",
    option2: "Cassandra",
    option3: "PostgreSQL",
    option4: "Redis",
    answer: "PostgreSQL",
  },
  {
    questionId: 7,
    topic: "DBMS",
    question: "What is normalization in DBMS?",
    option1: "The process of reducing redundancy in data",
    option2: "The process of increasing database size",
    option3: "The process of encrypting data",
    option4: "The process of backing up data",
    answer: "The process of reducing redundancy in data",
  },
  {
    questionId: 8,
    topic: "DBMS",
    question: "Which join returns all records when there is a match in either left or right table?",
    option1: "INNER JOIN",
    option2: "LEFT JOIN",
    option3: "RIGHT JOIN",
    option4: "FULL OUTER JOIN",
    answer: "FULL OUTER JOIN",
  },
  {
    questionId: 9,
    topic: "DBMS",
    question: "What is a foreign key?",
    option1: "A key that uniquely identifies a record",
    option2: "A key used for encryption",
    option3: "A field that refers to the primary key in another table",
    option4: "A special type of index",
    answer: "A field that refers to the primary key in another table",
  },
  {
    questionId: 10,
    topic: "DBMS",
    question: "Which SQL clause is used to filter groups?",
    option1: "WHERE",
    option2: "FILTER",
    option3: "HAVING",
    option4: "GROUP BY",
    answer: "HAVING",
  },

 // Networking Questions (10)
  {
    questionId: 11,
    topic: "Networking",
    question: "What does LAN stand for?",
    option1: "Local Area Network",
    option2: "Large Area Network",
    option3: "Local Access Network",
    option4: "Linked Area Network",
    answer: "Local Area Network",
  },
  {
    questionId: 12,
    topic: "Networking",
    question: "Which protocol is used to transfer web pages on the internet?",
    option1: "FTP",
    option2: "SMTP",
    option3: "HTTP",
    option4: "TCP",
    answer: "HTTP",
  },
  {
    questionId: 13,
    topic: "Networking",
    question: "What is the purpose of DNS?",
    option1: "To encrypt network traffic",
    option2: "To translate domain names to IP addresses",
    option3: "To manage database systems",
    option4: "To create network topologies",
    answer: "To translate domain names to IP addresses",
  },
  {
    questionId: 14,
    topic: "Networking",
    question: "Which layer of the OSI model handles routing?",
    option1: "Physical",
    option2: "Data Link",
    option3: "Network",
    option4: "Transport",
    answer: "Network",
  },
  {
    questionId: 15,
    topic: "Networking",
    question: "What is the default port for HTTPS?",
    option1: "80",
    option2: "8080",
    option3: "443",
    option4: "21",
    answer: "443",
  },
  {
    questionId: 16,
    topic: "Networking",
    question: "Which device operates at the Data Link layer?",
    option1: "Router",
    option2: "Switch",
    option3: "Hub",
    option4: "Repeater",
    answer: "Switch",
  },
  {
    questionId: 17,
    topic: "Networking",
    question: "What does VPN stand for?",
    option1: "Virtual Private Network",
    option2: "Verified Public Network",
    option3: "Virtual Public Node",
    option4: "Verified Private Node",
    answer: "Virtual Private Network",
  },
  {
    questionId: 18,
    topic: "Networking",
    question: "Which protocol is used for sending email?",
    option1: "SMTP",
    option2: "POP3",
    option3: "IMAP",
    option4: "FTP",
    answer: "SMTP",
  },
  {
    questionId: 19,
    topic: "Networking",
    question: "What is the purpose of a subnet mask?",
    option1: "To identify the network portion of an IP address",
    option2: "To encrypt network traffic",
    option3: "To identify the manufacturer of a network card",
    option4: "To measure network speed",
    answer: "To identify the network portion of an IP address",
  },
  {
    questionId: 20,
    topic: "Networking",
    question: "Which of these is a private IP address range?",
    option1: "192.168.0.0 - 192.168.255.255",
    option2: "200.100.50.0 - 200.100.50.255",
    option3: "100.50.25.0 - 100.50.25.255",
    option4: "172.32.0.0 - 172.32.255.255",
    answer: "192.168.0.0 - 192.168.255.255",
  },
 
  // Programming Questions (10)
  {
    questionId: 21,
    topic: "Programming",
    question: "What does OOP stand for?",
    option1: "Object-Oriented Programming",
    option2: "Object-Optimized Process",
    option3: "Operational Object Protocol",
    option4: "Oriented Object Programming",
    answer: "Object-Oriented Programming",
  },
  {
    questionId: 22,
    topic: "Programming",
    question: "Which of these is not a programming paradigm?",
    option1: "Functional",
    option2: "Procedural",
    option3: "Structural",
    option4: "Declarative",
    answer: "Structural",
  },
  {
    questionId: 23,
    topic: "Programming",
    question: "What is the output of '5' + 3 in JavaScript?",
    option1: "8",
    option2: "53",
    option3: "Error",
    option4: "undefined",
    answer: "53",
  },
  {
    questionId: 24,
    topic: "Programming",
    question: "Which data structure uses FIFO (First In First Out) principle?",
    option1: "Stack",
    option2: "Queue",
    option3: "Tree",
    option4: "Graph",
    answer: "Queue",
  },
  {
    questionId: 25,
    topic: "Programming",
    question: "What is the time complexity of binary search?",
    option1: "O(1)",
    option2: "O(n)",
    option3: "O(log n)",
    option4: "O(n log n)",
    answer: "O(log n)",
  },
  {
    questionId: 26,
    topic: "Programming",
    question: "Which keyword is used to define a constant in JavaScript (ES6)?",
    option1: "let",
    option2: "var",
    option3: "const",
    option4: "fixed",
    answer: "const",
  },
  {
    questionId: 27,
    topic: "Programming",
    question: "What does API stand for?",
    option1: "Application Programming Interface",
    option2: "Automated Programming Instruction",
    option3: "Application Process Integration",
    option4: "Automated Protocol Interface",
    answer: "Application Programming Interface",
  },
  {
    questionId: 28,
    topic: "Programming",
    question: "Which of these is not a valid variable name in most programming languages?",
    option1: "myVariable",
    option2: "_variable",
    option3: "2ndVariable",
    option4: "$variable",
    answer: "2ndVariable",
  },
  {
    questionId: 29,
    topic: "Programming",
    question: "What is the purpose of a constructor in OOP?",
    option1: "To destroy objects",
    option2: "To initialize objects",
    option3: "To inherit properties",
    option4: "To create abstract classes",
    answer: "To initialize objects",
  },
  {
    questionId: 30,
    topic: "Programming",
    question: "Which of these is not a primitive data type in JavaScript?",
    option1: "string",
    option2: "number",
    option3: "boolean",
    option4: "array",
    answer: "array",
  }
];

export default questions;