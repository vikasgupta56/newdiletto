import React, { useState, useEffect } from 'react'
import { BsFillPatchCheckFill } from 'react-icons/bs'

const Shipping = () => {

    const [shipping, setShipping] = useState({
        email: "", name: "", phone: "", address: "", city: "", pincode: ""
    })
    const [error, setError] = useState({
        email: "", name: "", phone: "", address: "", city: "", pincode: ""
    })

    let handleInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setShipping({ ...shipping, [name]: value });
    }
    let cont = () => {
        // setActive(2);
    }
    // if (active == 1) {
        return (
            <div className="shipping-cont">
                <div className="shipping-t">Shipping details</div>
                <div className="sinp-cont">
                    <label className="sinp-p" for="shipping-email">Email for order confirmation*</label>
                    <input value={shipping.email} onChange={handleInputs} name="email" className={`sinp ${error.email ? "sinp-red" : null}`} id="shipping-email" />
                    {error.email && <div className="sinp-error">{error.email}</div>}
                </div>
                <div className="sinp-cont">
                    <label for="shipping-name" className="sinp-p">Name*</label>
                    <input value={shipping.name} onChange={handleInputs} name="name" className={`sinp ${error.name ? "sinp-red" : null}`} id="shipping-name" />
                    {error.name && <div className="sinp-error">{error.name}</div>}
                </div>
                <div className="sinp-cont">
                    <label for="shipping-address" className="sinp-p">Address*</label>
                    <input value={shipping.address} onChange={handleInputs} name="address" className={`sinp ${error.address ? "sinp-red" : null}`} id="shipping-address" />
                    {error.address && <div className="sinp-error">{error.address}</div>}

                </div>
                <div className="sinp-cont">
                    <label for="shipping-city" className="sinp-p">City*</label>
                    <input value={shipping.city} onChange={handleInputs} name="city" className={`sinp ${error.city ? "sinp-red" : null}`} id="shipping-city" />
                    {error.city && <div className="sinp-error">{error.city}</div>}
                </div>
                <div className="sinp-cont">
                    <label for="shipping-flat" className="sinp-p">Flat or house number*</label>
                    <input value={shipping.flat} onChange={handleInputs} name="flat" className={`sinp ${error.flat ? "sinp-red" : null}`} id="shipping-flat" />
                    {error.flat && <div className="sinp-error">{error.flat}</div>}
                </div>
                <div className="sinp-cont-flex">
                    <div className="sinp-half-cont">
                        <label for="shipping-pincode" className="sinp-p">Pincode*</label>
                        <input value={shipping.pincode} onChange={handleInputs} name="pincode" className={`sinp ${error.pincode ? "sinp-red" : null}`} id="shipping-pincode" />
                        {error.pincode && <div className="sinp-error">{error.pincode}</div>}
                    </div>
                    <div className="sinp-half-cont">
                        <label for="shipping-phone" className="sinp-p">Phone*</label>
                        <input value={shipping.phone} onChange={handleInputs} name="phone" className={`sinp ${error.phone ? "sinp-red" : null}`} id="shipping-phone" />
                        {error.phone && <div className="sinp-error">{error.phone}</div>}

                    </div>
                </div>
                <div className="cont-btn primary-btn flex-all" onClick={cont} >Place Order</div>
            </div>
        )
    // }
    // return (
    //     <div className='not-active-cont'>
    //         <div className="black-ship-t"><BsFillPatchCheckFill /> Shipping Details</div>
    //         <div className="ship-text">{shipping.email}</div>
    //         <div className="ship-text">{shipping.name}</div>
    //         <div className="ship-text">{shipping.phone}</div>
    //         <div className="ship-text">{shipping.address}</div>
    //         <div className="ship-text">{shipping.city}</div>
    //         <div className="ship-text">{shipping.pincode}</div>

    //     </div>
    // )
}

export default Shipping