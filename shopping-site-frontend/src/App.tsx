import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react' ;
import Loader from './components/loader';
import Header from './components/header';
import {Toaster} from "react-hot-toast";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { userExist, userNotExist } from './redux/reducer/userReducer';
import { getUser } from './redux/api/userAPI';
import type { UserReducerInitialState } from './types/reducer-types';
import ProtectedRoute from './components/protected-route';

const Home = lazy(() => import('./Pages/Home'));
const Seacrh = lazy(() => import('./Pages/Search'));
const Cart = lazy(() => import('./Pages/Cart'));
const Shipping = lazy(() => import('./Pages/Shipping'));
const Login = lazy(() => import('./Pages/Login'));
const Orders = lazy(() => import('./Pages/Orders'));
const OrderDetails = lazy(() => import('./Pages/Orderdetails'));


const Dashboard = lazy(() => import('./Pages/Dashboard'));
const Products = lazy(() => import('./Pages/Products'));
const Transaction = lazy(() => import('./Pages/Transaction'));
const Customers = lazy(() => import('./Pages/Customers'));
const NewProduct = lazy(() => import('./Pages/Management/NewProduct'));
const ProductManagement = lazy(() => import('./Pages/Management/ProductManagement'));
const TransactionManagement = lazy(() => import('./Pages/Management/TransactionManagement'));
const BarCharts = lazy(() => import('./Pages/charts/BarCharts'));
const LineCharts = lazy(() => import('./Pages/charts/LineCharts'));
const PieCharts = lazy(() => import('./Pages/charts/PieCharts'));

const StopWatch = lazy(() => import('./Pages/apps/Stopwatch'));
const Coupon = lazy(() => import('./Pages/apps/Coupon'));
const Toss = lazy(() => import('./Pages/apps/Toss'));

const NotFound = lazy(() => import('./Pages/NotFound'));


const App = () => {

  const { user,loading} = useSelector((state: { userReducer: UserReducerInitialState}) => state.userReducer);

  const dispatch = useDispatch();

  useEffect(() => {

    onAuthStateChanged(auth,async(user) => {
      if(user){
        const data = await getUser(user.uid);

        dispatch(userExist(data.user));
      }else{
        dispatch(userNotExist());
      }
    })
  },[]);

  return loading ? (
    <Loader />
  ) : (
    <Router>
      {/* Header*/}
      <Header user={user} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Seacrh />} />
          <Route path="/cart" element={<Cart />} />

          <Route>
            <Route
              path="/login"
              element={
                <ProtectedRoute isAuthenticated={user ? false : true}>
                  <Login />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route
            element={<ProtectedRoute isAuthenticated={user ? true : false} />}
          >
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders" element={<OrderDetails />} />
          </Route>

          <Route element={<ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role === "admin" ? true : false}/>}>
            <Route path="/admin/dashboard" element={<Dashboard />}></Route>
            <Route path="/admin/product" element={<Products />}></Route>
            <Route path="/admin/customer" element={<Customers />}></Route>
            <Route path="/admin/transaction" element={<Transaction />}></Route>

            <Route path="/admin/chart/bar" element={<BarCharts />}></Route>
            <Route path="/admin/chart/pie" element={<PieCharts />}></Route>
            <Route path="/admin/chart/line" element={<LineCharts />}></Route>

            <Route path="/admin/app/stopwatch" element={<StopWatch />}></Route>
            <Route path="/admin/app/Coupon" element={<Coupon />}></Route>
            <Route path="/admin/app/toss" element={<Toss />}></Route>

            <Route path="/admin/product/new" element={<NewProduct />}></Route>
            <Route
              path="/admin/product/:id"
              element={<ProductManagement />}
            ></Route>
            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            ></Route>
          </Route>

          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App