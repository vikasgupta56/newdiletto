import React, { useState } from 'react'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { BsCartCheck } from 'react-icons/bs'
import { GrCart } from 'react-icons/gr';
import { db, doc, collection, getDoc, updateDoc } from '../firebase'
import Image from 'next/image';

const QuickView = ({ cake, setCake, user, setPop }) => {
    const [size, setSize] = useState(0.5)
    const sizes = [1, 2, 4]
    console.log(user);

    let addToCart = async () => {
        console.log(cake.id);
        let newObj = {
            cake: cake.id,
            size: size,
            msg: ""
        }
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        let tempcart = [];
        if (docSnap.exists()) {
            //   console.log("Document data:", docSnap.data());
            tempcart = docSnap.data().cart;
        }
        tempcart.push(newObj)
        await updateDoc(docRef, {
            cart: tempcart
        });
        setPop(true)
        setCake(null)
    }
    return (
        <div className="qv-outer-cont flex-all">
            <div className="qv-inner-cont">
                <div className="cakepro-div">
                    <div className="cakepro-left">
                        <div className="cakepro-img-cont">
                            <div className="cakepro-img-div">
                                <Image className="cakepro-img" src={cake.imgsrc} fill />
                            </div>
                        </div>
                    </div>
                    <div className="cakepro-right">
                        <div className="cakepro-right-div">
                            <div className="cakepro-title-div"><div className="cakepro-title">{cake.name}</div>
                                <div className='blue-img-cont'>
                                    <Image src="/blue-tick.png" fill />
                                </div>
                            </div>
                            <div className="cakepro-price"><span className='rs'>Rs.</span>{cake.price}</div>
                            <div className="pick">Pick a quick size {user.email}</div>
                            <div className="sizes-cont">
                                {sizes.map((size, i) => {
                                    return (
                                        <div key={i} className="size flex-all" onClick={() => { setSize(size) }}>{size} kg</div>
                                    )
                                })}
                            </div>
                            <div className="size-t">Size :</div>
                            <div className="cakepro-size-cont">
                                <div className="cakepro-size flex-all">{size} kg</div>
                                <div className="up-down-cont">
                                    <div className="up-size flex-all" onClick={() => { setSize(size + 0.5) }}><MdOutlineKeyboardArrowDown /></div>
                                    <div className="down-size flex-all" onClick={() => { setSize(size - 0.5) }}><MdOutlineKeyboardArrowDown /></div>
                                </div>
                            </div>
                            <div className="btn-cont">
                                <div className="atc-btn flex-all t3" onClick={addToCart}><GrCart />Add to cart</div>
                                <div className="buy-btn flex-all t3">Buy now</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default QuickView