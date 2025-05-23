import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { lazy, Suspense } from 'react' 
import Loader from './components/loader'
import Header from './components/header'


const Home = lazy(() => import('./Pages/Home'))
const Seacrh = lazy(() => import('./Pages/Search'))
const Cart = lazy(() => import('./Pages/Cart'))
const Shipping = lazy(() => import('./Pages/Shipping'))


const Dashboard = lazy(() => import('./Pages/Dashboard'))
const Products = lazy(() => import('./Pages/Products')) 
const Transaction = lazy(() => import('./Pages/Transaction'))
const Customers = lazy(() => import('./Pages/Customers'))
const NewProduct = lazy(() => import('./Pages/Management/NewProduct'))
const ProductManagement = lazy(() => import('./Pages/Management/ProductManagement'))
const TransactionManagement = lazy(() => import('./Pages/Management/TransactionManagement'))
const BarCharts = lazy(() => import('./Pages/charts/BarCharts'))
const LineCharts = lazy(() => import('./Pages/charts/LineCharts'))
const PieCharts = lazy(() => import('./Pages/charts/PieCharts'))

const StopWatch = lazy(() => import('./Pages/apps/Stopwatch'))
const Coupon = lazy(() => import('./Pages/apps/Coupon'))
const Toss = lazy(() => import('./Pages/apps/Toss'))


const App = () => {
  return (
    <Router>
      {/* Header*/}
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Seacrh />} />
          <Route path="/cart" element={<Cart />} />

          <Route>
            <Route path="/shipping" element={<Shipping />} />
          </Route>

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
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App