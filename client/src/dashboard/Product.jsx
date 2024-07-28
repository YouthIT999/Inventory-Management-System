import React, { useState, useEffect } from 'react';
import search from "../assets/search-icon.png";
import AddProduct from "../components/AddProduct";

const Product = () => {
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Load products from local storage when the component mounts
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Save products to local storage whenever they are updated
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleAddProductModal = () => {
    setAddProductModalOpen(!isAddProductModalOpen);
    setCurrentProduct(null); // Reset current product when opening modal
  };

  const handlePageUpdate = (newProduct) => {
    if (currentProduct) {
      // Update existing product
      setProducts(products.map(product => product === currentProduct ? newProduct : product));
    } else {
      // Add new product
      setProducts([...products, newProduct]);
    }
    setCurrentProduct(null); // Reset current product after updating
    setAddProductModalOpen(false); // Close the modal after adding/updating the product
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setAddProductModalOpen(true);
  };

  const handleDeleteProduct = (product) => {
    setProducts(products.filter(p => p !== product));
  };

  return (
    <div className="flex flex-col gap-5 w-11/12">
      {isAddProductModalOpen && (
        <AddProduct
          addProductModalSetting={handleAddProductModal}
          handlePageUpdate={handlePageUpdate}
          currentProduct={currentProduct}
        />
      )}

      <div className="overflow-x-auto rounded-lg border bg-white border-gray-200">
        <div className="flex justify-between pt-5 pb-3 px-3">
          <div className="flex gap-4 justify-center items-center">
            <span className="font-bold">Products</span>
            <div className="flex justify-center items-center px-2 border-2 rounded-md">
              <img alt="search-icon" className="w-5 h-5" src={search} />
              <input
                className="border-none outline-none focus:border-none text-xs"
                type="text"
                placeholder="Search here"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAddProductModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs rounded"
            >
              Add Product
            </button>
          </div>
        </div>
        <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Img</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Name</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Quantity</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Desc</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Date Added</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Price</th>
              <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-4 py-2 text-gray-900">
                  {product.image ? <img src={URL.createObjectURL(product.image)} alt={product.name} className="w-10 h-10" /> : 'N/A'}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{product.name}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{product.Quantity}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{product.description}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{new Date(product.date).toLocaleDateString()}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">${product.price}</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  <button className="text-green-700 mr-2" onClick={() => handleEditProduct(product)}>Edit</button>
                  <button className="text-red-600" onClick={() => handleDeleteProduct(product)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
