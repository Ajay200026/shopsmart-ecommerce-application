import React from "react";

const Footer = () => {
  const footerNavs = [
    {
      href: "#",
      name: "Terms",
    },
    {
      name: "License",
      href: "#",
    },
    {
      href: "#",
      name: "Privacy",
    },
    {
      href: "#",
      name: "About us",
    },
  ];
  return (
    <footer className="pt-10  bg-gradient-to-r from-emerald-500 to-emerald-900">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="justify-between sm:flex">
          <div className="space-y-6">
            <img src="/logo2.png" className="w-32" alt="Logo" />
            <p className="max-w-md font-mono text-white">
              Your savvy online shop! Explore top-notch products at unbeatable
              prices. Smart shopping made easy!
            </p>
            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              {footerNavs.map((item, idx) => (
                <li
                  key={idx}
                  className="text-white hover:text-gray-500 duration-150"
                >
                  <a href={item.href}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <p className="text-white font-semibold">Get the app</p>
            <div className="flex items-center gap-3 mt-3 sm:block"></div>
          </div>
        </div>
        <div className="mt-10 py-10 border-t md:text-center">
          <p className=" text-white">
            © 2024 ShopSmart Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
