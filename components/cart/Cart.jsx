import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { auth, doc, getDoc, db, updateDoc, onAuthStateChanged, onSnapshot, query, where, collection, getDocs } from '../firebase'
import Link from 'next/link'
import CartItem from './CartItem'

const Cart = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        let tempuser = docSnap.data();
        setUser(tempuser)
        let localCartString = localStorage.getItem('cart');
        if (localCartString) {
          let localCart = JSON.parse(localCartString);
          let tempcart = tempuser.cart;

          if (tempcart) {
            let newCart = tempcart.concat(localCart);
            await updateDoc(docRef, {
              cart: newCart
            });
          }
          else {
            await updateDoc(docRef, {
              cart: localCart
            });
          }
          localStorage.removeItem("cart");
        }

      } else {
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


  let refreshLocalCartPopup = async () => {
    let localCartString = localStorage.getItem("cart");
    let localCart = JSON.parse(localCartString);
    await Promise.all(localCart.map(async (item) => {
      let cake = item.cake;
      const docRef = doc(db, "all-cakes", cake);
      const docSnap = await getDoc(docRef);
      let data = docSnap.data();
      item.cakeName = data.name;
      item.cakeImg = data.imgsrc;
      item.cakeMinKg = data.minKg;
      item.cakePrice = data.price;
    }))
    setCart(localCart.reverse())
  }


  useEffect(() => {
    let unsub = () => {
      console.log("unsubscribed");
    };

    let func = async () => {
      if (user) {
        unsub = onSnapshot(doc(db, "users", user.uid), async (dc) => {
          let cart = dc.data().cart;
          if (!cart) {
            setCart([])
            return;
          }
          await Promise.all(cart.map(async (item) => {
            let cake = item.cake;
            const docRef = doc(db, "all-cakes", cake);
            const docSnap = await getDoc(docRef);
            let data = docSnap.data();
            item.cakeName = data.name;
            item.cakeImg = data.imgsrc;
            item.cakeMinKg = data.minKg;
            item.cakePrice = data.price;
          }))
          setCart(cart.reverse())
        });
      }
      else {
        unsub();
        let localCartString = localStorage.getItem("cart");
        if (!localCartString) {
          setCart([]);
        }
        else {
          refreshLocalCartPopup();
        }
      }
    }
    func();
  }, [user])


  return (
    <>
      <div className="cart">
        <div className="cart-left">
          <div className="cart-line">
            <div className="cart-browse flex-all">Continue browsing <IoIosArrowForward /></div>
            <div className="cart-t">Your cart</div>
          </div>
          <div className="cart-cont">
            {cart &&
              cart.map((item, index) => {
                return (
                  <CartItem cake={item} user={user} cakeIndex={cart.length - 1 - index} key={index} />
                )
              })

            }
          </div>
        </div>
        <div className="cart-right">

          <div className="cart-summary">
            {cart && total ?
              <>
                <div className="csummary-t">Order Summary</div>
                <div className="sub-total-cont">Subtotal:
                  <div className="sub-c">&#8377; {total}</div></div>
                <div className="sub-total-cont">Shipping:
                  <div className="sub-c">&#8377; 100</div></div>
                <div className="total-cart">Total:
                  <div className="sub-c">&#8377; {total + 100}</div>
                </div>

                <Link href="/checkout"><div className="checkout-btn flex-all primary-btn">Proceed to checkout</div></Link>
              </>
              :
              <div className="cart-loader-div flex-all"><div className="cart-loader"></div></div>
            }
          </div>



        </div>
      </div>
    </>
  )
}

export default Cart