import React, { useEffect, useState } from 'react'
import { auth, query, collection, where, onAuthStateChanged, db, doc, updateDoc, getDoc, onSnapshot, getDocs } from '../firebase'
import Navbar from '../navbar/Navbar'
import Image from 'next/image'
import Link from 'next/link'
import QuickView from './QuickView'
import CartPopup from './CartPopup'
// import { db, doc, collection, getDoc, updateDoc } from '../components/firebase'
import { BsHandbag, BsFillHandbagFill, BsFillEyeFill, BsFillHeartFill } from 'react-icons/bs'


const CakePage = ({ cakes, subcategory }) => {

  const [cake, setCake] = useState(null);
  const [user, setUser] = useState();
  const [pop, setPop] = useState(false);
  const [popcakes, setPopCakes] = useState([])


  let func = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        let tempuser =docSnap.data();
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
  }
  useEffect(() => {
    func();
  }, [])

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
    setPopCakes(localCart.reverse())
  }

  let addToCart = async (cake) => {
    let newObj = {
      cake: cake.id,
      size: cake.minKg || ".5",
      msg: ""
    }

    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      let tempcart;
      if (docSnap.exists()) {
        tempcart = docSnap.data().cart;
      }
      if (tempcart) {
        tempcart.push(newObj)
      }
      else {
        tempcart = [newObj];
      }
      await updateDoc(docRef, {
        cart: tempcart
      });
    }
    else {
      let cart = localStorage.getItem('cart');
      if (!cart) {
        localStorage.setItem("cart", JSON.stringify([newObj]));
        refreshLocalCartPopup();
      }
      else {
        let localCart = JSON.parse(cart)
        localCart.push(newObj);
        localStorage.setItem('cart', JSON.stringify(localCart));
        refreshLocalCartPopup();
      }

    }
    setPop(true)
  }

  return (
    <>
      {cake &&
        <QuickView cake={cake} setCake={setCake} user={user} setPop={setPop} />
      }
      <CartPopup refreshLocalCartPopup={refreshLocalCartPopup} pop={pop} setPop={setPop} user={user} cakes={popcakes} setCakes={setPopCakes} />
      <Navbar />
      <div className="cake-main-title">{subcategory}</div>
      <div className="cake-page-cont">
        {cakes.map((cake, index) => {
          return (
            <div className='cake-cont t3' key={index} >
              <div className="cake-abs">
                <div className="cake-addcart cake-sidediv t3 flex-all" >
                  <div className="circle-inner t3 primary-btn flex-all" onClick={() => { addToCart(cake) }} >
                    <BsFillHandbagFill />
                  </div>
                </div>
                <div className="cake-addcart cake-sidediv t3 flex-all" style={{ transitionDelay: ".1s" }}>
                  <div className="circle-inner t3 primary-btn flex-all" onClick={() => { setCake(cake) }}>
                    <BsFillEyeFill />
                  </div>
                </div>
                <div className="cake-addcart cake-sidediv t3" style={{ transitionDelay: ".2s" }}>
                  <div className="circle-inner t3 primary-btn flex-all">
                    <BsFillHeartFill />
                  </div>
                </div>

              </div>
              {/* <Link href={cake.id ? `/product/cake/${cake.id}` : "/404"}> */}
              <div className="cake-img-cont">
                <div className="quick-view-cont flex-all t3" onClick={() => { setCake(cake) }}>Buy now</div>
                <Image src={cake.imgsrc} fill alt={cake.name} />
              </div>
              {/* </Link> */}
              <Link href={cake.id ? `/product/cake/${cake.id}` : "/404"}>
                <div className="cake-details-cont">
                  <div className="cake-name">{cake.name}</div>
                  <div className="cake-cut-price-pro">Rs 500</div>
                  <div className="cake-price-cont"><div className="cake-price">Rs {cake.price}</div><div className="cake-dot"></div><div className="cake-min-kg">{cake.minKg == .5 ? "500 gm" : cake.minKg + 'kg'}</div></div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>

    </>
  )
}

export default CakePage