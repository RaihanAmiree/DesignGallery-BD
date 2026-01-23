// src/Pages/BillingPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, clearCart } from "../Functions/Cart"; // your cart functions
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const BillingPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(getCart());
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    address: "",
    phone: "",
    whatsapp: "",
    email: "",
  });

  // Update cart items if cart changes elsewhere
  useEffect(() => {
    const handleCartUpdate = () => setCartItems(getCart());
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  // Totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = "Free";
  const total = subtotal;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    // Validate required fields
    const requiredFields = ["name", "address", "phone", "whatsapp", "email"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill ${field} field`);
        return;
      }
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // Create order object
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      items: cartItems,
      total,
      billing: formData,
      status: "Processing",
    };

    // Send email to shopkeeper
    emailjs
      .send(
        "service_u63yi7u", // replace with your EmailJS service ID
        "template_umxquf6", // replace with your EmailJS template ID
        {
          order_id: order.id,
          order_date: order.date,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          customer_whatsapp: formData.whatsapp,
          customer_address: formData.address,
          items: order.items.map(i => `${i.title} x ${i.quantity} - $${i.price}`).join("\n"),
          total_amount: order.total,
        },
        "ciLeGRFuNRHyrMN_v" // replace with your EmailJS public key
      )
      .then(() => {
        toast.success("Order sent to shopkeeper!");
      })
      .catch(() => {
        toast.error("Failed to send order email!");
      });

    // Clear cart
    clearCart();
    setCartItems([]);

    toast.success("Order placed successfully!");

    // Navigate to confirmation page
    navigate("/order-confirmation", { state: { order } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans text-black">
      <h1 className="text-3xl font-medium mb-10">Billing Details</h1>

      <div className="flex flex-col lg:flex-row gap-20">
        {/* Left Side: Form */}
        <div className="flex-1 space-y-6">
          {[
            { label: "Name", name: "name", required: true },
            { label: "Company Name", name: "company", required: false },
            { label: "Address", name: "address", required: true },
            { label: "Phone Number", name: "phone", required: true },
            { label: "WhatsApp Number", name: "whatsapp", required: true },
            { label: "Email Address", name: "email", required: true },
          ].map((field, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <label>
                {field.label}
                {field.required && <span className="text-[#DB4444] ml-1">*</span>}
              </label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="bg-[#F5F5F5] rounded-sm p-3 outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
          ))}
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:w-112.5 pt-8">
          {/* Cart Items */}
          <div className="space-y-6 mb-8">
            {cartItems.length === 0 ? (
              <p className="text-center text-lg text-gray-600">Your cart is empty!</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-contain" />
                    <span>
                      {item.title} x {item.quantity}
                    </span>
                  </div>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))
            )}
          </div>

          {/* Pricing Totals */}
          <div className="space-y-4 border-b border-gray-300 pb-4 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{shipping}</span>
            </div>
          </div>

          <div className="flex justify-between mb-8 font-medium">
            <span>Total:</span>
            <span>${total}</span>
          </div>

          {/* Payment Options */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <input type="radio" name="payment" id="bank" className="w-5 h-5 accent-black" />
              <label htmlFor="bank">Online Payment</label>
            </div>
            <div className="flex items-center gap-3">
              <input type="radio" name="payment" id="cod" className="w-5 h-5 accent-black" defaultChecked />
              <label htmlFor="cod">Cash on delivery</label>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="bg-[#023d77] text-white px-12 py-4 rounded-sm font-medium hover:bg-[#001f3f] w-full sm:w-auto"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
