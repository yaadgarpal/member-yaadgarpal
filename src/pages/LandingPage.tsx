import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Laptop,
  IndianRupee,
  GraduationCap,
  TrendingUp,
  Users,
  Star,
  ChevronDown,
  ChevronUp,
  Camera,
  Heart,
  Gift,
  Shield,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How do I become a YaadgarPal Partner?",
      a: "Simply click the 'Register Now' button, fill in your basic details (name, email, password, address), and submit. Our team will review and approve your application within 24-48 hours.",
    },
    {
      q: "Is there any registration fee or investment required?",
      a: "Absolutely not! Joining the YaadgarPal Partner Program is 100% free. There is zero investment required from your side.",
    },
    {
      q: "How much can I earn as a partner?",
      a: "Partners typically earn between ₹5,000 to ₹20,000+ per month depending on their effort. Top-performing partners earn even more through bonus rewards and incentives.",
    },
    {
      q: "Will I get training and support?",
      a: "Yes! We provide comprehensive training materials, dedicated support, and a community of fellow partners to help you succeed from day one.",
    },
    {
      q: "How do I receive my earnings?",
      a: "Earnings are transferred directly to your linked bank account. You can add multiple bank accounts and set a preferred default for withdrawals.",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Delhi",
      text: "I started as a YaadgarPal partner 3 months ago and I'm already earning ₹15,000/month from home. The flexibility is amazing!",
      rating: 5,
    },
    {
      name: "Rahul Verma",
      location: "Mumbai",
      text: "The training and support from the YaadgarPal team is excellent. I refer their photography services to friends and family easily.",
      rating: 5,
    },
    {
      name: "Anita Gupta",
      location: "Jaipur",
      text: "As a homemaker, this program has given me financial independence. No investment, flexible hours — it's perfect!",
      rating: 5,
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Register",
      desc: "Sign up with your basic details — it takes less than 2 minutes.",
      icon: Users,
    },
    {
      step: "2",
      title: "Get Approved",
      desc: "Our team reviews your application and activates your partner account.",
      icon: CheckCircle,
    },
    {
      step: "3",
      title: "Share & Earn",
      desc: "Share your unique referral code and earn commission on every booking.",
      icon: Gift,
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ─── Sticky Header ─── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="https://yaadgarpal.com" target="_blank" rel="noreferrer" className="flex items-center gap-1">
              <Camera className="h-7 w-7 text-[#7e22ce]" />
              <div>
                <span className="text-xl sm:text-2xl font-extrabold text-[#7e22ce] leading-none">
                  YaadgarPal
                </span>
                <span className="text-[10px] text-gray-400 block -mt-0.5 leading-none tracking-wide">
                  Cherish your moment
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
              <a href="#benefits" className="hover:text-[#7e22ce] transition-colors">Benefits</a>
              <a href="#how-it-works" className="hover:text-[#7e22ce] transition-colors">How It Works</a>
              <a href="#testimonials" className="hover:text-[#7e22ce] transition-colors">Testimonials</a>
              <a href="#faq" className="hover:text-[#7e22ce] transition-colors">FAQ</a>
              <Link to="/login" className="text-[#7e22ce] hover:text-[#6b21a8] font-semibold">
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-[#7e22ce] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#6b21a8] transition-all shadow-lg shadow-purple-200 hover:shadow-purple-300"
              >
                Register Now
              </Link>
            </nav>

            {/* Mobile burger */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 animate-[slideDown_0.2s_ease-out]">
            <a href="#benefits" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 font-medium">Benefits</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 font-medium">How It Works</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 font-medium">Testimonials</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-700 font-medium">FAQ</a>
            <div className="flex gap-3 pt-2">
              <Link to="/login" className="flex-1 text-center py-2.5 border border-[#7e22ce] text-[#7e22ce] rounded-full font-semibold text-sm">Log In</Link>
              <Link to="/signup" className="flex-1 text-center py-2.5 bg-[#7e22ce] text-white rounded-full font-semibold text-sm">Register</Link>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* ─── Hero Section ─── */}
        <section className="relative px-4 pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
          {/* Background decorative blobs */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/3 -translate-x-1/4"></div>

          <div className="relative max-w-7xl mx-auto">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-purple-50 border border-purple-100 text-[#7e22ce] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6">
                <Heart className="h-4 w-4 fill-[#7e22ce]" />
                <span>Join India's Fastest Growing Referral Network</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tight">
                Become a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7e22ce] to-[#c026d3]">
                  YaadgarPal Partner
                </span>
                <br />
                <span className="text-2xl sm:text-4xl lg:text-5xl mt-2 block text-gray-700">
                  & Start Earning From Home!
                </span>
              </h1>

              <p className="mt-6 text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                YaadgarPal.com helps people capture life's precious moments through professional photography
                & videography. Now <strong className="text-gray-700">you</strong> can earn by referring our services to your network — no experience or investment needed.
              </p>

              {/* Earning Badge */}
              <div className="mt-10 inline-block">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative bg-white rounded-xl px-6 py-5 sm:px-10 sm:py-6 border border-amber-100 shadow-xl">
                    <p className="text-amber-600 font-bold uppercase text-xs sm:text-sm tracking-widest mb-1">
                      Earn Upto
                    </p>
                    <p className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                      ₹5,000 – ₹20,000+
                    </p>
                    <p className="text-amber-700 font-bold uppercase text-xs sm:text-sm tracking-widest mt-1">
                      Per Month!
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/signup"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#7e22ce] to-[#9333ea] hover:from-[#6b21a8] hover:to-[#7e22ce] text-white font-bold text-base sm:text-lg py-3.5 px-10 rounded-full shadow-xl shadow-purple-200 hover:shadow-purple-300 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Register Now — It's Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="https://yaadgarpal.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto border-2 border-gray-200 hover:border-[#7e22ce] text-gray-700 hover:text-[#7e22ce] font-semibold text-base py-3.5 px-10 rounded-full transition-all duration-300 text-center"
                >
                  Visit YaadgarPal.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Benefits Section ─── */}
        <section id="benefits" className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-[#7e22ce] font-bold text-sm uppercase tracking-widest">Why Join Us</span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-gray-900">
                Benefits of Becoming a Partner
              </h2>
              <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                Everything you need to start earning — with zero risk and full support.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                {
                  icon: Laptop,
                  title: "Work From Home",
                  desc: "Flexible hours — work anytime, anywhere. Perfect for students, homemakers & professionals.",
                  color: "bg-purple-50 text-[#7e22ce]",
                },
                {
                  icon: IndianRupee,
                  title: "No Investment",
                  desc: "Zero registration fee. No hidden charges. Start earning from day one completely free.",
                  color: "bg-green-50 text-green-600",
                },
                {
                  icon: GraduationCap,
                  title: "Full Training",
                  desc: "Complete onboarding training, marketing materials, and a dedicated support team.",
                  color: "bg-blue-50 text-blue-600",
                },
                {
                  icon: TrendingUp,
                  title: "Grow Your Income",
                  desc: "Unlimited earning potential. The more you refer, the more you earn — plus bonus incentives!",
                  color: "bg-orange-50 text-orange-600",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-purple-100 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className={`inline-flex p-3 rounded-xl ${item.color} mb-5`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── How It Works ─── */}
        <section id="how-it-works" className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-[#7e22ce] font-bold text-sm uppercase tracking-widest">Simple Process</span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-gray-900">
                How It Works
              </h2>
              <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                Get started in 3 simple steps and begin earning today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {steps.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.step} className="relative text-center group">
                    {/* Step number */}
                    <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-[#7e22ce] to-[#c026d3] text-white flex items-center justify-center text-xl font-black shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform duration-300">
                      {s.step}
                    </div>
                    <div className="mt-6">
                      <Icon className="h-8 w-8 mx-auto text-[#7e22ce] mb-3" />
                      <h3 className="text-lg font-bold text-gray-900">{s.title}</h3>
                      <p className="mt-2 text-sm text-gray-500">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── What is YaadgarPal ─── */}
        <section className="py-16 sm:py-24 bg-gradient-to-br from-[#7e22ce] to-[#581c87] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-purple-200 font-bold text-sm uppercase tracking-widest">About Us</span>
                <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold">
                  What is YaadgarPal?
                </h2>
                <p className="mt-6 text-purple-100 leading-relaxed">
                  <strong className="text-white">YaadgarPal.com</strong> is a premium platform that connects people with professional photographers
                  and videographers to capture life's most cherished moments — weddings, birthdays, pre-wedding shoots,
                  baby showers, corporate events, and more.
                </p>
                <p className="mt-4 text-purple-100 leading-relaxed">
                  We operate across multiple cities in India and are rapidly expanding. As a partner, you help us grow
                  by referring customers while earning generous commissions on every successful booking.
                </p>
                <ul className="mt-6 space-y-3">
                  {["Trusted by 10,000+ happy customers", "Professional photographers in 50+ cities", "Affordable packages for every occasion"].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-purple-100">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
                <a
                  href="https://yaadgarpal.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-8 bg-white text-[#7e22ce] font-bold py-3 px-8 rounded-full hover:bg-purple-50 transition-colors shadow-lg"
                >
                  Explore YaadgarPal.com
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Camera, label: "Photography", stat: "500+" },
                  { icon: Users, label: "Partners", stat: "2,000+" },
                  { icon: Heart, label: "Happy Clients", stat: "10,000+" },
                  { icon: MapPin, label: "Cities", stat: "50+" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-colors"
                    >
                      <Icon className="h-8 w-8 mx-auto mb-3 text-purple-200" />
                      <p className="text-2xl sm:text-3xl font-black">{item.stat}</p>
                      <p className="text-xs text-purple-200 mt-1 uppercase tracking-wider">{item.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section id="testimonials" className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-[#7e22ce] font-bold text-sm uppercase tracking-widest">Partner Stories</span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-gray-900">
                What Our Partners Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed italic">"{t.text}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7e22ce] to-[#c026d3] flex items-center justify-center text-white font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ Section ─── */}
        <section id="faq" className="py-16 sm:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[#7e22ce] font-bold text-sm uppercase tracking-widest">Got Questions?</span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-gray-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:border-purple-200 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-sm sm:text-base font-semibold text-gray-800 pr-4">{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="h-5 w-5 text-[#7e22ce] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-4">
                      <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section className="py-16 sm:py-24 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Ready to Start Earning?
            </h2>
            <p className="mt-4 text-white/90 text-base sm:text-lg max-w-2xl mx-auto">
              Join thousands of YaadgarPal Partners across India. Zero investment. Full support. Unlimited potential.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 mt-8 bg-white text-orange-600 font-bold text-lg py-4 px-12 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Register Now — It's Free
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Camera className="h-6 w-6 text-[#c084fc]" />
                <span className="text-xl font-extrabold text-white">YaadgarPal</span>
              </div>
              <p className="text-sm leading-relaxed">
                Capturing life's precious moments through professional photography & videography across India.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2.5 text-sm">
                <li><a href="https://yaadgarpal.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">YaadgarPal.com</a></li>
                <li><Link to="/signup" className="hover:text-white transition-colors">Become a Partner</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Partner Login</Link></li>
              </ul>
            </div>

            {/* Partner Program */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Partner Program</h4>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2"><Shield className="h-4 w-4" /> Secure & Trusted</li>
                <li className="flex items-center gap-2"><Gift className="h-4 w-4" /> Bonus Rewards</li>
                <li className="flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Growth Support</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> support@yaadgarpal.com</li>
                <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 XXXXX XXXXX</li>
                <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> India</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} YaadgarPal. All rights reserved.</p>
            <p className="text-xs text-gray-500">Made with <Heart className="h-3 w-3 inline text-red-500 fill-red-500" /> in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
