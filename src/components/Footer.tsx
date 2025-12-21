import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import { FooterBackgroundGradient, TextHoverEffect } from './ui/hover-footer'

export default function Footer() {
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
  ]

  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#3ca2fa]" />,
      text: "sauban@gmail.com",
      href: "mailto:sauban@gmail.com",
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
  ]

  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "#" },
  ]

  return (
    <footer className="bg-gradient-to-br from-primary/10 via-primary/5 to-background relative h-fit rounded-3xl overflow-hidden m-8 border border-primary/20">
      <div className="max-w-7xl mx-auto p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-foreground text-4xl font-bold">Sauban</span>
            </div>
            <p className="text-sm leading-relaxed text-foreground/80 font-medium">
              Find Verified Specialists. Book Appointments in Under 2 Minutes.
              Trusted healthcare services with transparent pricing and secure booking.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-foreground text-lg font-bold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <Link
                      to={link.href}
                      className="hover:text-primary transition-colors text-foreground/70 font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-foreground text-lg font-bold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-primary transition-colors text-foreground/80 font-medium"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="hover:text-primary transition-colors text-foreground/80 font-medium">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/20 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          <div className="flex space-x-6 text-foreground/60">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-primary transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          <p className="text-center md:text-left text-foreground/70 font-medium">
            &copy; {new Date().getFullYear()} GenCare by Sauban. All rights reserved.
          </p>
        </div>
      </div>

      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
        <TextHoverEffect text="Sauban" className="z-50" />
      </div>

      <div className="absolute bottom-4 right-4 text-xs text-foreground/50 font-medium">
        by sauban
      </div>

      <FooterBackgroundGradient />
    </footer>
  )
}

