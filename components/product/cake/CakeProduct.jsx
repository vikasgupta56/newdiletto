import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Navbar from '../../navbar/Navbar'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { BsCartCheck, BsPlusLg } from 'react-icons/bs'
import { BiShareAlt } from 'react-icons/bi'
import { GoPlus } from 'react-icons/go'
import { HiMinus, HiMusicNote, HiPlus } from 'react-icons/hi'
import { onAuthStateChanged, doc, db, getDoc, getDocs, updateDoc, auth, query, where, collection } from '../../firebase'
import { GrCart } from 'react-icons/gr';
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineHeart } from 'react-icons/ai'

const CakeProduct = ({ cake, cakeId }) => {
    const [size, setSize] = useState(1)
    const [rating, setRating] = useState()
    const [user, setUser] = useState(null);
    useEffect(() => {
        setRating([3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 7)])

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(user.uid);
                const q = query(collection(db, "users"), where("uid", "==", user.uid));
                const querySnapshot = await getDocs(q);
                let tempuser = {};
                querySnapshot.forEach((doc) => {
                    tempuser = doc.data();
                    console.log(tempuser);

                    console.log(doc.id, " => ", doc.data());
                });
                // console.log("o");
                setUser(tempuser)

            } else {
                setUser(null)
            }
        });


    }, [])
    const sizes = [1, 2, 4]
    let handleSize = (e) => {
        let value = e.target.value;
        // if(value == 20)
        setSize(e.target.value)
    }
    let handleminus = () => {
        if (size == (cake.minSize || .5)) {
            setSize(cake.maxSize || 20)
        }
        else {
            setSize(size - .5)
        }
    }
    let handleplus = () => {
        if (size == (cake.maxSize || 20)) {
            setSize(cake.minSize || .5)
        }
        else {
            setSize(size + 0.5)
        }
    }
    let addToCart = async () => {
        let newObj = {
            cake: cakeId,
            size,
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
                // console.log("");
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
            localStorage.setItem("cart", JSON.stringify(newObj));
        }
    }
    return (
        <>
            <Navbar />
            <div className="cakepro-div">
                <div className="cakepro-left">
                    <div className="cakepro-img-cont">
                        <div className="cakepro-img-div">
                            <Image className="cakepro-img" src={cake.imgsrc} quality={100} fill />
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

                        <div className="star-cont">
                            <div className="stars">
                                <div className="star"><AiFillStar /></div>

                                <div className="star"><AiFillStar /></div>

                                <div className="star"><AiFillStar /></div>

                                <div className="star"><AiFillStar /></div>

                                <div className="star"><AiFillStar /></div>
                            </div>
                            {/* 4.{[3,4,5,6,7,8,9][Math.floor(Math.random()*7)]} */}
                            4.{rating}
                        </div>
                        <div className="cakepro-price"><span className='rs'> &#8377;</span>{cake.price * 2 * size}<span className='cake-cut-price'><strike>&#8377; 500</strike></span></div>
                        <div className="pick">Pick a quick size</div>
                        <div className="sizes-cont">
                            {sizes.map((option, i) => {
                                return (
                                    <div key={i} className={`${size == option ? "active-size" : null} size flex-all`} onClick={() => { setSize(option) }}>{option} kg</div>
                                )
                            })}
                        </div>
                        <div className="pick">Size :</div>
                        <div className="cakepro-size-cont">
                            <div className="size-sign flex-all t3" onClick={handleminus}><HiMinus /></div>
                            <input type="number" className="cake-size-inp t3" value={size == .5 ? "500" : size} onChange={handleSize} /> {size == .5 ? "gm" : "kg"}
                            <div className="size-sign flex-all t3" onClick={handleplus}><HiPlus /></div>
                        </div>
                        <div className="btn-cont">
                            <div className="atc-btn flex-all t3" onClick={addToCart} ><GrCart />Add to cart</div>
                            <div className="buy-btn flex-all primary-btn t3">Buy now</div>
                        </div>
                        <div className="whislist-cont">

                            <div className="wish-cont t3">
                                <AiOutlineHeart />
                                Whislist
                            </div>
                            <div className="wish-cont t3">
                                <BiShareAlt />
                                Share
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CakeProduct