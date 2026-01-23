import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Using Font Awesome and Ionicons from react-icons
import { FaCheckCircle, FaRegFileAlt, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaRegCalendarAlt } from "react-icons/fa";
import { IoArrowBack, IoPrintOutline, IoBagCheckOutline, IoLocationOutline } from "react-icons/io5";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the order from navigation state
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <IoBagCheckOutline className="text-gray-400 text-6xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No order found!</h2>
        <p className="text-gray-500 mb-8 max-w-sm">
          We couldn't retrieve your order details. This might happen if you refresh the page.
        </p>
        <button
          className="flex items-center gap-2 bg-[#DB4444] text-white px-8 py-3 rounded-md hover:bg-[#E07575] transition-colors font-medium shadow-lg shadow-red-100"
          onClick={() => navigate("/billing")}
        >
          <IoArrowBack /> Go Back to Billing
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfdfd] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Success Banner */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm mb-8 text-center">
          <div className="flex justify-center mb-4">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you, <span className="font-semibold">{order.billing.name}</span>. Your order is being processed.
          </p>
          <div className="mt-6 inline-block bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
            <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Order ID: </span>
            <span className="text-sm font-mono font-bold text-gray-800">{order.id}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content - Order Items */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
                <FaRegFileAlt className="text-gray-400" />
                <h2 className="font-bold text-gray-800">Order Summary</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">{item.title}</span>
                        <span className="text-xs text-gray-400">Quantity: {item.quantity}</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t-2 border-dashed border-gray-100">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-gray-800">Total Amount</span>
                    <span className="text-[#DB4444]">${Number(order.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Customer Details */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <IoLocationOutline className="text-[#DB4444]" /> Delivery Address
              </h3>
              <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
                <p className="font-bold text-gray-900">{order.billing.name}</p>
                {order.billing.company && <p className="italic text-xs">{order.billing.company}</p>}
                <p>{order.billing.address}</p>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaRegCalendarAlt className="text-[#DB4444]" /> Contact Information
              </h3>
              <div className="text-sm text-gray-600 space-y-3">
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-gray-400 w-3" /> {order.billing.phone}
                </div>
                <div className="flex items-center gap-3 text-green-600">
                  <FaWhatsapp className="w-3" /> {order.billing.whatsapp}
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-400 w-3" /> {order.billing.email}
                </div>
                <div className="pt-2 text-xs text-gray-400 italic">
                  Ordered on: {order.date}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
         
          <button 
            onClick={() => navigate("/")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3 bg-gray-900 text-white rounded-lg hover:bg-black transition-all font-medium shadow-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;