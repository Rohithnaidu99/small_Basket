import React, { useEffect, useState } from 'react';

const AddToBasketButton = ({ productId }) => {
  const [message, setMessage] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  const handleAddToBasket = () => {
    const basketItems = JSON.parse(sessionStorage.getItem('basketItems')) || [];

    if (basketItems.includes(productId)) {
      setMessage('Already in the basket.');
    } else {
      basketItems.push(productId);
      sessionStorage.setItem('basketItems', JSON.stringify(basketItems));
      setMessage('Added to basket.');
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout to clear the message after 5 seconds
    const newTimeoutId = setTimeout(() => {
      setMessage('');
    }, 2500);
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('basketItems');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-danger mt-1 btn-sm shadow-none"
        onClick={handleAddToBasket}
      >
        Add to Basket
      </button>
      {message && (
        <p className="m-0 mt-1 text-success p-0">{message}</p>
      )}
    </>
  );
};

export default AddToBasketButton;

