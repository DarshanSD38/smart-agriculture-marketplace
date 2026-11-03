import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Public & Auth Pages
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import NotificationsPage from '../pages/NotificationsPage';

// Farmer Pages
import FarmerDashboard from '../pages/farmer/FarmerDashboard';
import FarmerProducts from '../pages/farmer/FarmerProducts';
import FarmerAddProduct from '../pages/farmer/FarmerAddProduct';
import FarmerEditProduct from '../pages/farmer/FarmerEditProduct';
import FarmerInventory from '../pages/farmer/FarmerInventory';
import FarmerOrders from '../pages/farmer/FarmerOrders';
import FarmerAiPrice from '../pages/farmer/FarmerAiPrice';
import FarmerDemandPrediction from '../pages/farmer/FarmerDemandPrediction';
import FarmerSurplus from '../pages/farmer/FarmerSurplus';
import FarmerCropHealth from '../pages/farmer/FarmerCropHealth';
import FarmerCropRecommendation from '../pages/farmer/FarmerCropRecommendation';
import FarmerFindLabour from '../pages/farmer/FarmerFindLabour';
import FarmerAnalytics from '../pages/farmer/FarmerAnalytics';
import FarmerProfile from '../pages/farmer/FarmerProfile';

// Customer Pages
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import CustomerMarketplace from '../pages/customer/CustomerMarketplace';
import CustomerRecommendations from '../pages/customer/CustomerRecommendations';
import CustomerSmartBasket from '../pages/customer/CustomerSmartBasket';
import CustomerPriceComparison from '../pages/customer/CustomerPriceComparison';
import CustomerGroupBuying from '../pages/customer/CustomerGroupBuying';
import CustomerOrders from '../pages/customer/CustomerOrders';
import CustomerOrderTrack from '../pages/customer/CustomerOrderTrack';
import CustomerNearbyFarmers from '../pages/customer/CustomerNearbyFarmers';
import CustomerReviews from '../pages/customer/CustomerReviews';
import CustomerProfile from '../pages/customer/CustomerProfile';
import CheckoutPage from '../pages/customer/CheckoutPage';
import OrderConfirmationPage from '../pages/customer/OrderConfirmationPage';
import ProductDetailPage from '../pages/customer/ProductDetailPage';

// Labour Pages
import LabourDashboard from '../pages/labour/LabourDashboard';
import LabourJobSearch from '../pages/labour/LabourJobSearch';
import LabourApplications from '../pages/labour/LabourApplications';
import LabourAvailability from '../pages/labour/LabourAvailability';
import LabourProfile from '../pages/labour/LabourProfile';

// Marketplace (Agri-Input)
import AgriInputMarketplace from '../pages/marketplace/AgriInputMarketplace';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminProducts from '../pages/admin/AdminProducts';
import AdminOrders from '../pages/admin/AdminOrders';
import AdminJobs from '../pages/admin/AdminJobs';
import AdminReviews from '../pages/admin/AdminReviews';
import AdminAnalytics from '../pages/admin/AdminAnalytics';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/marketplace" element={<CustomerMarketplace />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/agri-input" element={<AgriInputMarketplace />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Route>

      {/* Farmer Dashboard with DashboardLayout */}
      <Route path="/farmer" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/farmer/dashboard" replace />} />
        <Route path="dashboard" element={<FarmerDashboard />} />
        <Route path="products" element={<FarmerProducts />} />
        <Route path="add-product" element={<FarmerAddProduct />} />
        <Route path="edit-product/:id" element={<FarmerEditProduct />} />
        <Route path="inventory" element={<FarmerInventory />} />
        <Route path="orders" element={<FarmerOrders />} />
        <Route path="ai-price" element={<FarmerAiPrice />} />
        <Route path="demand-prediction" element={<FarmerDemandPrediction />} />
        <Route path="surplus" element={<FarmerSurplus />} />
        <Route path="crop-health" element={<FarmerCropHealth />} />
        <Route path="crop-recommendation" element={<FarmerCropRecommendation />} />
        <Route path="find-labour" element={<FarmerFindLabour />} />
        <Route path="analytics" element={<FarmerAnalytics />} />
        <Route path="profile" element={<FarmerProfile />} />
      </Route>

      {/* Customer Dashboard with DashboardLayout */}
      <Route path="/customer" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/customer/dashboard" replace />} />
        <Route path="dashboard" element={<CustomerDashboard />} />
        <Route path="nearby-farmers" element={<CustomerNearbyFarmers />} />
        <Route path="recommendations" element={<CustomerRecommendations />} />
        <Route path="basket" element={<CustomerSmartBasket />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders/confirmation/:id" element={<OrderConfirmationPage />} />
        <Route path="price-comparison" element={<CustomerPriceComparison />} />
        <Route path="group-buying" element={<CustomerGroupBuying />} />
        <Route path="orders" element={<CustomerOrders />} />
        <Route path="orders/track/:id" element={<CustomerOrderTrack />} />
        <Route path="reviews" element={<CustomerReviews />} />
        <Route path="profile" element={<CustomerProfile />} />
      </Route>

      {/* Labour Dashboard with DashboardLayout */}
      <Route path="/labour" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/labour/dashboard" replace />} />
        <Route path="dashboard" element={<LabourDashboard />} />
        <Route path="jobs" element={<LabourJobSearch />} />
        <Route path="applications" element={<LabourApplications />} />
        <Route path="availability" element={<LabourAvailability />} />
        <Route path="profile" element={<LabourProfile />} />
      </Route>

      {/* Admin Dashboard with DashboardLayout */}
      <Route path="/admin" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="jobs" element={<AdminJobs />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="analytics" element={<AdminAnalytics />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

