import HomeCart from '../components/home/HomeCart'
import Flavours from '../components/home/Flavours'
import VideoSection from '../components/home/VideoSection'
import Navbar from '../components/navbar/Navbar'
import Points from '../components/Points'
import { auth, onAuthStateChanged, query, getDoc, collection, db, getDocs, where } from '../components/firebase'
import Footer from '../components/home/Footer'
import Landing from '../components/home/Landing'
import ScrollHome from '../components/home/ScrollHome'
import { useState, useEffect } from 'react'

export default function Home() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user.uid);
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        let tempuser = {};
        querySnapshot.forEach((doc) => {
          tempuser = doc.data();
        });
        setUser(tempuser)
        console.log(tempuser,"in index");


      } else {
        setUser(null)
      }
    });
  }, [])

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Landing />
      <Points />
      {/* <CartContainer /> */}
      <Flavours user={user} setUser={user} />
      {/* <HomeCart /> */}
      {/* <VideoSection /> */}
      <ScrollHome />
      <Footer />
    </>
  )
}
