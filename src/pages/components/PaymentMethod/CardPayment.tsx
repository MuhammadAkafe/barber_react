import React, { useState } from 'react';
import { CreditCardIcon } from '@heroicons/react/24/outline';

interface CardPaymentProps {
  onPaymentMethodChange: (method: string) => void;
}

const CardPayment: React.FC<CardPaymentProps> = ({ onPaymentMethodChange }) => {
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowCardForm(e.target.checked);
    onPaymentMethodChange(e.target.checked ? 'card' : '');
  };

  return (
    <div className="payment-method-container mb-4">
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="cardPayment"
          checked={showCardForm}
          onChange={handleCheckboxChange}
        />
        <label className="form-check-label" htmlFor="cardPayment">
          תשלום בכרטיס אשראי
        </label>
      </div>

      {showCardForm && (
        <div className="card-payment-form p-3 border rounded-3 bg-light">
          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">
              מספר כרטיס
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <CreditCardIcon className="h-5 w-5 text-primary" />
              </span>
              <input
                type="text"
                className="form-control"
                id="cardNumber"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleCardInputChange}
                placeholder="XXXX XXXX XXXX XXXX"
                maxLength={19}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="cardHolder" className="form-label">
              שם בעל הכרטיס
            </label>
            <input
              type="text"
              className="form-control"
              id="cardHolder"
              name="cardHolder"
              value={cardDetails.cardHolder}
              onChange={handleCardInputChange}
              placeholder="שם מלא"
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="expiryDate" className="form-label">
                תאריך תפוגה
              </label>
              <input
                type="text"
                className="form-control"
                id="expiryDate"
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleCardInputChange}
                placeholder="MM/YY"
                maxLength={5}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="cvv" className="form-label">
                קוד אבטחה
              </label>
              <input
                type="text"
                className="form-control"
                id="cvv"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleCardInputChange}
                placeholder="CVV"
                maxLength={3}
                required
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardPayment; 