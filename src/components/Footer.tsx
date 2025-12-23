import { Link } from 'react-router-dom'
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Heart,
} from "lucide-react";
import {FooterBackgroundGradient} from "@/components/ui/hover-footer";
import { TextHoverEffect } from "@/components/ui/hover-footer";

function Footer() {
  // Footer link data
  const footerLinks = [
    {
      title: "Services",
      links: [
        { label: "Find Doctors", href: "/find-doctors" },
        { label: "Book Appointment", href: "/find-doctors" },
        { label: "Telehealth", href: "/find-doctors" },
        { label: "Emergency Care", href: "#" },
      ],
    },
    {
      title: "About",
      links: [
        { label: "About Us", href: "#" },
        { label: "Our Doctors", href: "/doctors" },
        { label: "Locations", href: "/locations" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "#" },
        { label: "FAQs", href: "#" },
        { label: "Contact Us", href: "#" },
        { label: "Privacy Policy", href: "#" },
      ],
    },
  ];

  // Contact info data
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#3ca2fa]" />,
      text: "GenCare@gmail.com",
      href: "mailto:GenCare@gmail.com",
    },
    {
      icon: <Phone size={18} className="text-[#3ca2fa]" />,
      text: "+91 ***8890",
      href: "tel:+919876543890",
    },
    {
      icon: <MapPin size={18} className="text-[#3ca2fa]" />,
      text: "Multiple Locations Across India",
    },
  ];

  // Social media icons
  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "#" },
  ];

  return (
    <footer className="bg-slate-900 relative h-fit rounded-3xl overflow-hidden m-4 md:m-8 border border-slate-800">
      <div className="max-w-7xl mx-auto p-6 md:p-10 lg:p-14 z-40 relative">
        {/* Centered Brand Section with Responsive Margins */}
        <div className="flex justify-center mb-8 md:mb-12 lg:mb-16">
          <div className="flex flex-col items-center space-y-4 px-4 md:px-8 lg:px-16">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 md:h-10 md:w-10 text-[#3ca2fa]" />
              <span className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">GenCare</span>
            </div>
            <p className="text-slate-300 text-center text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl">
              Find Verified Specialists. Book Appointments in Under 2 Minutes.
              Trusted healthcare services with transparent pricing and secure booking.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-16 pb-8 md:pb-12">

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <Link
                      to={link.href}
                      className="text-slate-300 hover:text-[#3ca2fa] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-slate-300 hover:text-[#3ca2fa] transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-slate-300 hover:text-[#3ca2fa] transition-colors">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-slate-700 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-6 text-slate-400">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-[#3ca2fa] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left text-slate-400">
            &copy; {new Date().getFullYear()} GenCare by Sauban. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect - Responsive */}
      <div className="flex h-[20rem] md:h-[25rem] lg:h-[30rem] -mt-32 md:-mt-40 lg:-mt-52 -mb-24 md:-mb-30 lg:-mb-36">
        <TextHoverEffect text="GenCare" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default Footer;

