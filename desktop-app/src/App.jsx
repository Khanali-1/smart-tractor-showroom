import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import DashboardLayout from "./layouts/dashboardlayout";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

import Customers from "./pages/customers.jsx";

import Customers360 from './pages/customer360.jsx'

/*import TractorList from "./pages/tractors/TractorList";
import AddTractor from "./pages/tractors/AddTractor";

import CustomerList from "./pages/customers/CustomerList";
import AddCustomer from "./pages/customers/AddCustomer";

import POS from "./pages/sales/POS";
import SalesList from "./pages/sales/SalesList";

import Payments from "./pages/payments/Payments";

import EmployeeList from "./pages/employees/EmployeeList";
import AddEmployee from "./pages/employees/AddEmployee";
import Attendance from "./pages/employees/Attendance";*/
import Tractor from './pages/tractor.jsx';
import Barcode from './pages/barcode.jsx';
import Stockalert from './pages/stockalert.jsx';
import POS from './pages/pos.jsx';

import Billing from './pages/bill.jsx'

import Employees from './pages/employees.jsx'
import Attandance from './pages/attandance.jsx';

import Leave from './pages/leaves.jsx';

import Performance from './pages/performance.jsx';

import SalesReport from './pages/salesReport.jsx'

import FinanceReport from "./pages/financereports.jsx";

import HRReport from "./pages/hrreports.jsx";

import User from './pages/users.jsx';
import Settings from "./pages/setting.jsx";

import Profile from './pages/profile.jsx';

import TractorRecommendation from './pages/tractorrecomandation.jsx';

import Notification from './pages/notification.jsx'



function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard Layout */}
        <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* tractor path*/}
          <Route
            path="/tractor"
            element={<Tractor/>}
          />

          {/* barcode */}
          <Route
          path="/barcode"
          element={<Barcode/>}
          />

          {/* stock-alert */}
          <Route
          path="/stockalert"
          element={<Stockalert/>}
          />

          {/* Customers*/}
          <Route
          path="/customers"
          element={<Customers/>}
          />

          {/* Customers 360*/}
          <Route
          path="/customers360"
          element={<Customers360/>}
          />

           {/* POS / */}
          <Route
          path="/pos"
          element={<POS/>}
          />

             {/* BIlling / */}
          <Route
          path="/billing"
          element={<Billing/>}
          />

          
          {/* Employess / */}
          <Route
          path="/employees"
          element={<Employees/>}
          />

             {/* Attanndace / */}
          <Route
          path="/attandance"
          element={<Attandance/>}
          />

          
          {/* Laave / */}
          <Route
          path="/leave"
          element={<Leave/>}
          />

          {/* Performnace / */}
          <Route
          path="/performance"
          element={<Performance/>}
          />


            {/* Profile */}
          <Route
          path="/profile"
          element={<Profile/>}
          />


              {/* sales report  */}
          <Route
          path="/salesreport"
          element={<SalesReport/>}
          />

          {/* finance report  */}
          <Route
          path="/financereports"
          element={< FinanceReport/>}
          />

          {/* finance report  */}
          <Route
          path="/hrreport"
          element={<HRReport/>}
          /> 

            {/* users  */}
          <Route
          path="/users"
          element={<User/>}
          />

              {/* settings */}
          <Route
          path="/settings"
          element={<Settings/>}
          />


           {/* tractor recomondation */}
          <Route
          path="/recomandation"
          element={<TractorRecommendation/>}
          />


          
           {/* notification */}
          <Route
          path="/notification"
          element={<Notification/>}
          />

            
         




          
          
          
          

       

        </Route>

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;