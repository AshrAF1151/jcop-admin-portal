import React from "react";
import useFetchTopCustomers from "../Hooks/useFetchTopCustomers";
import useFetchTopProducts from "../Hooks/useFetchTopProducts";
import useFetchOrderSummary from "../Hooks/useFetchOrderSummary";
import useFetchPendingOrders from "../Hooks/useFetchPendingOrders";
import useFetchLastMonthSales from "../Hooks/useFetchLastMonthSales";
import {
  PlusCircleIcon,
  ChartBarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
  UserCircleIcon,
  DocumentIcon,
  ClockIcon,
  UserMinusIcon,
  UsersIcon,
  CalendarIcon, // Import the CalendarIcon
} from "@heroicons/react/24/outline";
import Card from "./Card";

const CardsSection = () => {
  const {
    totalActiveCustomers,
    invoicesLastYearNoInvoicesThisYear,
    invoicesOver45DaysCount,
    noInvoiceCustomersCount,
    totalCustomers,
    days30Customers,
  } = useFetchTopCustomers();
  const { lastMonthSale } = useFetchLastMonthSales();
  const { totalActiveItems } = useFetchTopProducts();
  const { topSalesman } = useFetchOrderSummary();
  const { pendingOrders } = useFetchPendingOrders();

  const totalSalesAmount = lastMonthSale.reduce(
    (total, sale) => total + sale.totalSalesAmount,
    0
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-1 mb-2 justify-center items-center">
      <Card
        title="Total Pending Orders"
        value={pendingOrders.pendingOrderCount}
        icon={PlusCircleIcon}
      />
      <Card
        title="Last Month Sale"
        value={`$${totalSalesAmount.toFixed(2)}`}
        icon={ChartBarIcon}
      />
      <Card
        title="Total Active Products"
        value={totalActiveItems}
        icon={ShoppingCartIcon}
      />
      <Card
        title="Total Active Customers"
        value={totalActiveCustomers}
        icon={UserGroupIcon}
      />
      <Card
        title="Top Salesman Last Month"
        value={
          topSalesman &&
          typeof topSalesman.Name === "string" &&
          topSalesman.Name.trim() !== ""
            ? topSalesman.Name
            : "None"
        }
        icon={UserCircleIcon}
      />
      <Card
        title="No Invoices This Year"
        value={invoicesLastYearNoInvoicesThisYear}
        icon={DocumentIcon}
      />
      <Card
        title="Invoices Over 45 Days"
        value={invoicesOver45DaysCount}
        icon={ClockIcon}
      />
      <Card
        title="No Invoice Customers"
        value={noInvoiceCustomersCount}
        icon={UserMinusIcon}
      />
      <Card
        title="Last 30 Days Customers"
        value={days30Customers}
        icon={CalendarIcon}
      />
      <Card title="Total Customers" value={totalCustomers} icon={UsersIcon} />
    </div>
  );
};

export default CardsSection;
