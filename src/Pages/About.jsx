import { useEffect, useRef } from 'react';
import { IoRocketOutline, IoShieldCheckmarkOutline, IoPeopleOutline } from "react-icons/io5";
import AboutBanner from '../Components/AboutBanner';
import AboutHero from '../Components/AboutHero';
import Accordion from '../Components/Accordion';
import Identity from '../Components/Identity';


const About = () => {


  return (
    <div className="">
     <AboutHero></AboutHero>
<AboutBanner></AboutBanner>
<Accordion></Accordion>
<Identity></Identity>
<div className="max-w-7xl mx-auto mt-12 px-4 md:px-0 py-10">
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
  );
};

export default About;