import React, { useEffect } from 'react'
import { gsap } from "gsap/dist/gsap";
import ScrollTrigger from 'gsap/dist/ScrollTrigger';


const VideoSection = () => {

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        var skewSetter = gsap.quickSetter(".col","skewY","deg");
        var neg = gsap.quickSetter(".vid","skewY","deg");
        var proxy = {skew:0}
        ScrollTrigger.create({
            onUpdate:self => {
                var skew = self.getVelocity()/ -500;
                if(Math.abs(skew) > Math.abs(proxy.skew)){
                    proxy.skew = skew;
                    gsap.to(proxy,{skew:0,duration:1,ease:"power3",overwrite:true,onUpdate:()=>{skewSetter(proxy.skew);}})
                }
            }
        })
        gsap.set(".col",{transformOrigin:"center center",force3D:true})
    }, [])
    return (
        <>
        <div className="col-cont">
        <div className='col flex-all'>
            <video className='vid' src="/caken.mp4" autoPlay muted loop></video>
        </div>
        </div>
        </>
    )
}

export default VideoSection