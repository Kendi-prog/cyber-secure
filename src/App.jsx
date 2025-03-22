import { Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";

import { checkUserSession } from "../../src/store/user/user.action";
import Spinner from "../../src/components/spinner/spinner.component";
import { GlobalStyle } from "./global.styles";


const Navigation = lazy(() => import("../../src/routes/navigation/navigation.component"));
const Checkout = lazy(() => import("../../src/routes/checkout/checkout.component"));
const Shop = lazy(() => import('../../src/routes/shop/shop.component'));
const Home = lazy(() => import("../../src/routes/home/home.component"));
const Authentication = lazy(() => import("../../src/routes/authentication/authentication"));



const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(checkUserSession());

  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner/>}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={ <Navigation />}>
          <Route index element={ <Home />} />
          <Route path="shop/*" element={ <Shop />} />
          <Route path="auth" element={ <Authentication />} />
          <Route path="checkout" element={ <Checkout />} />
        </Route>
      </Routes>
    </Suspense>
   
  );
}

export default App;
