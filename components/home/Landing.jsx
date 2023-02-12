import React, { useEffect } from 'react'
import { gsap } from "gsap/dist/gsap";
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Image from "next/image"

const Landing = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);         
        // gsap.to(".landing-img-cont", {
        //     scrollTrigger: {
        //         trigger: ".landing-img-cont",
        //         start: "top 10%",
        //         end: "bottom bottom",
        //         scrub: true,
        //         // markers:true
        //     },
            // y: 0
        // })
       }, [])
    return (
        <>
        <div className="landing-cont">
            <div className="landing-img-cont">
                <Image src="/food-cake-dessert-pastry-wallpaper-preview.jpg" quality={100} fill />
            </div>
        </div>

        </>
    )
}
export default Landing