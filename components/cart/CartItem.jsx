import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import Image from 'next/image'
import { db, doc, updateDoc, getDoc } from '../firebase'
import {IoIosRemoveCircleOutline} from 'react-icons/io'
import {MdDelete} from 'react-icons/md'

const CartItem = ({ cake,user,cakeIndex }) => {


    const [size, setSize] = useState(cake.size)
    const [msg, setMessage] = useState(cake.msg || "")
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
        <>
            <div className="cart-div">
                <div className="cart-left-cont">
                    <div className="remove-cart" onClick={remove}><div className="flex-all pos-rel-full remove-rel"><MdDelete /> Remove</div></div>
                    <div className="cart-img-cont">
                        <Image src={cake.cakeImg} fill />
                    </div>
                    <div className="cart-details-cont">
                        <div className="cart-name">{cake.cakeName}</div>
                        <div className="cart-price">Rs. {cake.cakePrice}</div>
                        <div className="size-change">
                            <div className="change-div flex-all" onClick={minussize}><AiOutlineMinus /></div>
                            <div className="cart-size-cont-bor"><input className="cart-size-div flex-all" value={size==.5?"500":size} onChange={(e=>{setSize(e.target.value)})} />
                            <div className="cart-kg">{size==.5?" gm":" kg"}</div>
                            </div>
                            <div className="change-div flex-all" onClick={plussize}><AiOutlinePlus /></div>
                        </div>
                    </div>
                </div>
                <div className="cart-price-cont">Rs. {cake.cakePrice * cake.size}</div>
            </div>
        </>
    )
}

export default CartItem