import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { lazy, Suspense } from 'react' 
import Loader from './components/loader'

const Dashboard = lazy(() => import('./Pages/Dashboard'))
const Products = lazy(() => import('./Pages/Products')) 
const Transaction = lazy(() => import('./Pages/Transaction'))
const Customers = lazy(() => import('./Pages/Customers'))

const App = () => {
  return (
    <Router>
      {/* Header*/}
      <Suspense fallback={<Loader/>}>
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          <Route path="/admin/product" element={<Products />}></Route>
          <Route path="/admin/customer" element={<Customers />}></Route>
          <Route path="/admin/transaction" element={<Transaction />}></Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App