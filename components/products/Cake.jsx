import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { db, doc, updateDoc, getDoc } from '../firebase'
import Image from 'next/image'
import {BsPencil} from 'react-icons/bs';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

const Cake = ({ cake, user, cakeIndex, refreshLocalCartPopup }) => {

    const [size, setSize] = useState(cake.size)
    const [msg,setMessage] = useState(cake.msg || "" );
    const [visible,setVisible] = useState(false);
    useEffect(() => {
        setSize(cake.size);
    }, [cake])


    let minussize = async () => {
        if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            let tempcart = docSnap.data().cart;
            if (tempcart) {
                tempcart[cakeIndex].size -= 0.5;
            }
            await updateDoc(docRef, {
                cart: tempcart
            });
        }
        else {
            let localCartString = localStorage.getItem('cart');
            let localCart = JSON.parse(localCartString)
            localCart[cakeIndex].size -= .5;
            localStorage.setItem('cart', JSON.stringify(localCart));
            refreshLocalCartPopup();
        }

    }
    let plussize = async () => {
        if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            let tempcart = docSnap.data().cart;
            if (tempcart) {
                tempcart[cakeIndex].size += 0.5;
            }
            await updateDoc(docRef, {
                cart: tempcart
            });
        }
        else {
            let localCartString = localStorage.getItem('cart');
            let localCart = JSON.parse(localCartString)
            localCart[cakeIndex].size += .5;
            localStorage.setItem('cart', JSON.stringify(localCart));
            refreshLocalCartPopup();
        }

    }

    let remove = async () => {
        console.log(cake);
        if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            let cart = docSnap.data().cart;
            cart.splice(cakeIndex, 1);
            await updateDoc(docRef, {
                cart
            });
        }
        else {
            let localCartString = localStorage.getItem('cart');
            let localCart = JSON.parse(localCartString);
            localCart.splice(cakeIndex, 1);
            localStorage.setItem('cart', JSON.stringify(localCart));
            refreshLocalCartPopup();

        }
    }
    return (
        <div className="cart-item" >
            <div className="cake-cart-remove flex-all" onClick={remove}><RiDeleteBin6Line /></div>
            <div className="cart-item-img">
                <Image src={cake.cakeImg} fill alt="" />
            </div>
            <div className="cart-item-details">
                <div className="cake-cart-name"> {cake.cakeName}</div>
                <div className="cake-cart-price-cont"><div className="cake-cart-price">&#8377; {cake.cakePrice*cake.size}</div><div className="cake-cart-dot"></div>
                    <div className="cake-cart-size-cont flex-all">
                        <div className="cake-cart-change flex-all" onClick={minussize}><AiOutlineMinus /></div>
                        <input className="cake-cart-size" onChange={(e) => { setSize(e.target.value) }} value={size == 0.5 ? "500" : size} />
                        <div className="cake-cart-kg">{size==0.5?" gm": " kg"}</div>
                        {/* <div className="cake-cart-size flex-all">{cake.size}</div> */}
                        <div className="cake-cart-change flex-all" onClick={plussize}><AiOutlinePlus /></div>
                    </div>
                </div>
                <div className="cake-cart-msg">Message:{cake.msg || ""}
                {visible && <input className='cake-cart-msg-input' placeholder='Eg: HBD Sakshi' value={msg} onChange={e=>setMessage(e.target.value)} />}
                <div onClick={()=>{setVisible(true)}}><BsPencil /></div>
                </div>
            </div>
        </div>
    )
}

export default Cake