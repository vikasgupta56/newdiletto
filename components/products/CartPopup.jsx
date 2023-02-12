import React, { useState, useEffect } from 'react'
import { MdOutlineArrowBackIos } from 'react-icons/md'
import Image from 'next/image'
import { doc, db, getDoc, collection, onSnapshot } from '../firebase'
import Cake from './Cake'
import Link from 'next/link'

const CartPopup = ({ pop, setPop, user, cakes, setCakes, refreshLocalCartPopup }) => {

    const [total, setTotal] = useState(0)

    useEffect(() => {
        let unsub = () => {
            console.log("unsubscribed");
        };

        let func = async () => {
            if (user) {
                unsub = onSnapshot(doc(db, "users", user.uid), async (dc) => {
                    let cart = dc.data().cart;
                    if (!cart) {
                        setCakes([])
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
                    setCakes(cart.reverse())
                    console.log(cart, "after checkout");


                });
            }
            else {
                unsub();
                let localCartString = localStorage.getItem("cart");
                if (!localCartString) {
                    setCakes([]);
                }
                else {
                    refreshLocalCartPopup();
                }
            }
        }
        func();
    }, [user])

    useEffect(() => {
        if (pop) {
            setTimeout(() => {
                // setPop(false)
            }, 2500);
        }
    }, [pop])


    useEffect(() => {
        let func = async () => {
            if (cakes) {
                let totalPrice = 0;
                await Promise.all(cakes.map((cake) => {
                    totalPrice = totalPrice + cake.size * cake.cakePrice;
                }))
                setTotal(totalPrice)
            }
        }
        func()
    }, [cakes])

    return (
        <div className="cart-popup t3" style={{ transform: `translateX(${pop ? "0" : "100"}%)` }}>
            <div className="pos-rel-full">
                <div className="cart-top flex-all">
                    <div className="cart-arrow-svg flex-all" onClick={() => { setPop(false) }}>
                        <MdOutlineArrowBackIos />
                    </div>
                    Cart</div>
                <div className="cart-popup-cont">
                    <div className="pos-rel-full">
                        <div className="cart-up">
                            {cakes.map((cake, index) => {
                                return (
                                    <Cake cake={cake} key={index} user={user} cakeIndex={cakes.length - 1 - index} refreshLocalCartPopup={refreshLocalCartPopup} />
                                )
                            })}
                        </div>
                        <div className="cart-down">
                            {cakes && total ?
                                <>
                                    <div className="cake-cart-subtotal">
                                        <div className="ccst">&#8377; {total}</div>
                                        Subtotal:
                                    </div>
                                    <div className="cake-cart-subtotal">
                                        <div className="ccst">&#8377; 100</div>
                                        Shipping
                                    </div>
                                    <div className="cake-cart-total">
                                        <div className="ccst">&#8377; {total + 100}</div>
                                        Shipping
                                    </div>

                                    <Link href={"/checkout"}><div className="ptc primary-btn flex-all">Proceed to checkout</div></Link>
                                </>
                                :
                                <div className="cake-cart-loader flex-all">
                                    <div className="ctw"></div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPopup

