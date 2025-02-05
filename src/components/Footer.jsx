import React, { useState } from "react";
import { FaArrowUp, FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  return (
    <footer className="footer bg-base-200 text-base-content p-10 flex flex-col md:flex-row flex-wrap gap-8 justify-between">
      {/* Info Section */}
      <nav className="space-y-2">
        <h6 className="footer-title text-lg">INFO</h6>
        <a className="link link-hover transition-colors duration-200 hover:text-emerald-600">About us</a>
        <a className="link link-hover transition-colors duration-200 hover:text-emerald-600">Contact</a>
        <a className="link link-hover transition-colors duration-200 hover:text-emerald-600">Jobs</a>
      </nav>

      {/* Legal Section */}
      <nav className="space-y-2">
        <h6 className="footer-title text-lg">Legal</h6>
        <a className="link link-hover transition-colors duration-200 hover:text-emerald-600">Terms of use</a>
        <a className="link link-hover transition-colors duration-200 hover:text-emerald-600">Privacy policy</a>
        <a className="link link-hover transition-colors duration-200 hover:text-emerald-600">Cookie policy</a>
      </nav>

      {/* Social Media Section */}
      <nav className="space-y-2">
        <h6 className="footer-title text-lg">Follow Us</h6>
        <div className="flex gap-4">
          <a href="#" className="btn btn-circle btn-sm btn-ghost hover:bg-emerald-100 transition-colors" aria-label="Twitter">
            <FaTwitter className="text-xl" />
          </a>
          <a href="#" className="btn btn-circle btn-sm btn-ghost hover:bg-emerald-100 transition-colors" aria-label="Facebook">
            <FaFacebook className="text-xl" />
          </a>
          <a href="#" className="btn btn-circle btn-sm btn-ghost hover:bg-emerald-100 transition-colors" aria-label="Instagram">
            <FaInstagram className="text-xl" />
          </a>
          <a href="#" className="btn btn-circle btn-sm btn-ghost hover:bg-emerald-100 transition-colors" aria-label="LinkedIn">
            <FaLinkedin className="text-xl" />
          </a>
        </div>
      </nav>

      {/* Newsletter Form */}
      <form onSubmit={handleSubmit} className="animate-fade-in-up">
        <h6 className="footer-title text-lg">Newsletter</h6>
        <fieldset className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Enter your email address</span>
          </label>
          <div className="join">
            <input
              type="email"
              placeholder="username@site.com"
              className={`input input-bordered join-item w-full ${
                !isValidEmail ? "input-error" : ""
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsValidEmail(true);
              }}
              required
            />
            <button
              type="submit"
              className="btn join-item bg-emerald-600 text-white hover:bg-emerald-700 
                        shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 
                        transition-all duration-300"
            >
              Subscribe
            </button>
          </div>
          {!isValidEmail && (
            <span className="text-red-500 text-sm mt-1">Please enter a valid email address</span>
          )}
        </fieldset>
      </form>

      {/* Copyright Notice */}
      <div className="w-full text-center mt-8 border-t pt-6">
        <p className="text-sm text-base-content/60">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;