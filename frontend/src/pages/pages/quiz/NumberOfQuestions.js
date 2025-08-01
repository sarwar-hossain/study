import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function NumberOfQuestions(props) {
    const { type, subject, topic, quizNo, subjectName } = useParams();
    const [quesNum, setQuesNum] = useState(subject === "atoz" ? 30 : topic === "atoz" ? 10 : 10);

    // Determine the min and max values based on conditions
    let minQues, maxQues;
    if (subject === "atoz") {
        minQues = 30;
        maxQues = 90;
    } else if (topic === "atoz") {
        minQues = 10;
        maxQues = 30;
    } else {
        minQues = 10;
        maxQues = 10;
    }

    const handleInputChange = (e) => {
        let value = parseInt(e.target.value) || minQues;
        if (value < minQues) value = minQues;
        if (value > maxQues) value = maxQues;
        setQuesNum(value);
    };

    const increment = () => {
        setQuesNum(prev => Math.min(prev + 1, maxQues));
    };

    const decrement = () => {
        setQuesNum(prev => Math.max(prev - 1, minQues));
    };

    return (
        <div style={styles.page}>
            <h1 style={styles.title}>Select Number of Questions</h1>

            <div style={styles.container}>
                <div style={styles.inputContainer}>
                    <label htmlFor="questionCount" style={styles.label}>
                        Number of Questions ({minQues}-{maxQues}):
                    </label>
                    <div style={styles.inputGroup}>
                        <button 
                            style={quesNum <= minQues ? {...styles.button, ...styles.buttonDisabled} : styles.button} 
                            onClick={decrement}
                            disabled={quesNum <= minQues}
                        >
                            -
                        </button>
                        <input
                            id="questionCount"
                            type="number"
                            min={minQues}
                            max={maxQues}
                            value={quesNum}
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                        <button 
                            style={quesNum >= maxQues ? {...styles.button, ...styles.buttonDisabled} : styles.button} 
                            onClick={increment}
                            disabled={quesNum >= maxQues}
                        >
                            +
                        </button>
                    </div>
                </div>

                <Link 
                    to={`/quiz-starting/${type}/${subject}/${topic}/${quizNo}/${quesNum}/${subjectName}`} 
                    style={styles.link}
                >
                    <div style={styles.card}>
                        <div style={styles.cardHeader}>
                            <h2 style={styles.cardTitle}>Start {subjectName} Quiz</h2>
                            <p style={styles.cardSubtitle}>{quesNum} questions selected</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

const styles = {
    page: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
        padding: '2rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    title: {
        color: '#2c3e50',
        marginBottom: '2rem',
        fontSize: '2.5rem',
        fontWeight: '600',
        textAlign: 'center',
    },
    container: {
        width: '100%',
        maxWidth: '600px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
        padding: '2rem',
    },
    inputContainer: {
        marginBottom: '2rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.75rem',
        color: '#34495e',
        fontSize: '1.1rem',
        fontWeight: '500',
    },
    inputGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
    },
    button: {
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#3498db',
        color: 'white',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#bdc3c7',
        cursor: 'not-allowed',
    },
   
    input: {
        width: '80px',
        height: '40px',
        borderRadius: '8px',
        border: '2px solid #dfe6e9',
        textAlign: 'center',
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#2c3e50',
        outline: 'none',
        transition: 'border-color 0.2s ease',
    },
    link: {
        textDecoration: 'none',
    },
    card: {
        backgroundColor: '#3498db',
        borderRadius: '10px',
        padding: '1.5rem',
        color: 'white',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        ':hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            backgroundColor: '#2980b9',
        },
    },
    cardHeader: {
        textAlign: 'center',
    },
    cardTitle: {
        color: 'white',
        margin: '0',
        fontSize: '1.5rem',
        fontWeight: '600',
    },
    cardSubtitle: {
        margin: '0.5rem 0 0',
        fontSize: '1rem',
        opacity: '0.9',
    },
};

export default NumberOfQuestions;