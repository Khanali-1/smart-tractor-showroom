import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import DashboardLayout from "./layouts/dashboardlayout";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

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