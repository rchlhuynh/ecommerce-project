import { NavLink, useNavigate, useSearchParams } from 'react-router'
import LogoWhite from '../assets/images/logo-white.png'
import MobileLogoWhite from '../assets/images/mobile-logo-white.png'
import CartIcon from '../assets/images/icons/cart-icon.png'
import SearchIcon from '../assets/images/icons/search-icon.png'
import './Header.css'
import { useState } from 'react'
import axios from 'axios'

type HeaderProps = {
  cart: {
    productId: string;
    quantity: number;
    deliveryOptionId: string;

  }[];
}

export function Header({ cart } : HeaderProps) {
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search');
  const [search, setSearch] = useState(searchText || '')

  let totalQuantity = 0;
  const navigate = useNavigate();

  const showResults = async () => {
  await axios.post('/api/orders');
  navigate('/?search=${search}');

    
  };
        
    cart.forEach((cartItems) => {
        totalQuantity += cartItems.quantity
    })

    const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value)
    }
    const searchProducts = () => {
      console.log(search)
    }
    return (
      <div className="header">
          <div className="left-section">
              <NavLink to="/" className="header-link">
                  <img className="logo"
                      src={LogoWhite} />
                  <img className="mobile-logo"
                      src={MobileLogoWhite} />
              </NavLink>
          </div>

          <div className="middle-section">
              <input className="search-bar" type="text" placeholder="Search" value={search}
              onChange={updateSearchInput} />
              <button className="search-button"
              onClick={() => {
                searchProducts();
                showResults()
              }}>
                  <img className="search-icon" src={SearchIcon} />
              </button>
          </div>

        <div className="right-section">
          <NavLink className="login-link header-link" to="/login">
              <span className="login-text">Login</span>
          </NavLink>

          <NavLink className="orders-link header-link orders-link-active" to="/orders">
              <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
              <img className="cart-icon" src={CartIcon} />
              <div className="cart-quantity">{totalQuantity}</div>
              <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    )
}