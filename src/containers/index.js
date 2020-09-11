/* eslint-disable indent */
// Common
export CoreLayout from './Common/CoreLayout/CoreLayout';
export LoginPage from './Common/LoginPage/LoginPage';
export MainContainer from './Common/MainContainer/MainContainer';
export LoadingDataPage from './Common/LoadingDataPage/LoadingDataPage';

// Sales
  // Orders
export Orders from './Sales/Orders/All/Orders';
export Order from './Sales/Orders/Single/Order';
  // Promotions
export Promotions from './Sales/Promotions/All/Promotions';
export Promotion from './Sales/Promotions/Single/Promotion';
  // Customers
export Customers from './Sales/Customers/All/Customers';
export Customer from './Sales/Customers/New/Customer';
export CustomerProfile from './Sales/Customers/Profile/CustomerProfile';

// Inventory
  // Items
export Items from './Inventory/Items/All/Items';
export Item from './Inventory/Items/Single/Item';
  // Adjustments
export Adjustments from './Inventory/Adjustments/All/Adjustments';
export NewAdjustment from './Inventory/Adjustments/New/NewAdjustment';

// Purchase
  // Orders
export PurchaseOrders from './Purchase/Orders/All/Orders';
export PurchaseOrder from './Purchase/Orders/Single/Order';
  // Suppliers
export Suppliers from './Purchase/Suppliers/All/Suppliers';
export Supplier from './Purchase/Suppliers/Single/Supplier';

// Settings

  // Sales
export Fulfilment from './Settings/Sales/Fulfilment/All/Fulfilment';
export FulfilmentItem from './Settings/Sales/Fulfilment/Single/FulfilmentItem';
export Channels from './Settings/Sales/Channels/Channels';
export ConfigureChannel from './Settings/Sales/Channels/ConfigureChannel/ConfigureChannel';
  // Inventory
export UOM from './Settings/Inventory/UOM/UOM';
export ProductCategories from './Settings/Inventory/ProductCategories/ProductCategories';
export NumerationFormats from './Settings/Inventory/NumerationFormats/NumerationFormats';
  // System
export PriceLists from './Settings/System/PriceLists/All/PriceLists';
export PriceList from './Settings/System/PriceLists/Single/PriceListContainer';
export Users from './Settings/System/Users/Users';
export Locations from './Settings/System/Locations/Locations';
export PaymentTerms from './Settings/System/PaymentTerms/PaymentTerms';
export Taxes from './Settings/System/Taxes/Taxes';
