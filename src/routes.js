/* eslint-disable react/jsx-filename-extension, react/prop-types */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {
	CoreLayout,
	LoginPage,
	LoadingDataPage,
	// Sales
	Order,
	Orders,
	Promotions,
	Promotion,
	Customers,
	Customer,
	CustomerProfile,
	// Inventory
	Items,
	Item,
	Adjustments,
	NewAdjustment,
	// Purchase
	PurchaseOrders,
	PurchaseOrder,
	Suppliers,
	Supplier,
	// Settings
	// Sales
	Channels,
	ConfigureChannel,
	Fulfilment,
	FulfilmentItem,
	// Inventory
	UOM,
	ProductCategories,
	PriceLists,
	PriceList,
	NumerationFormats,
	// System
	Users,
	Rights,
	Roles,
	Locations,
	PaymentTerms,
	Taxes
} from 'containers';

const routes = (getState) => {
	const PrivateRoute = ({ component, ...rest }) => (
		<Route
			{ ...rest }
			render={ (props) => {
				const state = getState();

				if (!state.login.user) {
					return (
						<Redirect
							to={ {
								pathname: '/login',
								state: {
									redirectFrom: props.location.pathname
								}
							} }
						/>
					);
				}

				return state.login.user && state.commonData.commonDataLoaded
					? React.createElement(component)
					: <Redirect
						to={ {
							pathname: '/loading',
							state: {
								redirectFrom: props.location.pathname,
								id: props.match.params.id
							}
						} }
					/>;
			} }
		/>
	);

	return (
		<CoreLayout>
			<Switch>
				<Route exact path="/" component={ LoginPage } />
				<Route path="/login" component={ LoginPage } />
				<Route path="/loading" component={ LoadingDataPage } />
				{ /* Sales */ }
				<PrivateRoute exact path="/sales/orders" component={ Orders } />
				<PrivateRoute exact path="/sales/orders/new" component={ Order } />
				<PrivateRoute exact path="/sales/orders/:id" component={ Order } />
				<PrivateRoute exact path="/sales/promotions" component={ Promotions } />
				<PrivateRoute exact path="/sales/promotions/:id/:code" component={ Promotion } />
				<PrivateRoute exact path="/sales/customers" component={ Customers } />
				<PrivateRoute exact path="/sales/customers/new" component={ Customer } />
				<PrivateRoute exact path="/sales/customers/:id/:name" component={ CustomerProfile } />
				{ /* Inventory */ }
				<PrivateRoute exact path="/inventory/all-items" component={ Items } />
				<PrivateRoute exact path="/inventory/all-items/:id" component={ Item } />
				<PrivateRoute exact path="/inventory/all-items/new" component={ Item } />
				<PrivateRoute exact path="/inventory/adjustments" component={ Adjustments } />
				<PrivateRoute exact path="/inventory/adjustments/new" component={ NewAdjustment } />
				{ /* Purchase */ }
				<PrivateRoute exact path="/purchase/orders" component={ PurchaseOrders } />
				<PrivateRoute exact path="/purchase/orders/:id/:name?" component={ PurchaseOrder } />
				<PrivateRoute exact path="/purchase/suppliers" component={ Suppliers } />
				<PrivateRoute exact path="/purchase/suppliers/:id/:name?" component={ Supplier } />
				{ /* Settings */ }
				{ /* ~Sales */ }
				<PrivateRoute exact path="/settings/sales/channels" component={ Channels } />
				<PrivateRoute exact path="/settings/sales/channels/:channel/:id" component={ ConfigureChannel } />
				<PrivateRoute exact path="/settings/sales/fulfilment" component={ Fulfilment } />
				<PrivateRoute exact path="/settings/sales/fulfilment/:item" component={ FulfilmentItem } />
				{ /* ~Inventory */ }
				<PrivateRoute path="/settings/inventory/uom" component={ UOM } />
				<PrivateRoute path="/settings/inventory/product-categories" component={ ProductCategories } />
				<PrivateRoute path="/settings/inventory/numerics" component={ NumerationFormats } />
				{ /* ~System */ }
				<PrivateRoute path="/settings/system/users" component={ Users } />
				<PrivateRoute path="/settings/system/roles" component={ Roles } />
				<PrivateRoute path="/settings/system/rights" component={ Rights } />
				<PrivateRoute path="/settings/system/locations" component={ Locations } />
				<PrivateRoute path="/settings/system/payment-terms" component={ PaymentTerms } />
				<PrivateRoute path="/settings/system/taxes" component={ Taxes } />
				<PrivateRoute exact path="/settings/system/price-lists" component={ PriceLists } />
				<PrivateRoute exact path="/settings/system/price-lists/:id/:code?" component={ PriceList } />
			</Switch>
		</CoreLayout>
	);
};

export default routes;
