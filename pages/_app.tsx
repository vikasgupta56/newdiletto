import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import '../styles/home/flavours.css'
import '../styles/home/landing.css';
import '../styles/homecart.css'
import '../styles/admin.css'
import '../styles/navbar.css'
import '../styles/scrollhome.css'
import '../styles/products.css'
import '../styles/cartpopup.css'
import '../styles/category.css'
import '../styles/checkout/checkout.css'
import '../styles/cakepage.css'
import '../styles/carousal.css'
import '../styles/home/points.css'
import '../styles/cart.css';
import '../styles/home/footer.css';
import '../styles/login.css';
import '../styles/videosection.css';
import '../styles/product/cake/cake.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
