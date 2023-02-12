import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

const CakesByTypes = ({ cakesByType }) => {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <div className="nav-detail-cont">
        <div className="nav-sub-cont">
          {cakesByType.map((cakes, index) => {
            return (
              <Link href={`/cakes${cakes.link}` || "/404"} key={index}><div  style={{ backgroundColor: selected == index ? "rgba(0,0,0,0.1)" : "white" }} className="nav-sub-item" onMouseEnter={() => { setSelected(index) }}>
                {cakes.name}
              </div>
              </Link>
            )
          })}
        </div>
        <div className="nav-right-cont">
          {selected == null ? <>
            <div className="nav-img-cont flex-all">
              <Image src={"/navbar/cakesByFlavour/main-pic.png"} fill />
            </div>
          </> : <>
            <div className="nav-right-inner-cont">

              {cakesByType.map((type, index) => {
                return (
                  <div className='inner-div' key={index}>
                    {selected == index && type.cakes.map((cake, index) => {
                      return (
                        
                            <div className="caken-cont" key={index}>
                              <div className="caken-img-cont">
                                <Image fill={true} src={cake.imgsrc} placeholder="blur" alt={cake.name} />
                              </div>
                              <div className="caken-detials">
                                <div className="caken-name">{cake.name}</div>
                                <div className="caken-price">Rs {cake.price}</div>
                              </div>
                            </div>

                      )
                    })}
                  </div>
                )
              }
              )}
            </div>
            <Link href={""}><div className="load-more-nav-btn t3 flex-all">View all</div></Link>
          </>
          }
        </div>

      </div>
    </>
  )
}

export default CakesByTypes