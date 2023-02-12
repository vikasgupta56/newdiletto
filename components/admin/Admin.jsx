import React from 'react'
import Image from 'next/image'
import { AiOutlineShoppingCart,AiOutlineAppstore,AiOutlinePieChart } from 'react-icons/ai';
import {IoAnalytics,IoReorderThreeOutline} from 'react-icons/io5'
import {GoThreeBars} from 'react-icons/go'
import Link from 'next/link';

const Admin = ({ children }) => {
  const options = [
    {
      logo: <AiOutlineAppstore />,
      title: "Dashboard",
    },
    {
      logo: <AiOutlineShoppingCart />,
      title: "Products"
    },
    {
      logo: <GoThreeBars />,
      title: "Categories"
    },
    {
      logo: <AiOutlinePieChart />,
      title: "Graphs"
    },
    {
      logo: <IoAnalytics />,
      title: "Analytics"
    }
    // {
    //   logo: "",
    //   title: "Dashboard"
    // },
  ];
  return (
    <>
      <div className="admin-cont">
        <div className="admin-left">
          <div className="admin-logo flex-all">
            <div className="logo-cont">
              <Link href={"/"}><Image src="/logo/diletto.png" fill /></Link>
            </div>
          </div>
          <div className="options-cont">
            {options.map((option, index) => {
              return (
               <Link href={`/admin/${option.title.toLowerCase()}`} key={index}> 
               <div className="option-item t3" >
                  <div className="option-logo t3">{option.logo}</div>
                  <div className="option-item-title">{option.title || ""}</div>
                </div>
                </Link>
              )
            })}
          </div>
        </div>
        <div className="admin-right">{children}</div>
      </div>
    </>
  )
}

export default Admin