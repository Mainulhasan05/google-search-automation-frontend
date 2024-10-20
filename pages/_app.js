import Navbar from "@/Components/Navbar/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "@/store/store";
export default function App({ Component, pageProps }) {
  const router=useRouter()
  const restictedRoutes=["/login","/register","/create-mess","/join-mess"]
  
  return <Provider store={store}>
  {
    restictedRoutes.includes(router.pathname)?null:<Navbar/>
  }
  <Toaster position="top-right" />
  <Component {...pageProps} />
  
  </Provider>
}
