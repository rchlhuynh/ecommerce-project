import { DeliveryDate } from './DeliveryDate'
import { CartItemDetails } from './CartItemDetails' 

export function OrderSummary({ deliveryOptions, cart, loadCart }) {
 return (
  <div className="order-summary">
     {deliveryOptions.length > 0 && cart.map((cartItem) => {

         return (
             <div key={cartItem.productId} className="cart-item-container">
                 <DeliveryDate deliveryOptions={deliveryOptions}
                 cartItem={cartItem} />

                <CartItemDetails loadCart={loadCart} deliveryOptions={deliveryOptions}
                cartItem={cartItem} />
             </div>
         )
     })}
 </div>
 )
}