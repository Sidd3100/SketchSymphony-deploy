import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import  Layout  from './Layout.jsx'
import CenterContent from './pages/Home/CenterContent.jsx'
import Gallery  from './pages/Gallery/Gallery.jsx'
import Register from './pages/Register/Register.jsx'
import About from './pages/About/About.jsx'
import { Route } from 'react-router-dom'
import  Listing  from './pages/Listing/Listing.jsx'
import  Login  from './pages/Login/Login.jsx'
import Profile  from './pages/Profile/Profile.jsx'
import {persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'
import CreateListing from './pages/CreateListing/CreateListing.jsx'
import UpdateListing from './pages/UpdateListing/UpdateListing.jsx'
import ContactUs from './pages/ContactUs/ContactUs.jsx'
import Artists from './pages/Artists/Artists.jsx'
import ViewListings from './pages/ViewListings/ViewListings.jsx'

// const router = createBrowserRouter([
//   {
//     path:'/',
//     element: <Layout/>,
//     children: [
//       {
//         path: "",
//         element: <CenterContent/>
//       },
//       {
//         path: "Gallery",
//         element: <Gallery/>
//       },
//       {
//         path :"Register",
//         element: <Register/>
//       },
//       {
//         path: "About",
//         element: <About/>
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = '/' element = {<Layout/>}>
      <Route path ="" element = {<CenterContent/>}/>
      <Route path ="Gallery" element = {<Gallery/>}/>
      <Route path ="Register" element = {<Register/>}/>
      <Route path ="About" element = {<About/>}/>
      <Route path = "Login" element = {<Login/>}/>
      <Route path='listing/:listingId' element={<Listing />} />
      <Route path='ContactUs' element={<ContactUs/>}/>
      <Route path='Artists' element={<Artists/>}/>
      <Route path = 'artistDetails/:username' element = {<ViewListings/>}/>
      
      <Route element = {<PrivateRoute/>}>
        <Route path = "create-listing" element ={<CreateListing/>}/>
        <Route path = "Profile" element = {<Profile/>}/>
        <Route path = "update-listing/:listingId" element = {<UpdateListing/>}/>
        
      </Route>
      
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <PersistGate loading ={null} persistor={persistor}>
    <RouterProvider router={router}/>
    </PersistGate>
  </Provider>,
)
