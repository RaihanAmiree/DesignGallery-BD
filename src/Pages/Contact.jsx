import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { ToastContainer, toast, Bounce } from 'react-toastify';

const Contact = () => {

  const [user, setUser] = useState(
    {
      name: '', email: '', tel: '', message: '',
    }
  )

  const data = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault(); // prevent page refresh

    emailjs.send(
      'service_u63yi7u',      // replace with your EmailJS service ID
      'template_ydnvupd',     // replace with your EmailJS template ID
      user,                   // the data object
      'ciLeGRFuNRHyrMN_v'       // replace with your EmailJS public key
    )
      .then((res) => {
        toast.success('Message sent successfully!');
        setUser({ name: '', email: '', tel: '', message: '' }); // reset form
      })
      .catch((err) => {
        toast.error('Failed to send message, try again.');
        console.error(err);
      });
  };

  return (
    <div
      className="bg-white min-h-screen py-16 px-4 md:px-12 lg:px-24 font-sans"
      style={{
        animation: 'fadeInUp 0.6s ease-out forwards',
      }}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">

        {/* Contact Grid */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Info Box */}
          <div className="w-full lg:w-1/3 border border-gray-200 rounded-lg p-8 space-y-8 shadow-sm transition-all duration-300 hover:shadow-lg bg-white">

            {/* Call Section */}
            <div className="group">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#001f3f] p-3 rounded-full text-white transition-transform duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 0 1-7.143-7.143c-.155-.441.011-.928.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">Call To Us</h3>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>We are available 24/7, 7 days a week.</p>
                <p className="font-semibold text-black">Phone: +880 1849-853447</p>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Write Section */}
            <div className="group">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#001f3f] p-3 rounded-full text-white transition-transform duration-300 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg">Write To Us</h3>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Fill out our form and we will contact you within 24 hours.</p>
                <p>Emails: designgallerybd7@gmail.com</p>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Social Icons Section */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-bold text-gray-400 tracking-widest">Follow Us</h4>
              <div className="flex gap-3">
                {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-all duration-300 hover:bg-[#001f3f] hover:text-[#FFD700] hover:-translate-y-1 hover:border-[#DB4444]"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form Box - CHANGED TO <form> */}
          <form 
            onSubmit={sendEmail} 
            className="w-full lg:w-2/3 border border-gray-200 rounded-lg p-8 shadow-sm bg-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <input
                required
                type="text"
                name='name'
                value={user.name}
                onChange={data}
                placeholder="Your Name *"
                className="bg-gray-100 p-4 rounded outline-none border border-transparent transition-all duration-300 focus:bg-white focus:border-[#001f3f] focus:ring-0"
              />
              <input
                required
                type="email"
                name='email'
                value={user.email}
                onChange={data}
                placeholder="Your Email *"
                className="bg-gray-100 p-4 rounded outline-none border border-transparent transition-all duration-300 focus:bg-white focus:border-[#001f3f] focus:ring-0"
              />
              <input
                required
                type="tel"
                placeholder="Your Phone *"
                name='tel'
                value={user.tel}
                onChange={data}
                className="bg-gray-100 p-4 rounded outline-none border border-transparent transition-all duration-300 focus:bg-white focus:border-[#001f3f] focus:ring-0"
              />
            </div>

            <textarea
              required
              name='message'
              value={user.message}
              onChange={data}
              placeholder="Your Message"
              rows="8"
              className="w-full bg-gray-100 p-4 rounded outline-none border border-transparent transition-all duration-300 focus:bg-white focus:border-[#001f3f] focus:ring-0 mb-6 resize-none"
            ></textarea>

            <div className="flex justify-end">
              <button 
                type="submit" 
                className="cursor-pointer bg-[#023d77] text-white px-12 py-4 rounded font-medium transition-all duration-300 hover:bg-[#002d5a] active:scale-95 shadow-md"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Map Section */}
        <div className="max-w-7xl mx-auto mt-12 px-4 md:px-0">
          <div className="w-full h-112.5 rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14602.254272231175!2d90.3654215!3d23.7985508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1700000000000"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            ></iframe>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default Contact;