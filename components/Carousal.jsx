import React from 'react'
import Slider from "react-slick";
import Image from 'next/image';
import "slick-carousel/slick/slick.css";
import { GrNext, GrPrevious } from 'react-icons/gr'
import "slick-carousel/slick/slick-theme.css";
import { GrCart } from 'react-icons/gr';
import { BsHandbag, BsFillHandbagFill, BsFillEyeFill, BsFillHeartFill } from 'react-icons/bs'
import Link from 'next/link';


const Carousal = () => {

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        // className={className}
        // className={`${className} carousal-next-arrow arrow`}
        className='arrow next-arr flex-all'
        onClick={onClick}
      >
        <GrNext />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        // className={className}
        className='arrow prev-arr flex-all'
        // style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      >
        <GrPrevious />
      </div>
    );
  }

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  let cakes = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]

  return (
    <>
      <Slider {...settings}>
        {cakes.map((cake, index) => {
          return (
            <div className='cake-cont t3' >
            <div className="cake-abs">
              <div className="cake-addcart cake-sidediv t3 flex-all" >
                <div className="circle-inner t3 primary-btn flex-all">
                  <BsFillHandbagFill />
                </div>
              </div>
              <div className="cake-addcart cake-sidediv t3 flex-all" style={{ transitionDelay: ".1s" }}>
                <div className="circle-inner t3 primary-btn flex-all" onClick={() => { setCake(cake) }}>
                  <BsFillEyeFill />
                </div>
              </div>
              <div className="cake-addcart cake-sidediv t3" style={{ transitionDelay: ".2s" }}>
                <div className="circle-inner t3 primary-btn flex-all">
                  <BsFillHeartFill />
                </div>
              </div>

            </div>
            <Link key={index} href={cake.id ? `/product/cake/${cake.id}` : "/404"}>
              <div className="cake-img-cont">
                <div className="quick-view-cont flex-all t3" onClick={() => { setCake(cake) }}>Buy now</div>
                <Image src={cake.imgsrc} fill  />
              </div>
            </Link>
            <Link key={index} href={cake.id ? `/product/cake/${cake.id}` : "/404"}>
              <div className="cake-details-cont">
                <div className="cake-name">{cake.name}</div>
                <div className="cake-cut-price">Rs 500</div>
                <div className="cake-price-cont"><div className="cake-price">Rs {cake.price}</div><div className="cake-dot"></div><div className="cake-min-kg">Half kg</div></div>
              </div>
            </Link>
          </div>
          )
        })}
      </Slider>
    </>
  )
}

export default Carousal