import { NavLink } from "react-router-dom"
import { Logo, account, cart, heart, search } from "../icons/icons"
import { useEffect, useState } from "react"
import useCart from "@/hooks/carts/useCartQuery"

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsLoggedIn(true);
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
    };

    const { soluongsp } = useCart();


    return (
        <header>
            <div className="container">
                <div className="header-inner">
                    <NavLink to={"/"} className="header_logo"><img src={Logo} alt="" /></NavLink>
                    <nav className="header-main">
                        <ul className="main-menu__list">
                            <li className="main-menu__item"><NavLink to={"/"} className="main-menu__link">Home</NavLink></li>
                            <li className="main-menu__item"><NavLink to={"shop"} className="main-menu__link">Shop</NavLink></li>
                            <li className="main-menu__item"><a href="#" className="main-menu__link">About</a></li>
                            <li className="main-menu__item"><a href="#" className="main-menu__link">Contact</a></li>
                        </ul>
                    </nav>
                    <div className="header-block">
                        {isLoggedIn ? (
                            <>
                                <div className="admin">
                                    <NavLink to={'admin'}><img src={account} alt="" /></NavLink>
                                </div>
                                <div className="user" onClick={handleLogout}>
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                </div>
                            </>
                        ) : (
                            <div className="user">
                                <NavLink to={'signup'}><img src={account} alt="" /></NavLink>
                            </div>
                        )}
                        <div className="search">
                            <NavLink to={''}><img src={search} alt="" /></NavLink>
                        </div>
                        <div className="wishlist">
                            <NavLink to={''}><img src={heart} alt="" /></NavLink>
                        </div>
                        <div className="cart">
                            <NavLink to={'/cart '}><img src={cart} alt="" /></NavLink>
                            <div className="cart_quantity">
                                {soluongsp}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="menu-mobile">
                <i className="fa-solid fa-bars" />
            </div>
        </header>
    )
}

export default Header