import HomeScreen from '../Views/Home';
import VendorScreen from '../Views/Vendor';
import VendorFormScreen from '../Views/VendorForm';
import MemberScreen from '../Views/Member';
import MemberFormScreen from '../Views/MemberForm';
import LocationScreen from '../Views/Location';
import LocationFormScreen from '../Views/LocationForm';
import ContactScreen from '../Views/Contact';
import VendorSalesScreen from '../Views/VendorSales';
import VendorSalesFormScreen from '../Views/VendorSalesForm';
import ActivityScreen from '../Views/Activity';
import ActivityViewScreen from '../Views/ActivityView';
import CustomerListScreen from '../Views/CustomerList';
import BookingScreen from '../Views/Booking';
import BookingListScreen from '../Views/BookingList';
import ServicesScreen from '../Views/Services';
import ActivateCustomerScreen from '../Views/CustomerActive';
import DashboardScreen from '../Views/Dashboard';

/* Icon key is optional. It must be of type string and its value should match a valid provider icon
  name.
  To omit the icon just pass null on its value.
*/
export default [
  { id: 1, name: 'Home', screen: HomeScreen, icon: 'home', type: 'H' },
  { id: 2, name: 'Vendor', screen: VendorScreen, icon: 'alpha-v', type: 'Customer' },
  { id: 2, name: 'Add Vendor', screen: VendorFormScreen, icon: 'alpha-v', type: 'Customer' },
  { id: 3, name: 'Member', screen: MemberScreen, icon: 'account-group', type: 'Customer' },
  { id: 3, name: 'Add Member', screen: MemberFormScreen, icon: 'account-group', type: 'Customer' },
  { id: 4, name: 'Location', screen: LocationScreen, icon: 'map-marker', type: 'Customer' },
  { id: 4, name: 'Add Location', screen: LocationFormScreen, icon: 'map-marker', type: 'Customer' },
  { id: 5, name: 'Contact', screen: ContactScreen, icon: 'contacts', type: 'Customer' },
  { id: 6, name: 'Vendor Sales', screen: VendorSalesScreen, icon: 'sale', type: 'Customer' },
  { id: 6, name: 'Add VendorSales', screen: VendorSalesFormScreen, icon: 'sale', type: 'Customer' },
  { id: 7, name: 'Activity', screen: ActivityScreen, icon: 'alpha-a', type: 'Vendor' },
  { id: 8, name: 'ActivityView', screen: ActivityViewScreen, icon: 'clipboard-text', type: 'Vendor' },
  { id: 9, name: 'CustomerList', screen: CustomerListScreen, icon: 'clipboard-text', type: 'Public' },
  { id: 10, name: 'Booking', screen: BookingScreen, icon: 'book', type: 'Public' },
  { id: 11, name: 'BookingList', screen: BookingListScreen, icon: 'book-open', type: 'Public' },
  { id: 12, name: 'ActivateCustomer', screen: ActivateCustomerScreen, icon: 'clipboard-text', type: 'Admin' },
  { id: 13, name: 'Dashboard', screen: DashboardScreen, icon: 'view-dashboard', type: 'Admin' },
  { id: 14, name: 'Services', screen: ServicesScreen, icon: 'information', type: 'H' },
];
