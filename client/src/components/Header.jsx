// import React, { Fragment, useContext, useState } from "react";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import { Link } from "react-router-dom";
// import AuthContext from "../components/AuthContext";
// import SideBar from "../dashboard/SideBar"; // Assuming SideBar is in the correct directory
// import profile from "../assets/profile.jpg";

// const userNavigation = [{ name: "Log Out", href: "./logout" }];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function Header() {
//   const authContext = useContext(AuthContext);
//   const localStorageData = JSON.parse(localStorage.getItem("user"));
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="bg-gray-800">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex h-16 items-center justify-between">
//           {/* Logo and title */}
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <div className="flex justify-center items-center gap-2">
//                 <img
//                   className="h-8 w-8"
//                   src={profile}
//                   alt="Inventory Management System"
//                 />
//                 <span className="font-bold text-white italic">
//                   Inventory Management
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Desktop navigation */}
//           <div className="hidden md:block">
//             <div className="ml-4 flex items-center md:ml-6">
//               {/* Notifications */}
//               <button
//                 type="button"
//                 className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//               >
//                 <span className="sr-only">View notifications</span>
//                 <BellIcon className="h-6 w-6" aria-hidden="true" />
//               </button>

//               {/* Profile dropdown */}
//               <Menu as="div" className="relative ml-3">
//                 <div>
//                   <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                     <span className="sr-only">Open user menu</span>
//                   </Menu.Button>
//                 </div>
//                 <Transition
//                   as={Fragment}
//                   enter="transition ease-out duration-100"
//                   enterFrom="transform opacity-0 scale-95"
//                   enterTo="transform opacity-100 scale-100"
//                   leave="transition ease-in duration-75"
//                   leaveFrom="transform opacity-100 scale-100"
//                   leaveTo="transform opacity-0 scale-95"
//                 >
//                   <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                     {userNavigation.map((item) => (
//                       <Menu.Item key={item.name}>
//                         {({ active }) => (
//                           <Link
//                             to={item.href}
//                             className={classNames(
//                               active ? "bg-gray-100" : "",
//                               "block px-4 py-2 text-sm text-gray-700"
//                             )}
//                           >
//                             <span onClick={() => authContext.signout()}>
//                               {item.name}
//                             </span>
//                           </Link>
//                         )}
//                       </Menu.Item>
//                     ))}
//                   </Menu.Items>
//                 </Transition>
//               </Menu>
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="-mr-2 flex md:hidden">
//             <Disclosure.Button
//               className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//               onClick={() => setIsOpen(!isOpen)}
//               aria-expanded={isOpen}
//             >
//               <span className="sr-only">Open main menu</span>
//               {isOpen ? (
//                 <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//               ) : (
//                 <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//               )}
//             </Disclosure.Button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu panel */}
//       <Disclosure.Panel className="md:hidden" open={isOpen}>
//         <div className="bg-gray-800">
//           <SideBar />
//         </div>
//       </Disclosure.Panel>
//     </div>
//   );
// }
