import { Link } from "react-router-dom";
import bg from "../../image/bg.jpg";
import video from '../../image/vedio.mp4' 
import Footer from "./Footer";
import Faq from "./Faq";
import Header from "./Header";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      
      <Header/>
      
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 md:px-16 py-12 items-center">
        
        <div>
          <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-tight">
            Product videos
            <br />
            <span className="text-gray-300 font-semibold">
              in minutes with AI
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-gray-500 max-w-lg">
            Transform raw screen recordings into stunning videos &
            documentation.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              to="/upload"
              className="px-6 py-3 rounded-md bg-pink-500 text-white font-medium text-center"
            >
              Click to Start
            </Link>

            <button className="px-6 py-3 rounded-md border text-pink-500 font-medium">
              Book a Demo
            </button>
          </div>
        </div>

        
        <div className="relative hidden sm:block w-full h-[280px] sm:h-[360px] lg:h-[480px]">
          <img
            src={bg}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
          />
        </div>
      </section>

      
      <section className="w-screen overflow-hidden">
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="
      w-screen
      h-[60vh]
      md:h-[75vh]
      object-cover
      bg-black
    "
        />
      </section>

      <Faq/>
      <Footer />
    </div>
  );
}
