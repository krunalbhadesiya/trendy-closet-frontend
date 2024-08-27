// src/MainApp.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Header from './components/Header';
import Footer from './components/Footer';
import PreLoader from './components/PreLoader';
import Home from './pages/Home';
import Store from './pages/Store';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import { Toaster } from "@/components/ui/toaster";
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import PrivateRoute from './components/PrivateRoute';
import ForgetPassword from './pages/auth/forget';
// import AuthHeader from './components/AuthHeader';
import Auth from './pages/auth/auth';
import AdminContactFormData from './pages/adminDashboard/ContactFormData/ContactFormData';
import AdminOrder from './pages/adminDashboard/Order/Order';
import AdminProduct from './pages/adminDashboard/Product/Product';
import AddProduct from './pages/adminDashboard/Product/AddProduct/AddProduct';
import { useAuth } from './hooks/useAuth';
import UpdateProduct from './pages/adminDashboard/Product/UpdateProduct/[id]';
import AdminReview from './pages/adminDashboard/Reviews/Reviews';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import UserDashboard from './pages/userDashboard/userDashboard';
import Cart from './pages/userDashboard/Cart/Cart';
import AddOrder from './pages/userDashboard/Order/AddOrder/AddOrder';
import { Helmet } from 'react-helmet';
import Oreder from './pages/userDashboard/Order/Order';
// import HeaderSwitcher from './components/HeaderSwitcher';
import Products from './pages/store/[id]';
import Policies from './pages/Policies';
import Header from './components/Header';
import OrderData from './pages/adminDashboard/Order/OrderData/View/[id]';
import OrderDataEdit from './pages/adminDashboard/Order/OrderData/Edit/[id]';

function MainApp() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <Router>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Trendy Closet </title>
        <meta name="description" content="Welcome to Trendy Closet. We provide web development, software development, UI/UX design, and IT consulting services." />
        <meta name="keywords" content="Trendy Closet, web development, software development, UI/UX design, IT consulting" />
        <meta name="author" content="Trendy Closet" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Home | Trendy Closet" />
        <meta property="og:description" content="Welcome to Trendy Closet - Your One-Stop Solution for web development, software development, UI/UX design, and IT consulting services." />
        {/* <meta property="og:url" content="https://lotusgroup.vercel.app//home" />
          <meta property="og:image" content="https://lotusgroup.vercel.app/logo.png" /> */}
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forget" element={<ForgetPassword />} />
        <Route path="/store" element={<Store />} />
        <Route
          path="products/:id"
          element={<Products/>}
        />
        <Route
          path="admin/dashboard"
          element={
            <PrivateRoute adminRoute={true}>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="admin/dashboard/contactformdata"
          element={
            <PrivateRoute adminRoute={true}>
              <AdminContactFormData />
            </PrivateRoute>
          }
        />
        <Route
          path="admin/dashboard/order"
          element={
            <PrivateRoute adminRoute={true}>
              <AdminOrder />
            </PrivateRoute>
          }
        />
        <Route
          path="admin/dashboard/order/edit/:id"
          element={
            <PrivateRoute adminRoute={true}>
              <OrderDataEdit />
            </PrivateRoute>
          }
        />
        <Route
          path="admin/dashboard/order/:id"
          element={
            <PrivateRoute adminRoute={true}>
              <OrderData />
            </PrivateRoute>
          }
        />
        <Route
          path="admin/dashboard/product"
          element={
            <PrivateRoute adminRoute={true}>
              <AdminProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="admin/dashboard/product/add"
          element={
            <PrivateRoute adminRoute={true}>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="admin/dashboard/product/update/:id"
          element={
            <PrivateRoute adminRoute={true}>
              <UpdateProduct />
            </PrivateRoute>
          }
        />
        <Route
          path="admin/dashboard/reviews"
          element={
            <PrivateRoute adminRoute={true}>
              <AdminReview />
            </PrivateRoute>
          }
        />
        <Route
          path="user/dashboard"
          element={
            <PrivateRoute adminRoute={false}>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="user/dashboard/order"
          element={
            <PrivateRoute adminRoute={false}>
              <Oreder />
            </PrivateRoute>
          }
        />
        <Route
          path="user/dashboard/order/add"
          element={
            <PrivateRoute adminRoute={false}>
              <AddOrder />
            </PrivateRoute>
          }
        />
        <Route
          path="user/dashboard/cart"
          element={
            <PrivateRoute adminRoute={false}>
              <Cart />
            </PrivateRoute>
          }
        />
      </Routes>
      {isAuthenticated ? <div></div> : <Footer />}

      <Toaster />
    </Router>
  );
}

export default MainApp;
