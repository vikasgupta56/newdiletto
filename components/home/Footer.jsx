import React from 'react'
import { IoMdCall } from 'react-icons/io'
import { AiFillMail } from 'react-icons/ai'
import Image from 'next/image'

const Footer = () => {
    return (
        <>
        <div className="footer-cont">
            <div className="footer">
                <div className="footer-rows">
                    <div className="footer-logo">
                        Diletto.
                    </div>
                    <div className="need-help">Need help?</div>
                    <div className="help-p">Visit our Customer Support

                        for assistance or call us at</div>
                    <div className="call"><IoMdCall /> +91 77383 02421 </div>
                    <div className="call mail"><AiFillMail /> dilettopremium cakeshop@gmail.com </div>
                </div>
                <div className="footer-rows">
                    <div className="footer-t">Quick Links</div>
                    <div className="footer-links-cont">
                        <div className="links">HOME</div>
                        <div className="links">CAKES BY TYPE</div>
                        <div className="links">CAKES BY FLAVOURS</div>
                        <div className="links">CAKES BY THEME</div>
                        <div className="links">CAKES BY OCCASION</div>
                    </div>
                </div>
                <div className="footer-rows">
                    <div className="footer-t">Info</div>
                    <div className="footer-links-cont">
                        <div className="links">FAQ</div>
                        <div className="links">Customer Support</div>
                        <div className="links">Locations</div>
                        {/* <div className="links">CAKES BY THEME</div> */}
                        {/* <div className="links">CAKES BY OCCASION</div> */}
                    </div>
                </div>
                <div className="footer-rows"></div>
            </div>
            <div className="footer-line"></div>
            <div className="pri-cont">
                <div className="pri">Privacy Policy</div>
                <div className="pri">Refund Policy</div>
                <div className="pri">Terms &#38; conditions</div>
            </div>
            <div className="accept">We accept the following payment methods</div>
            <div className="pays-cont">
                <div className="pays">
                    <img src="/footer/payments/American Express.webp" fill />
                </div>
                <div className="pays">
                    <img src="/footer/payments/brand-chinaunionpay.webp" fill />
                </div>
                <div className="pays">
                    <img src="/footer/payments/mastercard.webp" fill />
                </div>
                <div className="pays">
                    <img src="/footer/payments/Diners.webp" fill />
                </div>
                <div className="pays">
                    <img src="/footer/payments/Discover.webp" fill />
                </div>
                <div className="pays">
                    <img src="/footer/payments/JCB.webp" fill />
                </div>
                <div className="pays">
                    <img src="/footer/payments/PayPal.webp" fill />
                </div>
                <div className="pays">
                    <img src="/footer/payments/Visa.webp" fill />
                </div>
                
                
            </div>
            </div>
        </>
    )
}

export default Footer