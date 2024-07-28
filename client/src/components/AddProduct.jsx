import React, { Fragment, useContext, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import AuthContext from "../components/AuthContext";

export default function AddProduct({ addProductModalSetting, handlePageUpdate, currentProduct }) {
  const authContext = useContext(AuthContext);
  const [product, setProduct] = useState({
    userId: authContext.user,
    name: "",
    Quantity: 0,
    price: 0,
    date: "",
    description: "",
    image: null,
  });
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (currentProduct) {
      setProduct(currentProduct);
    }
  }, [currentProduct]);

  const handleInputChange = (key, value) => {
    setProduct({ ...product, [key]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
    }
  };

  const addProduct = () => {
    handlePageUpdate(product);
    addProductModalSetting();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PlusIcon className="h-6 w-6 text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                      <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 ">
                        {currentProduct ? "Edit Product" : "Add Product"}
                      </Dialog.Title>
                      <form action="#">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={product.name}
                              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Type product name"
                            />
                          </div>
                          <div>
                            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Quantity
                            </label>
                            <input
                              type="number"
                              name="Quantity"
                              id="quantity"
                              value={product.Quantity}
                              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Ex. 3"
                            />
                          </div>
                          <div>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Price
                            </label>
                            <input
                              type="number"
                              name="price"
                              id="price"
                              value={product.price}
                              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="$2999"
                            />
                          </div>
                          <div>
                            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Date Added
                            </label>
                            <input
                              type="date"
                              name="date"
                              id="date"
                              value={product.date}
                              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Ex. 20"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Description
                            </label>
                            <textarea
                              id="description"
                              name="description"
                              rows="4"
                              value={product.description}
                              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="Write product description here..."
                            ></textarea>
                          </div>
                          <div className="sm:col-span-2">
                            <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Image
                            </label>
                            <input
                              type="file"
                              name="image"
                              id="image"
                              onChange={handleImageChange}
                              className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                              accept="image/*"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={addProduct}
                  >
                    {currentProduct ? "Update" : "Add"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={addProductModalSetting}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
