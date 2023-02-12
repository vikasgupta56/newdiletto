import React, { useEffect } from 'react'
import { gsap } from "gsap/dist/gsap";
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

const ScrollHome = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".anime-outer", {
      scrollTrigger: {
        trigger: ".scroll-div",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        // markers:true
      },
      rotate: "180"
    })
    gsap.to(".anime-inner", {
      scrollTrigger: {
        trigger: ".scroll-div",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        // markers:true
      },
      rotate: "-180"
    })

    gsap.to(".anime-imgs-cont", {
      scrollTrigger: {
        trigger: ".scroll-div",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        // markers:true
      },
      y: "0"
    })
  }, [])
  return (
    <div className="scroll-div">
      <div className='scroll-cont'>
        <div className="scroll-left"></div>
        <div className="scroll-right">
          <div className="anime-cont">
            <div className="anime-line"></div>
            <div className="anime-outer  flex-all">
              <div className="anime-inner">
                <div className="anime-imgs-cont">
                  <div className="anime-img-div flex-all">
                    <div className="anime-img">
                      <Image src="/blueberry cake.png" fill />
                    </div>
                  </div>
                  <div className="anime-img-div flex-all">
                    <div className="anime-img">
                      <Image src="/blueberry cake.png" fill />
                    </div>
                  </div>
                  <div className="anime-img-div flex-all">
                    <div className="anime-img">
                      <Image src="/blueberry cake.png" fill />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScrollHome