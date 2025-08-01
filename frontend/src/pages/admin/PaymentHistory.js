import React, { useEffect, useState, useRef } from 'react';
import './style/PaymentHistory.css';

function PaymentHistory() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const printRef = useRef();

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('http://localhost:3000/payments');
                if (!response.ok) throw new Error('Failed to fetch payments');
                const data = await response.json();
                setPayments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
        const intervalId = setInterval(fetchPayments, 5000);
        return () => clearInterval(intervalId);
    }, []);

    // Calculate total amount
    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);



    if (loading) return <div className="loading">Loading payments...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="payment-history-container">
            <div className="payment-table-container" ref={printRef}>
                <table className="payment-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Amount (₹)</th>
                            <th>Buyed</th>
                            <th>Payment ID</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="total-row">
                            <td colSpan="3">Total Amount</td>
                            <td>₹{totalAmount}</td>
                            <td colSpan="5"></td>
                        </tr>
                        {payments.length > 0 ? (
                            <>
                                {payments.slice().reverse().map((payment, i) => (
                                    <tr key={payment._id}>
                                        <td>{payments.length -i}</td>
                                        <td>{payment.userName}</td>
                                        <td>{payment.phone}</td>
                                        <td>₹{payment.amount}</td>
                                        <td>{payment.buyed}</td>
                                        <td className="payment-id">{payment.paymentId}</td>
                                        <td>{new Date(payment.date).toLocaleString()}</td>
                                    </tr>
                                ))}

                            </>
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-payments">
                                    No payments found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

           

        </div>
    );
}

export default PaymentHistory;