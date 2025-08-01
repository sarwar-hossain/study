import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Payment.css';
import UserProfile from '../Database/UserProfile';

function Payment() {
    const { pdfPath, price, type } = useParams();

    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();
    const { phone, userName } = UserProfile();

    const path = decodeURIComponent(atob(pdfPath || ''));
    const amount = decodeURIComponent(atob(price || ''));
    const buyed = decodeURIComponent(atob(type || ''));

    const savePaymentDetails = async (paymentId) => {
        try {
            const response = await fetch('http://localhost:3000/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName,
                    phone,
                    amount,
                    buyed,
                    paymentId
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to save payment');
            }
            return data;
        } catch (error) {
            console.error('Error saving payment:', error);
            throw error;
        }
    };

    const handlePayment = async () => {
        setIsProcessing(true);

        const options = {
            key: "Your key",
            key_secret: "Your key_secret",
            amount: amount * 100,
            currency: "INR",
            name: "Razorpay",
            description: "Razorpay payment",
            handler: async function (response) {
                try {
                    await savePaymentDetails(response.razorpay_payment_id);
                    if (path === "class") {
                        navigate('/class')
                    } else {
                        navigate(`/pdf-viewer/${btoa(encodeURIComponent(path))}/${btoa(encodeURIComponent(buyed))}`);
                    }

                } catch (error) {
                    alert('Payment successful but failed to save details. Please contact support.');
                    navigate(`/success?payment_id=${response.razorpay_payment_id}`);
                } finally {
                    setIsProcessing(false);
                }
            },
            prefill: {
                name: userName || "Sarwar Hossain",
                email: "sarwar123@gmail.com",
                contact: phone || "1234567890"
            },
            notes: {
                address: "Islam pur, hasan pur, murshidabad",
            },
            theme: {
                color: "#000"
            }
        };

        const pay = new window.Razorpay(options);
        pay.open();
        pay.on('payment.failed', function (response) {
            setIsProcessing(false);
            alert(`Payment failed: ${response.error.description}`);
        });
    };

    return (
        <section className='payment-container'>
            <div className="payment-form-container">
                <h2 className='mb-3'>Make Payment for parchase of  {buyed}</h2>
                <p>Click below to complete your payment of</p>
                <div className="fixed-amount-display">₹{amount}</div>

                <button
                    className="payment-submit-btn"
                    onClick={handlePayment}
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
                </button>

                <p className="payment-note"><i>*This is a test transaction</i></p>
            </div>
        </section>
    );
}

export default Payment;
