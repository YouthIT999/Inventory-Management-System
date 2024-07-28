import React from "react";
import { BsXCircleFill } from "react-icons/bs";
import { BsPencilFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const Card = ({ rows, deleteRow, editRow }) => {
  const [search, setSearch] = useState("");
  return (
    <>
      <form onChange={(e) => setSearch(e.target.value)}>
        <input type="text" placeholder="Search  Product.." id="myInput" />
        <span className="find">
          <FaSearch />
        </span>
      </form>

      <div className="container">
        <table>
          <thead>
            <tr>
              <th>Product Image</th>
              <th> Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
              <th>category</th>
              <th>Quantity</th>
              <th>sold</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {rows
              .filter((row) => {
                return search.toLowerCase() === ""
                  ? row
                  : row.name.toLowerCase().includes(search);
              })
              .map((row, idx) => {
                const statusText =
                  row.status.charAt(0).toUpperCase() + row.status.slice(1);
                return (
                  <tr key={idx}>
                    {row.image && (
                      <td>
                        <div className="image">
                          <img src={row.image} alt={row.name} />
                        </div>
                      </td>
                    )}

                    <td>{row.name}</td>
                    <td>{row.description}</td>
                    <td>{row.price}</td>
                    <td>
                      <h3 className={`status-${row.status}`}> {statusText}</h3>
                    </td>
                    <td>{row.category}</td>
                    <td>{row.quantity}</td>
                    <td>{row.sold}</td>
                    <td>
                      <span className="delete">
                        <BsXCircleFill onClick={() => deleteRow(idx)} />
                      </span>
                      <span className="edit">
                        <BsPencilFill onClick={() => editRow(idx)} />
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Card;
