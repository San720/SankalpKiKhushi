import { Heart, Calendar, MapPin, Music, Camera, Send, ChevronDown, Menu, X, Instagram, Facebook, Mail, Phone } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';


const WeddingWebsite = () => {
  const audioRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [particles, setParticles] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);
  

  const weddingDate = new Date('2026-02-04T14:00:00');

  // Generate flower particles
  useEffect(() => {
    const flowerEmojis = ['🌸', '🌺', '🌼', '🌻', '🌷', '💐', '🏵️', '💮'];
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 15,
      animationDelay: Math.random() * 5,
      size: 20 + Math.random() * 20
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      if (currentScrollY > 100) {
        setShowIntro(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const events = [
    {
      date: 'February 4, 2026',
      time: '01:30 PM Onwards',
      name: 'Tilak Ceremony',
      description: 'A traditional ritual seeking blessings from elders.',
      image: 'tilak.jpg',
      venue: 'An e11even Park'
    },
    {
      date: 'February 4, 2026',
      time: '06:00 PM Onwards',
      name: 'Sangeet & Engagement',
      description: 'An evening of music, dance, and joyful celebrations.',
      image: 'sangeet.jpg',
      venue: 'An e11even Park'
    },
    {
      date: 'February 5, 2026',
      time: '10:00 AM Onwards',
      name: 'Haldi Ceremony',
      description: 'A sacred ritual filled with blessings and happiness.',
      image: 'haldi.jpg',
      venue: 'An e11even Park'
    },
    {
      date: 'February 5, 2026',
      time: '09:00 PM Onwards',
      name: 'Barat Procession',
      description: 'The grand arrival of the groom with family and friends.',
      image: 'barat.jpg',
      venue: 'An e11even Park'
    },
    {
      date: 'February 5, 2026',
      time: '11:30 PM Onwards',
      name: 'Jaimala & Phere',
      description: 'A sacred ceremony marked by the exchange of garlands and wedding vows.',
      image: 'mandap.jpg',
      venue: 'An e11even Park'
    }
  ];

  const scrollToSection = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 font-serif overflow-x-hidden relative">
      <audio ref={audioRef} loop>
        <source src={`${import.meta.env.BASE_URL}music.mp3`} type="audio/mpeg" />
      </audio>
      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-rose-500 transition-colors z-[101]"
          >
            ×
          </button>
          <img
            src={lightboxImage}
            alt="Full size"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Flower Particles */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute animate-fall"
            style={{
              left: `${particle.left}%`,
              fontSize: `${particle.size}px`,
              animationDuration: `${particle.animationDuration}s`,
              animationDelay: `${particle.animationDelay}s`,
              top: '-50px'
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>
      {/* Intro Cards - Fade on Scroll */}
      {showIntro && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 transition-opacity duration-1000"
          style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
        >
          <div className="text-center px-4 animate-fadeInUp">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-float">
              Ananya & Sankalp
            </h1>
            <div className="text-3xl md:text-4xl text-gray-700 mb-4">Wedding Invitation</div>
            <ChevronDown className="w-12 h-12 mx-auto text-rose-500 animate-bounce mt-8" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-30 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <img 
              src="logo.png" 
              alt="Wedding Logo" 
              className="h-12 w-auto"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent" style={{display: 'none'}}>
              #SankalpKiKhushi
            </div>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['home', 'events', 'moments', 'rsvp', 'location'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize transition-colors duration-300 ${
                  activeSection === item ? 'text-rose-600 font-semibold' : 'text-gray-600 hover:text-rose-500'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t animate-fadeIn">
            {['home', 'events', 'moments', 'rsvp', 'location'].map(item => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-4 py-3 hover:bg-rose-50 capitalize transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-200/30 via-pink-200/30 to-purple-200/30 animate-gradient"></div>
        
        <div className="relative z-10 text-center px-4 animate-fadeInUp">
          <div className="mb-8 animate-float">
            <Heart className="w-16 h-16 mx-auto text-rose-500 fill-rose-500" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-fadeInUp" style={{animationDelay: '0.2s'}}>
            We're Getting Married!
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-700 mb-12 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
            A new chapter begins in
          </p>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-12 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-bold text-rose-600">{value || 0}</div>
                <div className="text-sm md:text-base text-gray-600 capitalize mt-2">{unit}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollToSection('events')}
            className="animate-bounce mt-8"
          >
            <ChevronDown className="w-8 h-8 text-rose-500" />
          </button>
        </div>

        {/* Music Control */}
        <button
          onClick={() => {
          const audio = audioRef.current;
          if (!audio) return;

          if (audio.paused) {
          audio.play().catch(() => {});
          setIsPlaying(true);
        } else {
      audio.pause();
      setIsPlaying(false);
    }
  }}
  className="fixed bottom-8 right-8 bg-rose-500 text-white p-4 rounded-full shadow-2xl hover:bg-rose-600 transition-all duration-300 transform hover:scale-110 z-40"
>
  <Music className={isPlaying ? 'animate-pulse' : ''} />
</button>

      </section>

      {/* Couple Cards Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-rose-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
            Meet The Couple
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Bride Card */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white transform hover:scale-[1.02] hover:-translate-y-2 animate-slideInUp flex items-center gap-6 cursor-pointer">
              <div 
                className="w-32 h-32 flex-shrink-0 rounded-2xl bg-gradient-to-br from-rose-300 to-pink-400 flex items-center justify-center overflow-hidden shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 cursor-pointer"
                onClick={() => setLightboxImage('bride-photo.jpg')}
              >
                <img 
                  src="bride-photo.jpg" 
                  alt="Ananya"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <Camera className="w-12 h-12 text-white/70 group-hover:text-white transition-colors duration-300" style={{display: 'none'}} />
              </div>
              
              <div className="flex-grow">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                  Ananya👸
                </h3>
                <p className="text-gray-600 mb-4 group-hover:text-gray-800 transition-colors duration-300">The Bride</p>
                
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/ananyashukla.___?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-white hover:shadow-lg transition-all transform hover:scale-110">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://www.facebook.com/ananya.shukla.31149359" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-white hover:shadow-lg transition-all transform hover:scale-110">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a 
                    href="mailto:ananyashukla2255@gmail.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full text-white hover:shadow-lg transition-all transform hover:scale-110">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Groom Card */}
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white transform hover:scale-[1.02] hover:-translate-y-2 animate-slideInUp flex items-center gap-6 cursor-pointer">
              <div 
                className="w-32 h-32 flex-shrink-0 rounded-2xl bg-gradient-to-br from-rose-300 to-pink-400 flex items-center justify-center overflow-hidden shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 cursor-pointer"
                onClick={() => setLightboxImage('groom-photo.jpg')}
              >
                <img 
                  src="groom-photo.jpg" 
                  alt="Sankalp"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <Camera className="w-12 h-12 text-white/70 group-hover:text-white transition-colors duration-300" style={{display: 'none'}} />
              </div>
              
              <div className="flex-grow">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
                  Sankalp👑
                </h3>
                <p className="text-gray-600 mb-4 group-hover:text-gray-800 transition-colors duration-300">The Groom</p>
                
                <div className="flex gap-3">
                  <a 
                    href="https://www.instagram.com/sankalp1.io/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-white hover:shadow-lg transition-all transform hover:scale-110">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a 
                  href="https://www.facebook.com/sankalp.mishra.1232/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-white hover:shadow-lg transition-all transform hover:scale-110">
                  <Facebook className="w-4 h-4" />
                  </a>
                  <a 
                    href="mailto:sankalp174@gmail.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full text-white hover:shadow-lg transition-all transform hover:scale-110">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
            Wedding Events
          </h2>

          <div className="space-y-6">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white transform hover:scale-[1.02] hover:-translate-y-2 animate-slideInUp flex flex-col md:flex-row items-center gap-6 cursor-pointer border-2 border-rose-100 hover:border-rose-300"
                style={{animationDelay: `${idx * 0.1}s`}}
              >
                <div 
                  className="w-40 h-40 flex-shrink-0 rounded-xl overflow-hidden border-4 border-gradient-to-br from-rose-200 to-purple-200 shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2 cursor-pointer"
                  onClick={() => setLightboxImage(event.image)}
                >
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-rose-200 to-purple-200 flex items-center justify-center text-6xl" style={{display: 'none'}}>
                    {idx === 0 ? '🙏' : idx === 1 ? '💃' : idx === 2 ? '🌼' : idx === 3 ? '🎊' : '💐'}
                  </div>
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-rose-600 transition-colors duration-300">{event.name}</h3>
                  <p className="text-gray-600 mb-2 group-hover:text-gray-800 transition-colors duration-300">{event.description}</p>
                  <p className="text-sm text-gray-500 group-hover:text-rose-500 transition-colors duration-300">{event.venue}</p>
                </div>
                
                <div className="flex-shrink-0 text-center md:text-right">
                  <div className="flex items-center justify-center md:justify-end text-rose-600 mb-1 group-hover:text-rose-700 transition-colors duration-300">
                    <Calendar className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-semibold">{event.date}</span>
                  </div>
                  <p className="text-lg font-bold text-purple-600 group-hover:text-purple-700 group-hover:scale-110 transition-all duration-300">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Moments Section */}
      <section id="moments" className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
            Our Moments
          </h2>

          {/* Video Invite Card */}
          <div className="mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
              Video Invitation
            </h3>
            <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-rose-100 to-purple-100 border-4 border-rose-200 shadow-lg mb-4">
                <video 
                  controls 
                  className="w-full h-full"
                  poster="video-thumbnail.jpg"
                >
                  <source src="wedding-invite-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-center text-gray-600 text-lg">
                Watch our special video invitation
              </p>
            </div>
          </div>

          {/* Photo Gallery */}
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
            Photo Gallery
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="group aspect-square bg-gradient-to-br from-rose-200 to-purple-200 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-rotate-3 animate-fadeInUp flex items-center justify-center cursor-pointer overflow-hidden relative"
                style={{animationDelay: `${i * 0.1}s`}}
                onClick={() => setLightboxImage(`photo${i}.jpg`)}
              >
                <img
                  src={`photo${i}.jpg`}
                  alt={`Photo ${i}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.querySelector('.placeholder-content').style.display = 'flex';
                  }}
                />
                <div className="placeholder-content absolute inset-0 bg-gradient-to-br from-rose-300 to-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="relative z-10 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-white/50 group-hover:text-white transition-all duration-500 group-hover:scale-125" />
                    <p className="text-white/70 ml-2 group-hover:text-white transition-colors duration-500">Photo {i}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://your-link-here.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
            <button className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center mx-auto">
              <Camera className="mr-2" />
              Guest Photo Gallery - Coming Soon
            </button>
            </a>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
            Venue Location
          </h2>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="aspect-video rounded-2xl overflow-hidden mb-6 border-4 border-rose-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3408.642939298225!2d78.1850724!3d26.1584807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c5881c5afbc7%3A0x1ab6861a5848a59b!2sAn%20e11even%20Park!5e1!3m2!1sen!2sin!4v1766982781358!5m2!1sen!2sin" 
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://maps.apple/p/woY6YzD8o623w8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <MapPin className="mr-2" />
                Open in Apple Maps
              </a>

              <a
                href="https://maps.app.goo.gl/ZwcJ53f9B6vrvTsB7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <MapPin className="mr-2" />
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-20 px-4 bg-gradient-to-br from-rose-50 to-purple-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
            RSVP
          </h2>

          <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
            <p className="text-xl text-gray-700 mb-8">
              We would be honored by your presence at our wedding celebration. Please confirm your attendance.
            </p>

            <a
              href="https://forms.gle/hPqpTHnAbH3WAzkH8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-rose-500 to-purple-600 text-white px-12 py-5 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Send className="mr-3 w-6 h-6" />
              Fill RSVP Form
            </a>

            <p className="text-sm text-gray-500 mt-6">
              Please respond by January 25, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 fill-white animate-float" />
          
          <h3 className="text-3xl font-bold mb-4">The Families Welcome You</h3>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="text-2xl font-semibold mb-2">Ananya Shukla</h4>
              <p className="text-white/100">Daughter of Late Mr. Sanjeev Shukla & Mrs. Savita Shukla</p>
              <p className="text-white/90">Sister of Mr. Akshat Shukla</p>
              <p className="text-white/80 text-sm mt-2">cordially invite you to the wedding of their daughter</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="text-2xl font-semibold mb-2">Sankalp Mishra</h4>
              <p className="text-white/100">Son of Mr. Akhilesh Mishra & Mrs. Jyoti Mishra</p>
              <p className="text-white/90">Brother of Mrs. Akrati Sharma</p>
              <p className="text-white/90">(Brother-in-law: Mr. Dheeraj Sharma)</p>
              <p className="text-white/90">Beloved Uncle of Savi Sharma</p>
              <p className="text-white/80 text-sm mt-2">cordially invite you to the wedding of their son</p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <p className="text-2xl font-semibold mb-2">#SankalpKiKhushi</p>
            <p className="text-xl mb-4">February 4-5, 2026</p>
            <p className="text-white/90 mb-6">We look forward to celebrating this special day with you.</p>
            <p className="text-white/90 mb-6">For wedding updates and memories, follow us on Instagram.</p>
            
            <div className="flex justify-center gap-6 mb-6">
              <a href="tel:7440899105" className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all transform hover:scale-110">
                <Phone className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/sankalp_ki_khushi/" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all transform hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            <p className="text-white/70 text-sm">
              © 2026 Ananya & Sankalp Wedding. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes gradient {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 1s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-gradient {
          animation: gradient 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default WeddingWebsite;