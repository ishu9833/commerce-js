import React, { useEffect, useState } from 'react';
import { Navbar, Products } from './components';
import Cart from './components/Cart/Cart';
import { commerce } from './lib/commerce';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Checkout from './components/CheckoutForm/Checkout/Chackout';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = ('');

    const fetchProducts = async () => {
        const { data } = await commerce.products.list();

        setProducts(data);
    }


    const fetchCart = async() => {
        const cart = await commerce.cart.retrieve();
        setCart(cart)
    }

    const handleAddToCart = async(productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    }

    const handleUpdateCartQty = async(productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity })
        setCart(cart)
    }

    const handleRemoveFromCart = async(productId, quantity) => {
        const { cart } = await commerce.cart.remove(productId)
        setCart(cart)
    }

    const handleEmptyCart = async() => {
        const { cart } = await commerce.cart.empty()
        setCart(cart)
    }

    const refresh = async() => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);

    }
    const handleCaptureCheckout = async(checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder)
            refresh()
        } catch (error) {
            console.log(error)
            // setErrorMessage(error.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    // console.log(cart);
    return ( 
        <Router>
            <div>
                <Navbar totalItems={cart.total_items}  />
                    <Switch>
                        <Route  exact path = "/">
                            <Products 
                                products = { products }
                                onAddToCart = { handleAddToCart }
                                handleUpdateCartQty  />
                        </Route>
                        <Route exact path="/cart">
                            <Cart 
                                cart={cart} 
                                onUpdateCartQty={handleUpdateCartQty} 
                                onRemoveFromCart={handleRemoveFromCart} 
                                onEmptyCart={handleEmptyCart} />
                        </Route>
                        <Route path="/checkout" exact>
                            <Checkout 
                                cart={cart} 
                                order={order} 
                                onCaptureCheckout={handleCaptureCheckout} 
                                error={errorMessage} />
                        </Route>
                        </Switch>
            </div>
        </Router>
    );
};

export default App;