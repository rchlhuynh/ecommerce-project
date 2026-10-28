import { formatMoney } from '../../utils/money'
import { DeliveryOptions } from './DeliveryOptions'
import { useState } from 'react'
import axios from 'axios'

export function CartItemDetails({ cartItem, deliveryOptions, loadCart }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
            await axios.delete(`/api/cart-items/${cartItem.product.id}`);

            await loadCart();
          }

    const updateQuantity = async () => {
      if (isUpdatingQuantity) {
        await axios.put(`/api/cart-items/${cartItem.productId}`, {
          quantity: Number(quantity)
        });
      await loadCart();
      setIsUpdatingQuantity(false)
      } else {
        setIsUpdatingQuantity(true)
      }   
  };

  function saveQuantity(event) {
        setQuantity(event.target.value);
    }

  function actionKey(event) {
    if (event.key === 'Enter') {
      updateQuantity()
    } else if (event.key === 'Escape') {
      setQuantity(cartItem.quantity);
      setIsUpdatingQuantity(false)
    }
  }

  return (
    <>
      <div className="cart-item-details-grid">
          <img className="product-image"
              src={cartItem.product.image} />

          <div className="cart-item-details">
              <div className="product-name">
                  {cartItem.product.name}
              </div>
              <div className="product-price">
                  {formatMoney(cartItem.product.priceCents)}
              </div>
              <div className="product-quantity"> 
                  <span>
                      Quantity:
                      {isUpdatingQuantity ? (<input type="text" value={quantity} className="quantity-input" style={{width: '50px'}}
                      onChange={saveQuantity}
                      onKeyDown={actionKey} />) : (<span className="quantity-label">{cartItem.quantity}</span>)}
                  </span>
                  <span className="update-quantity-link link-primary"
                  onClick={updateQuantity}>
                      Update
                  </span>
                  <span className="delete-quantity-link link-primary"
                  onClick={deleteCartItem}>
                      Delete
                  </span>
              </div>
          </div>

          <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart} />
      </div>   
</>
)    
}