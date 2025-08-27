import React, { useState } from 'react';
import { Mail, Info, Image, Send } from 'lucide-react';

// VoltacoresLogo component is now defined directly within App.jsx
const VoltacoresLogo = ({ className }) => (
  <img
    src="/logo.png" // Path to your logo image in the 'public' folder
    alt="Voltacores Logo"
    className={className}
    onError={(e) => {
      e.target.onerror = null; // Prevent infinite loop if fallback also fails
      e.target.src = "https://placehold.co/48x48/CCCCCC/000000?text=VL"; // Fallback placeholder
    }}
  />
);

const houses = [
  {
    id: 1,
    title: "Glass Horizon Villa",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&q=80",
    alt: "Modern glass villa with expansive views",
    price: "599k" // Added price
  },
  {
    id: 2,
    title: "Minimalist Sanctuary",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit&w=1920&q=80",
    alt: "Minimalist home interior with clean lines",
    price: "699k" // Added price
  },
  {
    id: 3,
    title: "Lakeside Serenity",
    img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1920&q=80",
    alt: "Luxury home by a serene lake",
    price: "499k" // Added price
  },
  {
    id: 4,
    title: "Urban Sky Loft",
    img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1920&q=80",
    alt: "Sleek urban loft with city views",
    price: "750k" // Default price for other houses
  },
  {
    id: 5,
    title: "Desert Oasis Retreat",
    img: "https://images.unsplash.com/photo-1570191834169-42b7194f1c1f?auto=format&fit=crop&w=1920&q=80",
    alt: "Modern desert home with pool",
    price: "820k" // Default price for other houses
  },
  {
    id: 6,
    title: "Coastal Modern Escape",
    img: "https://images.unsplash.com/photo-1512917774080-bd799238e9de?auto=format&fit=crop&w=1920&q=80",
    alt: "Beachfront modern house",
    price: "910k" // Default price for other houses
  },
];

const categories = ['Luxury', 'Modern', 'Eco-Friendly'];

export default function App() {
  const [houseIndices, setHouseIndices] = useState([0, 1, 2]);
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  // State for submission feedback
  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', 'sending'

  const changeImage = (boxIndex) => {
    setHouseIndices(prevIndices => {
      const newIndices = [...prevIndices];
      let nextIndex = (newIndices[boxIndex] + 1) % houses.length;
      while (newIndices.includes(nextIndex)) {
        nextIndex = (nextIndex + 1) % houses.length;
      }
      newIndices[boxIndex] = nextIndex;
      return newIndices;
    });
  };

  const handleSendEmail = async (e) => {
    e.preventDefault(); // Prevent default form submission

    setSubmissionStatus('sending'); // Set status to indicate sending

    const apiUrl = 'https://voltacores.com/mailApi';
    const formData = {
      name: name,
      email: email,
      message: message,
      subject: 'Inquiry from Voltacores Website', // Added a default subject for the API
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus('success');
        // Clear the form fields on successful submission
        setName('');
        setEmail('');
        setMessage('');
      } else {
        // Attempt to read error message from response body
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
        setSubmissionStatus('error');
        console.error('Email sending failed:', response.status, errorData);
      }
    } catch (error) {
      setSubmissionStatus('error');
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-50 font-sans antialiased">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 via-gray-950 to-black p-6 shadow-xl z-50 transition-all duration-300 ease-in-out">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {/* Logo size increased by stretching width from w-14 to w-16 */}
            <VoltacoresLogo className="w-16 h-14" /> {/* Use the new logo component */}
            <span className="text-4xl font-extrabold tracking-tight text-white relative">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DAA520] transform -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">VOLTACORES</span>
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DAA520] opacity-70 blur-sm transform translate-x-1 translate-y-1">VOLTACORES</span>
            </span>
          </div>
          <nav className="flex space-x-8">
            <a href="#home" className="text-lg font-medium text-gray-300 hover:text-[#FFD700] relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-[#FFD700] before:transition-all before:duration-300 hover:before:w-full">Home</a>
            <a href="#about" className="text-lg font-medium text-gray-300 hover:text-[#FFD700] relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-[#FFD700] before:transition-all before:duration-300 hover:before:w-full">About Us</a>
            <a href="#gallery" className="text-lg font-medium text-gray-300 hover:text-[#FFD700] relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-[#FFD700] before:transition-all before:duration-300 hover:before:w-full">Gallery</a>
            <a href="#contact" className="text-lg font-medium text-gray-300 hover:text-[#FFD700] relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-[#FFD700] before:transition-all before:duration-300 hover:before:w-full">Contact Us</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-24">
        <div
          className="absolute inset-0 bg-cover bg-center filter grayscale opacity-20"
          style={{ backgroundImage: `url(${houses[0].img})` }}
        ></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-tight drop-shadow-lg animate-fade-in-up">
            Your Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DAA520]">Home</span> Awaits.
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto drop-shadow-md animate-fade-in-up delay-200">
            Discover unparalleled luxury and modern living with Voltacores. We craft spaces that inspire.
          </p>
          <div className="flex items-center justify-center mt-8 space-x-4">
            {/* SVG House Icon */}
            <svg className="w-10 h-10 text-[#FFD700] animate-bounce" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 2a8 8 0 018 8c0 2.22-1.28 4.14-3.23 5.15L15 16.59V18h2v2H3v-2h2v-1.41l-1.77-1.44A7.965 7.965 0 012 10a8 8 0 018-8zm0 2a6 6 0 00-6 6c0 1.25.6 2.37 1.55 3.12L7 14.59V16h6v-1.41l1.45-1.47A5.965 5.965 0 0016 10a6 6 0 00-6-6zm-1 9h2V9h-2v4z" clipRule="evenodd" />
            </svg>
            <p className="text-2xl font-bold text-gray-200 drop-shadow-lg">
              Explore our prime locations in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DAA520]">Texas</span>:
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-4 tracking-wide leading-relaxed animate-fade-in-up delay-300">
            Dallas, Richardson, Wylie, Plano, Garland & much more...
          </h1>
          <a href="#gallery" className="mt-10 inline-block bg-gradient-to-r from-[#FFD700] to-[#DAA520] text-gray-950 text-xl font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out animate-fade-in-up delay-400">
            Explore Properties
          </a>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 px-8 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] to-[#DAA520] rounded-3xl transform rotate-3 scale-105 opacity-20 blur-xl"></div>
            <img
              src="/public/house.png"
              alt="Voltacores office interior"
              className="relative rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-5xl font-extrabold text-white mb-8 leading-tight">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DAA520] to-[#FFD700]">Excellence</span> in Every Home.
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              At **Voltacores**, we believe a home is more than just a structure; it's a canvas for life's most precious moments. With an unwavering commitment to architectural innovation and uncompromising quality, we meticulously curate properties that redefine modern living. Our passion lies in connecting discerning individuals with spaces that not only meet their needs but also ignite their aspirations. From concept to completion, every detail is infused with a dedication to timeless design, sustainable practices, and an unparalleled client experience. We don't just sell houses; we facilitate dreams, providing expert guidance and a seamless journey to your perfect abode. Join the Voltacores family and discover a legacy of quality, integrity, and visionary design.
            </p>
            <a href="#contact" className="inline-block bg-gradient-to-r from-[#DAA520] to-[#B8860B] text-gray-950 text-lg font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
              <Mail className="inline-block w-5 h-5 mr-2" /> Talk to Our Experts
            </a>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section id="gallery" className="py-24 px-8 bg-gray-950">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-extrabold text-white mb-16 leading-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#DAA520]">Featured Properties</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {houseIndices.map((index, boxId) => (
              <div
                key={boxId}
                onClick={() => changeImage(boxId)}
                className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group transform hover:scale-105 transition-all duration-500 ease-in-out"
              >
                <img
                  src={houses[index].img}
                  alt={houses[index].alt}
                  className="w-full h-80 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-3xl font-bold text-white leading-tight group-hover:translate-y-0 translate-y-4 transition-transform duration-300 ease-out">
                    {houses[index].title}
                  </h3>
                  {/* Price added here */}
                  <p className="text-xl font-semibold text-[#FFD700] mt-2 drop-shadow">
                    Starting from ${houses[index].price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 px-8 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-5xl font-extrabold text-white mb-8 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DAA520] to-[#FFD700]">Connect</span> With Us
          </h2>
          <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and let's start a conversation about your real estate aspirations.
          </p>

          <form onSubmit={handleSendEmail} className="bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-700 animate-fade-in-up delay-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="relative group">
                <input
                  type="text"
                  id="name"
                  placeholder=" "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="peer w-full p-4 border-2 border-gray-700 rounded-xl bg-gray-900 text-white focus:border-[#FFD700] focus:outline-none transition-all duration-300"
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 top-4 text-gray-400 text-base transition-all duration-300 transform peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-[#FFD700] peer-focus:text-sm peer-placeholder-shown:text-base peer-focus:text-sm"
                >
                  Your Full Name
                </label>
              </div>
              <div className="relative group">
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full p-4 border-2 border-gray-700 rounded-xl bg-gray-900 text-white focus:border-[#FFD700] focus:outline-none transition-all duration-300"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-4 text-gray-400 text-base transition-all duration-300 transform peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-[#FFD700] peer-focus:text-sm peer-placeholder-shown:text-base peer-focus:text-sm"
                >
                  Your Email Address
                </label>
              </div>
            </div>
            <div className="relative group mb-10">
              <textarea
                id="message"
                rows="6"
                placeholder=" "
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="peer w-full p-4 border-2 border-gray-700 rounded-xl bg-gray-900 text-white focus:border-[#FFD700] focus:outline-none resize-none transition-all duration-300"
              ></textarea>
              <label
                htmlFor="message"
                className="absolute left-4 top-4 text-gray-400 text-base transition-all duration-300 transform peer-placeholder-shown:top-4 peer-focus:top-1 peer-focus:text-[#FFD700] peer-focus:text-sm peer-placeholder-shown:text-base peer-focus:text-sm"
                >
                  Your Message / Opinion
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#FFD700] to-[#DAA520] text-gray-950 font-bold text-xl py-4 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2"
                disabled={submissionStatus === 'sending'} // Disable button during sending
              >
                {submissionStatus === 'sending' ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-6 h-6" /> <span>Send Your Thoughts</span>
                  </>
                )}
              </button>
              {submissionStatus === 'success' && (
                <p className="mt-4 text-lg text-green-500 font-semibold">Email sent successfully! Thank you.</p>
              )}
              {submissionStatus === 'error' && (
                <p className="mt-4 text-lg text-red-500 font-semibold">Failed to send email. Please try again later.</p>
              )}
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-950 py-16 px-8 border-t border-gray-800">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 text-center md:text-left">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Voltacores</h3>
              <p className="text-gray-400 leading-relaxed">
                Redefining luxury living through innovative design and unparalleled service. Your journey to exceptional begins here.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300">About Us</a></li>
                <li><a href="#gallery" className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300">Gallery</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300">Contact Us</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Categories</h3>
              <ul className="space-y-3">
                {categories.map((category, i) => (
                  <li key={i}><a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300">{category} Homes</a></li>
                ))}
              </ul>
            </div>

            {/* Legal & Social */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Legal & Connect</h3>
              <ul className="space-y-3 mb-6">
                <li><a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300">Terms of Service</a></li>
              </ul>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"><img src="https://placehold.co/24x24/FFFFFF/000000?text=S" alt="Social Icon" /></a>
                <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"><img src="https://placehold.co/24x24/FFFFFF/000000?text=I" alt="Social Icon" /></a>
                <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors duration-300"><img src="https://placehold.co/24x24/FFFFFF/000000?text=L" alt="Social Icon" /></a>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-600 text-sm mt-16 pt-8 border-t border-gray-800">
            © {new Date().getFullYear()} Voltacores. All rights reserved.
          </div>
        </footer>

        {/* Custom Tailwind CSS animations */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          .animate-fade-in-up.delay-200 { animation-delay: 0.2s; }
          .animate-fade-in-up.delay-400 { animation-delay: 0.4s; }
          .animate-fade-in-up.delay-600 { animation-delay: 0.6s; }
        `}</style>
      </div>
    );
  }
