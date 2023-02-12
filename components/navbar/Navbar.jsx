import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { FaUserCircle, FaChevronDown } from 'react-icons/fa';
import CakesByFlavour from './SubList.jsx/CakesByFlavour';
import { auth, doc, getDoc, db, updateDoc, onAuthStateChanged,signOut, onSnapshot, query, where, collection, getDocs } from '../firebase'
import CakesByTheme from './SubList.jsx/CakesByTheme';
import { AiOutlineSearch, AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs'
import Link from 'next/link';


const Navbar = () => {
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  let logout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

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
            // alert(newCart.length);
            setCount(newCart.length)
            await updateDoc(docRef, {
              cart: newCart
            });
          }
          else {
            setCount(localCart.length)
            await updateDoc(docRef, {
              cart: localCart
            });
          }
          localStorage.removeItem("cart");
        }
        else{
          setCount(tempuser.cart.length)
        }

      } else {
        setUser(null)
        let localCartString = localStorage.getItem('cart');
        if (localCartString) {
          let localCart = JSON.parse(localCartString);
          setCount(localCart.length)
        }
        else{
          setCount(0);
        }
        

      }
    });
  }, [])
  return (
    <>
      <div className='nav-top'>
        <div className="log-in flex-all t3">
          <div className="pos-rel-full flex-all t3">
            {user ?
              <>
                <div className="nav-abs-profile">
                  <div className="nav-list" onClick={logout}>Log out</div>
                  <Link href={"/profile"}><div className="nav-list">Profile</div></Link>
                </div>
                <div className="profile-icon"> <FaUserCircle /> </div>
                <div className="username t3">Hi DilFam, {user.fname}</div>
                <div className="profile-down-arrow flex-all"><FaChevronDown /></div>
              </>
              :
              <>
                <Link href={"/login"}><FaUserCircle /> Log In</Link>
              </>
            }
          </div>
        </div>
      </div>
      <div className='nav-mid flex-all'>
        <Link href="/">
          <div className="nav-logo-cont ">
            {/* <Image src="/temp-logo.png" alt="Diletto Logo" fill /> */}
            Diletto.
          </div>
        </Link>
        <div className="search-div">
          <input type="text" placeholder='Search a flavour eg. Dark chocolate' />
          <div className="nav-search flex-all">
            <AiOutlineSearch />
          </div>
        </div>
        <div className="nav-svg-cont">
          <div className="svg-cont">
            <AiFillHeart />
          </div>
          <Link href="/cart">
            <div className="svg-cont">
              <AiOutlineShoppingCart />
              <div className="cart-count flex-all">{count}</div>
            </div>
          </Link>
        </div>
      </div>

      <div className="navbar flex-all">
        <div className="nav-item" onMouseEnter={() => { setSelected(0) }}>
          <div className="nav-pos-abs t3" style={{ transform: `translateX(${selected * 100}%)` }}></div>
          CAKES BY TYPE
          <div className="nav-detail-cont">
            <div className="nav-sub-cont">
              <div className="nav-sub-item">Blueberry Cakes</div>
              <div className="nav-sub-item">Blueberry Cakes</div>
              <div className="nav-sub-item">Blueberry Cakes</div>
              <div className="nav-sub-item">Blueberry Cakes</div>
              <div className="nav-sub-item">Blueberry Cakes</div>
              <div className="nav-sub-item">Blueberry Cakes</div>
            </div>
            <div className="nav-right-cont flex-all">
              <div className="nav-right-inner-cont">
                <div className="caken-cont">
                  <div className="caken-img-cont">
                    <Image fill={true} src="/blueberry cake.png" />
                  </div>
                  <div className="caken-detials">
                    <div className="caken-name">Blueberry cake</div>
                    <div className="caken-price">Rs 350</div>
                  </div>
                </div>
                <div className="caken-cont">
                  <div className="caken-img-cont">
                    <Image fill={true} src="/blueberry cake.png" />
                  </div>
                  <div className="caken-detials">
                    <div className="caken-name">Blueberry cake</div>
                    <div className="caken-price">Rs 350</div>
                  </div>
                </div>
                <div className="caken-cont">
                  <div className="caken-img-cont">
                    <Image fill={true} src="/blueberry cake.png" />
                  </div>
                  <div className="caken-detials">
                    <div className="caken-name">Blueberry cake</div>
                    <div className="caken-price">Rs 350</div>
                  </div>
                </div>
                <div className="caken-cont">
                  <div className="caken-img-cont">
                    <Image fill={true} src="/blueberry cake.png" />
                  </div>
                  <div className="caken-detials">
                    <div className="caken-name">Blueberry cake</div>
                    <div className="caken-price">Rs 350</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="nav-item" onMouseEnter={() => { setSelected(1) }}>CAKES BY FLAVOURS
          <CakesByFlavour />
        </div>
        <div className="nav-item" onMouseEnter={() => { setSelected(2) }}>CAKES BY THEME
          <CakesByTheme />
        </div>
        <div className="nav-item" onMouseEnter={() => { setSelected(3) }}>CAKES BY OCCASION
          {/* <CakesByTypes cakesByType={cakesByOccasion} /> */}
        </div>
      </div>
    </>

  )
}

export default Navbar