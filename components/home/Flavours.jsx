import React from 'react'
import Image from 'next/image'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase'
import { useState } from 'react';


const Flavours = ({user,setUser}) => {

  const grids = [
    {
      cake: "/blueberry cake.png",
      fruit: "/blueberry fruit.png"
    },
    {
      cake: "/butterscotch cake.png",
      fruit: "/butterscotch fruit.png"
    },
    {
      cake: "/mixed fruit cake.png",
      fruit: "/mixed fruit fruit.png"
    },
    {
      cake: "/kaju katli cake.png",
      fruit: "/kaju katli fruit.png"
    },
    {
      cake: "/choc cake.png",
      fruit: "/choc fruit.png"
    },
    {
      cake: "/strawberry cake.png",
      fruit: "/strawberry fruit.webp"
    },
    {
      cake: "/rasmalai cake.png",
      fruit: "/rasmalai fruit.png"
    },
    {
      cake: "/pineapple cake.png",
      fruit: "/pineapple fruit.png"
    }
  ]
  let logout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <>
      <div className="flavour-grid">
        <div className="four-grid grid-one">
          {grids.slice(0, 4).map((grid, index) => {
            return (
              <div className="grid" key={index} >

                <div className="fr-cc pos-abs-cn">
                  <div className="pos-rel-full">
                    <div className='fr-cont'>
                      <div className="fruit-img-cont">
                        <Image fill={true} src={grid.fruit} />
                      </div>

                    </div>
                    <div className="cake-img-cont-grid pos-abs-full">
                      <div className="cakeimg-in">
                        <Image fill={true} src={grid.cake} />
                      </div>
                    </div>
                  </div>

                </div>

                <div className='cake-grid-cont pos-abs-cn'>
                  <div className="pos-rel-full">
                    <Image className='img-contain' fill={true} src="/blueberry cake.png" />
                  </div>
                </div>
              </div>

            )
          })}
        </div>


        <div className="four-grid">
          {grids.slice(4, 8).map((grid, index) => {
            return (
              <div className="grid" key={index} >

                <div className="fr-cc pos-abs-cn">
                  <div className="pos-rel-full">
                    <div className='fr-cont'>
                      <div className="fruit-img-cont">
                        <Image fill={true} src={grid.fruit} />
                      </div>

                    </div>
                    <div className="cake-img-cont-grid pos-abs-full">
                      <div className="cakeimg-in">
                        <Image fill={true} src={grid.cake} />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            )
          })}
        </div>
      </div>
    </>
  )
}

export default Flavours