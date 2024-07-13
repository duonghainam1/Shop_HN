
import { Route, Routes } from 'react-router-dom'
import LayOutWebsite from './pages/(website)/LayOutWebsite'
import LayOutAdmin from './pages/(dashboard)/LayOutAdmin'
import HomePage from './pages/(website)/home/HomePage'
import ShopPage from './components/ShopPages/ShopPage'
import Cart from './pages/(website)/cart/Cart'
import ProductsDetails from './components/ProductsDetails/ProductsDetails'
import CheckOut from './pages/(website)/CheckOut/CheckOut'

import ListProducts from './pages/(dashboard)/products/_components/listProducts'
import { Toaster } from "@/components/ui/toaster"
import CategoryDetails from './pages/(website)/product/category/categoryDetails'
import ListCategory from './pages/(dashboard)/category/ListCategory'
import AddCategory from './pages/(dashboard)/category/addCategory'
import UpdateCategory from './pages/(dashboard)/category/updateCategory'
import SignIn from './pages/(Auth)/SignIn'
import SignUp from './pages/(Auth)/SignUp'
import FormProduct from './pages/(dashboard)/products/_components/Form'
import List_Order from './pages/(dashboard)/orders/_component/List_Order'
import Order_Detail from './pages/(dashboard)/orders/_component/Order_Detail'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<LayOutWebsite />}>
          <Route index element={<HomePage />} />
          <Route path='shop' element={<ShopPage />} />
          <Route path='cart' element={<Cart />} />
          <Route path='category/:id' element={<CategoryDetails />} />
          <Route path='details/:id' element={<ProductsDetails />} />
          <Route path='checkout' element={<CheckOut />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
        </Route>
        <Route path='admin' element={<LayOutAdmin />}>
          <Route index element={<ListProducts />} />
          <Route path='products' element={<ListProducts />} />
          <Route path='products/edit/:id' element={<FormProduct />} />
          <Route path='products/add' element={<FormProduct />} />
          <Route path='category' element={<ListCategory />} />
          <Route path='category/add' element={<AddCategory />} />
          <Route path='category/edit/:id' element={<UpdateCategory />} />
          <Route path='orders' element={<List_Order />} />
          <Route path='orders/:id' element={<Order_Detail />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
