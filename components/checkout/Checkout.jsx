import React, { useState, useEffect } from 'react'
import Shipping from './Shipping'
import Delivery from './Payment'
import Image from 'next/image'
import { AiOutlineTag } from 'react-icons/ai'
import { auth, doc, getDoc, db, onAuthStateChanged, query, where, collection, getDocs } from '../firebase'
import Link from 'next/link'

const Checkout = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [promo, setPromo] = useState(null);
  const [visible, setVisibile] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        let tempuser =docSnap.data();
        setUser(tempuser);

        let tempcart = tempuser.cart;

        await Promise.all(tempcart.map(async (item) => {
          let cake = item.cake;
          const docRef = doc(db, "all-cakes", cake);
          const docSnap = await getDoc(docRef);
          let data = docSnap.data();
          item.cakeName = data.name;
          item.cakeImg = data.imgsrc;
          item.cakeMinKg = data.minKg;
          item.cakePrice = data.price;
        }))

        setCart(tempcart)

      } else {
        let localCartString = localStorage.getItem('cart');
        let localCart = JSON.parse(localCartString);
        setCart(localCart)
        setUser(null)

      }
    });
  }, [])

  
  useEffect(() => {
    let func = async () => {
        if (cart) {
            let totalPrice = 0;
            await Promise.all(cart.map((cake) => {
                totalPrice = totalPrice + cake.size * cake.cakePrice;
            }))
            setTotal(totalPrice)
        }
    }
    func()
}, [cart])

  return (
    <div className='checkout-cont'>
      <div className="checkout-left">
        <div className="log-check flex-all">
          {!user?
          <>
          Already have an account? <Link href="/login"><div className='checkout-in'>Log in </div></Link>for a faster checkout.
          </>:
          `Logged in as ${user.email}`
          }
          </div>
        <Shipping />
        {/* <Delivery active={active} setActive={setActive} /> */}
      </div>
      <div className="checkout-right">
        <div className="final-checkout-cont">
          <div className="checkout-t">
            Order Summary ({cart && cart.length})
          </div>
          <div className="checkout-items-cont">
            {cart && cart.map((item, index) => {
              return (
                <div key={index} className="summary-cont">
                  <div className="summary-price"> &#8377; {item.cakePrice}</div>
                  <div className="summary-img-cont">
                    <Image fill src={item.cakeImg} />
                  </div>
                  <div className="summary-details">
                    <div className="summary-name">{item.cakeName}</div>
                    <div className="summary-qtn">{item.size} kg</div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className={`promo-cont t3 ${!visible ? 'min-promo' : null}`}>
            <div className="promo-t t3" onClick={() => setVisibile(!visible)}>
              <AiOutlineTag /> Enter a promo code
            </div>
            <input type="text" className="promo-input" />
            <div className="promo-btn primary-btn flex-all">Apply</div>
          </div>
          <div className="checkout-price-cont">
            <div className="cpp">
              Subtotal:
              <div className="cpp-p"> &#8377; {total}</div>
            </div>
            <div className="cpp">Shipping:
              <div className="cpp-p"> &#8377; 100</div>
            </div>
            <div className="cpp">Taxes:
              <div className="cpp-p"> &#8377; {0.00}</div>
            </div>

          </div>
          <div className="checkout-total">
            Total:
            <div className="checkout-price">&#8377; {total + 100}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout