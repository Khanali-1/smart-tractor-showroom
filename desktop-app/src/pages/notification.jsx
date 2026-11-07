import {
  Bell,
  AlertTriangle,
  FileText,
  CreditCard,
} from "lucide-react";

import { Link } from "react-router-dom";


function NotificationPanel() {

  // Temporary frontend notifications
  // Baad mein ye data backend API se ayega
  const notifications = [
    {
      id: 1,
      type: "low_stock",
      title: "Low Stock Alert",
      message: "Massey Ferguson 385 stock is running low.",
      link: "/tractor",
    },
    {
      id: 2,
      type: "leave",
      title: "Pending Leave Request",
      message: "An employee has submitted a leave request.",
      link: "/leave",
    },
    {
      id: 3,
      type: "payment",
      title: "Pending Payment",
      message: "Invoice INV-0001 has remaining payment.",
      link: "/payments",
    },
  ];


  const getIcon = (type) => {

    if (type === "low_stock") {
      return (
        <div className="rounded-lg bg-red-50 p-2">
          <AlertTriangle
            size={18}
            className="text-red-600"
          />
        </div>
      );
    }


    if (type === "leave") {
      return (
        <div className="rounded-lg bg-orange-50 p-2">
          <FileText
            size={18}
            className="text-orange-600"
          />
        </div>
      );
    }


    if (type === "payment") {
      return (
        <div className="rounded-lg bg-blue-50 p-2">
          <CreditCard
            size={18}
            className="text-blue-600"
          />
        </div>
      );
    }


    return (
      <div className="rounded-lg bg-slate-100 p-2">
        <Bell
          size={18}
          className="text-slate-600"
        />
      </div>
    );
  };


  return (

    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-blue-50 p-2">

            <Bell
              size={20}
              className="text-blue-600"
            />

          </div>


          <div>

            <h2 className="font-semibold text-slate-800">
              Notifications
            </h2>

            <p className="mt-0.5 text-xs text-slate-500">
              {notifications.length} notification(s)
            </p>

          </div>

        </div>

      </div>


      {/* ================================= */}
      {/* NOTIFICATIONS */}
      {/* ================================= */}

      <div>

        {notifications.length === 0 ? (

          <div className="p-8 text-center">

            <Bell
              size={35}
              className="mx-auto mb-3 text-slate-300"
            />

            <p className="font-medium text-slate-600">
              No notifications
            </p>

          </div>

        ) : (

          notifications.map((notification) => (

            <Link
              key={notification.id}
              to={notification.link}
              className="flex gap-3 border-b border-slate-100 px-5 py-4 transition hover:bg-slate-50"
            >

              {/* ICON */}

              {getIcon(notification.type)}


              {/* CONTENT */}

              <div className="min-w-0 flex-1">

                <p className="text-sm font-semibold text-slate-800">
                  {notification.title}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {notification.message}
                </p>

              </div>

            </Link>

          ))

        )}

      </div>

    </div>
  );
}


export default NotificationPanel;