'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Phone, Mail, MapPin, Clock, Wrench, Car, Shield, Users, Star, ChevronRight, Facebook, Instagram, Twitter, Sun, Moon } from 'lucide-react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '', phone: '', email: '', carBrand: '', carModel: '', 
    serviceType: '', preferredDate: '', message: ''
  });

  useEffect(() => {
    const checkTime = () => {
      const hour = new Date().getHours();
      setIsDark(hour >= 18 || hour < 6);
    };
    checkTime();
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const carBrands = [
    { name: 'Audi', logo: 'https://www.carlogos.org/car-logos/audi-logo.png' },
    { name: 'BMW', logo: 'https://www.carlogos.org/car-logos/bmw-logo.png' },
    { name: 'Mercedes', logo: 'https://www.carlogos.org/car-logos/mercedes-benz-logo.png' },
    { name: 'Toyota', logo: 'https://www.carlogos.org/car-logos/toyota-logo.png' },
    { name: 'Honda', logo: 'https://www.carlogos.org/car-logos/honda-logo.png' },
    { name: 'Volkswagen', logo: 'https://www.carlogos.org/car-logos/volkswagen-logo.png' },
    { name: 'Porsche', logo: 'https://www.carlogos.org/car-logos/porsche-logo.png' },
    { name: 'Jaguar', logo: 'https://www.carlogos.org/car-logos/jaguar-logo.png' },
    { name: 'Land Rover', logo: 'https://www.carlogos.org/car-logos/land-rover-logo.png' },
    { name: 'Lexus', logo: 'https://www.carlogos.org/car-logos/lexus-logo.png' },
    { name: 'Nissan', logo: 'https://www.carlogos.org/car-logos/nissan-logo.png' },
    { name: 'Ford', logo: 'https://www.carlogos.org/car-logos/ford-logo.png' },
  ];

  const services = [
    { icon: <Wrench className="w-8 h-8" />, title: 'Engine Diagnostics', description: 'Complete engine diagnostics and repair for all vehicle types' },
    { icon: <Car className="w-8 h-8" />, title: 'Body Repair & Painting', description: 'Professional body repair with precision painting chamber' },
    { icon: <Shield className="w-8 h-8" />, title: 'AC Service & Repair', description: 'Complete AC system diagnostics and refrigerant service' },
    { icon: <Users className="w-8 h-8" />, title: 'Transmission Service', description: 'Expert transmission diagnostics and gearbox repair' }
  ];

  const stats = [
    { number: '15+', label: 'Years Experience' },
    { number: '5000+', label: 'Cars Serviced' },
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  // Button Handlers
  const handleGetQuote = () => {
    const message = encodeURIComponent('Hi KoolShack! I would like to get a free quote for car servicing.');
    window.open(`https://api.whatsapp.com/send?phone=919820934803&text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleCallNow = () => {
    window.location.href = 'tel:+919820934803';
  };

  const handleBookServiceClick = () => {
    setShowBookingForm(true);
  };

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    const whatsappMessage = `New Car Service Booking Request

 *Name:* ${bookingData.name}
 *Phone:* ${bookingData.phone}
 *Email:* ${bookingData.email}

 *Car Details:*
Brand: ${bookingData.carBrand}
Model: ${bookingData.carModel}

 *Service Type:* ${bookingData.serviceType}
 *Preferred Date:* ${bookingData.preferredDate}

 *Additional Message:*
${bookingData.message || 'N/A'}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/919820934803?text=${encodedMessage}`, '_blank');
    
    setTimeout(() => {
      window.open('https://calendly.com/your-calendly-link', '_blank');
    }, 1000);
    
    setShowBookingForm(false);
    setBookingData({ name: '', phone: '', email: '', carBrand: '', carModel: '', serviceType: '', preferredDate: '', message: '' });
  };

  return (
    <div className={`${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'} min-h-screen transition-colors duration-500`}>
      
      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} border rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Book Your Service</h2>
              <button onClick={() => setShowBookingForm(false)} className="p-2 hover:bg-orange-500/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name *</label>
                  <input type="text" name="name" required value={bookingData.name} onChange={handleBookingInputChange} placeholder="John Doe" className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-zinc-800 border-zinc-700 focus:border-orange-500' : 'bg-white border-gray-300 focus:border-orange-500'} focus:outline-none transition-colors`} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                  <input type="tel" name="phone" required value={bookingData.phone} onChange={handleBookingInputChange} placeholder="+91 98203 54863" className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-zinc-800 border-zinc-700 focus:border-orange-500' : 'bg-white border-gray-300 focus:border-orange-500'} focus:outline-none transition-colors`} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email Address</label>
                <input type="email" name="email" value={bookingData.email} onChange={handleBookingInputChange} placeholder="john@example.com" className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-zinc-800 border-zinc-700 focus:border-orange-500' : 'bg-white border-gray-300 focus:border-orange-500'} focus:outline-none transition-colors`} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Car Brand *</label>
                  <select name="carBrand" required value={bookingData.carBrand} onChange={handleBookingInputChange} className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-zinc-800 border-zinc-700 focus:border-orange-500' : 'bg-white border-gray-300 focus:border-orange-500'} focus:outline-none transition-colors`}>
                    <option value="">Select Brand</option>
                    {carBrands.map((brand, idx) => (
                      <option key={idx} value={brand.name}>{brand.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Car Model *</label>
                  <input type="text" name="carModel" required value={bookingData.carModel} onChange={handleBookingInputChange} placeholder="e.g., A4, 3 Series, Accord" className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-zinc-800 border-zinc-700 focus:border-orange-500' : 'bg-white border-gray-300 focus:border-orange-500'} focus:outline-none transition-colors`} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Service Type *</label>
                <select name="serviceType" required value={bookingData.serviceType} onChange={handleBookingInputChange} className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-zinc-800 border-zinc-700 focus:border-orange-500' : 'bg-white border-gray-300 focus:border-orange-500'} focus:outline-none transition-colors`}>
                  <option value="">Select Service Type</option>
                  <option value="AC Service & Repair">AC Service & Repair</option>
                  <option value="Engine Diagnostics">Engine Diagnostics</option>
                  <option value="Body Repair & Painting">Body Repair & Painting</option>
                  <option value="Transmission Service">Transmission Service</option>
                  <option value="Oil Change">Oil Change</option>
                  <option value="Brake Service">Brake Service</option>
                  <option value="General Maintenance">General Maintenance</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Preferred Date *</label>
                <input type="date" name="preferredDate" required value={bookingData.preferredDate} onChange={handleBookingInputChange} min={new Date().toISOString().split('T')[0]} className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-zinc-800 border-zinc-700 focus:border-orange-500' : 'bg-white border-gray-300 focus:border-orange-500'} focus:outline-none transition-colors`} />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Additional Message</label>
                <textarea name="message" value={bookingData.message} onChange={handleBookingInputChange} placeholder="Any specific requirements or issues..." rows="3" className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-zinc-800 border-zinc-700 focus:border-orange-500' : 'bg-white border-gray-300 focus:border-orange-500'} focus:outline-none transition-colors resize-none`}></textarea>
              </div>

              <div className={`p-4 rounded-lg ${isDark ? 'bg-orange-500/10' : 'bg-orange-50'} border border-orange-500/30`}>
                <p className="text-sm">📱 After submitting, we will send your details via WhatsApp and open Calendly for appointment scheduling.</p>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all text-white">
                Submit & Continue to Booking
              </button>
            </form>
          </div>
        </div>
      )}

      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? (isDark ? 'bg-zinc-950/95' : 'bg-white/95') + ' backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Wrench className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">KoolShack</h1>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Car Air Conditioners</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:text-orange-500 transition-colors">Home</a>
              <a href="#services" className="hover:text-orange-500 transition-colors">Services</a>
              <a href="#about" className="hover:text-orange-500 transition-colors">About Us</a>
              <a href="#contact" className="hover:text-orange-500 transition-colors">Contact</a>
              
              <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-full ${isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`} title="Toggle theme">
                {isDark ? <Sun className="w-5 h-5 text-orange-500" /> : <Moon className="w-5 h-5 text-orange-500" />}
              </button>
              
              <button onClick={handleBookServiceClick} className="bg-gradient-to-r from-orange-500 to-red-600 px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all text-white">Book Service</button>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-50 border-gray-200'} border-t`}>
            <div className="px-4 py-6 space-y-4">
              <a href="#home" className="block hover:text-orange-500 transition-colors">Home</a>
              <a href="#services" className="block hover:text-orange-500 transition-colors">Services</a>
              <a href="#about" className="block hover:text-orange-500 transition-colors">About Us</a>
              <a href="#contact" className="block hover:text-orange-500 transition-colors">Contact</a>
              <button onClick={() => setIsDark(!isDark)} className={`flex items-center space-x-2 w-full p-3 rounded-lg ${isDark ? 'bg-zinc-800' : 'bg-gray-200'}`}>
                {isDark ? <Sun className="w-5 h-5 text-orange-500" /> : <Moon className="w-5 h-5 text-orange-500" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <button onClick={handleBookServiceClick} className="w-full bg-gradient-to-r from-orange-500 to-red-600 px-6 py-2.5 rounded-full font-semibold text-white">Book Service</button>
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-600/10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-orange-500/20 text-orange-500 px-4 py-2 rounded-full text-sm font-semibold">Premium Car Service in India</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Expert Care for<span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Your Vehicle</span>
              </h1>
              <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Professional car servicing and repair for all types and models. German, Italian, Japanese and other premium makes.</p>
              <div className="flex flex-wrap gap-4">
                <button onClick={handleGetQuote} className="bg-gradient-to-r from-orange-500 to-red-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all flex items-center text-white">
                  Get Free Quote<ChevronRight className="w-5 h-5 ml-2" />
                </button>
                <button onClick={handleCallNow} className="border-2 border-orange-500 px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-500/10 transition-all">Call Now</button>
              </div>
              <div className="flex flex-wrap gap-6 pt-4">
                <div className={`flex items-center space-x-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Phone className="w-5 h-5 text-orange-500" /><span>+91-9820934803</span>
                </div>
                <div className={`flex items-center space-x-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Clock className="w-5 h-5 text-orange-500" /><span>Mon-Sat: 9AM-7PM</span>
                </div>
              </div>
            </div>

            <div className={`${isDark ? 'bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700' : 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'} rounded-3xl p-8 border`}>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">{stat.number}</div>
                    <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-16 px-4 ${isDark ? 'bg-zinc-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">We Service <span className="text-orange-500">All Major Brands</span></h2>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Expert technicians for German, Italian, Japanese and other premium vehicles</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {carBrands.map((brand, idx) => (
              <div key={idx} className={`${isDark ? 'bg-zinc-800/50 border-zinc-700 hover:border-orange-500 hover:bg-zinc-800' : 'bg-white border-gray-200 hover:border-orange-500 hover:bg-gray-50'} border rounded-xl p-6 transition-all cursor-pointer group`}>
                <div className="relative w-16 h-16 mx-auto mb-3">
                  <Image src={brand.logo} alt={`${brand.name} logo`} fill className={`object-contain group-hover:scale-110 transition-transform ${isDark ? 'brightness-90' : ''}`} unoptimized />
                </div>
                <div className={`text-sm text-center ${isDark ? 'text-gray-400' : 'text-gray-600'} group-hover:text-orange-500 transition-colors`}>{brand.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-orange-500">Services</span></h2>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto`}>Complete car servicing, diagnostics, and repair with state-of-the-art equipment</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <div key={idx} className={`${isDark ? 'bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 hover:border-orange-500' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:border-orange-500'} border rounded-2xl p-8 transition-all group cursor-pointer`}>
                <div className="text-orange-500 mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{service.description}</p>
              </div>
            ))}
          </div>

          <div className={`mt-12 ${isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-gray-50 border-gray-200'} rounded-2xl p-8 border`}>
            <h3 className="text-2xl font-bold mb-6 text-center">Complete Service List</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {['Engine Oil Change', 'Car Filters Replacement', 'Brake Fluid Change', 'Spark Plugs Replacement', 'AC Belt & Conditioner Service', 'Timing Belt Replacement', 'Radiator Fluid Change', 'Wheel Alignment', 'Suspension Repair', 'Body Paint & Detailing', 'Complete Car Wash', 'Interior Cleaning'].map((item, idx) => (
                <div key={idx} className={`flex items-center space-x-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  <ChevronRight className="w-4 h-4 text-orange-500" /><span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className={`py-20 px-4 ${isDark ? 'bg-zinc-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">About <span className="text-orange-500">KoolShack</span></h2>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 leading-relaxed`}>At KoolShack, we have the best mechanics providing high quality workmanship at reasonable prices. All of our work is guaranteed to your satisfaction.</p>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 leading-relaxed`}>Our factory-trained technicians are highly qualified in both domestic and foreign automobiles.</p>
              <div className="space-y-4">
                {['Foreign & Domestic A/C Parts & Service', 'Complete Auto Repair Service', 'State Inspection Stickers', 'Fleet Service'].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div className="font-semibold">{item}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-2xl p-8 border border-orange-500/30">
                <Star className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-2xl font-bold mb-3">Why Choose Us?</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>We always provide the highest quality of service. You can observe all working process and talk directly with the technician.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className={`${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
                  <div className="text-3xl font-bold text-orange-500 mb-2">15+</div>
                  <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Years Experience</div>
                </div>
                <div className={`${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-200'} rounded-xl p-6 border`}>
                  <div className="text-3xl font-bold text-orange-500 mb-2">100%</div>
                  <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In <span className="text-orange-500">Touch</span></h2>
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Visit us or book your service today</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} rounded-2xl p-6 border`}>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Location</div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>C-9, Vasantha Tower, 32, Tokarshi Javji Road,<br />Grant Road, Mumbai 400007, India</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Phone</div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>+91-9820934803</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>sanjay@koolshack.co.in</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Working Hours</div>
                      <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>Monday - Saturday: 9:00 AM - 7:00 PM<br />Sunday: Closed</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} rounded-2xl p-6 border`}>
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className={`w-12 h-12 ${isDark ? 'bg-zinc-800' : 'bg-gray-100'} hover:bg-orange-500 hover:text-white rounded-full flex items-center justify-center transition-colors`}><Facebook className="w-5 h-5" /></a>
                  <a href="#" className={`w-12 h-12 ${isDark ? 'bg-zinc-800' : 'bg-gray-100'} hover:bg-orange-500 hover:text-white rounded-full flex items-center justify-center transition-colors`}><Instagram className="w-5 h-5" /></a>
                  <a href="#" className={`w-12 h-12 ${isDark ? 'bg-zinc-800' : 'bg-gray-100'} hover:bg-orange-500 hover:text-white rounded-full flex items-center justify-center transition-colors`}><Twitter className="w-5 h-5" /></a>
                </div>
              </div>
            </div>

            <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} rounded-2xl p-2 border h-full min-h-[500px]`}>
              <div className={`w-full h-full ${isDark ? 'bg-zinc-800' : 'bg-gray-100'} rounded-xl flex items-center justify-center`}>
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Map Integration</p>
                  <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'} mt-2`}>Google Maps embed would go here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-gray-100 border-gray-200'} border-t py-12 px-4`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">KoolShack</h3>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Car Air Conditioners</p>
                </div>
              </div>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Your trusted partner for professional car servicing and repair in Mumbai.</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['Home', 'Services', 'About Us', 'Contact'].map((link, idx) => (
                  <a key={idx} href={`#${link.toLowerCase().replace(' ', '')}`} className={`block ${isDark ? 'text-gray-400' : 'text-gray-600'} hover:text-orange-500 transition-colors`}>{link}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <div className={`space-y-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <p>AC Service & Repair</p>
                <p>Engine Diagnostics</p>
                <p>Body Repair</p>
                <p>Transmission Service</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4`}>Subscribe for updates and offers</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className={`${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-gray-300'} border px-4 py-2 rounded-l-lg flex-1 focus:outline-none focus:border-orange-500`} />
                <button className="bg-orange-500 px-4 py-2 rounded-r-lg hover:bg-orange-600 transition-colors">
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className={`border-t ${isDark ? 'border-zinc-800' : 'border-gray-200'} pt-8 text-center ${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            <p>© 2025 KoolShack Car Air Conditioners. All rights reserved.</p>
            <p className="mt-2">Designed & Maintained by PRATHAM MEHTA</p>
          </div>
        </div>
      </footer>
    </div>
  );
}