import { useEffect, useState } from "react";
import axios from "axios";

function AddCustomer(props) {
  const [view, isView] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [state, setState] = useState([]);

  useEffect(async () => {
    const url = "http://127.0.0.1:8000/customers";
    const response = await axios.get(url).catch((err) => console.log(err));
    setState(response.data);
  });

  const handleInput = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://127.0.0.1:8000/cust";
    let response = await axios.post(url, formData);
  };

  const handleView = async () => {
    isView(!view);
    if (view) {
      console.log(state);
    }
  };

  // const getCustData = async () => {
  //   setState(response.data);
  //   console.log(state);
  // };

  return (
    <div className="App Container">
      <h2>Add Customer Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-outline">
          <p>Name</p>
          <input
            type="text"
            value={formData.name}
            name="name"
            onChange={(e) => handleInput(e)}
          ></input>
        </div>
        <div>
          <p>Email</p>
          <input
            type="email"
            value={formData.email}
            name="email"
            onChange={(e) => handleInput(e)}
          ></input>
        </div>
        <div>
          <p>Phone Number</p>
          <input
            type="text"
            value={formData.phone}
            name="phone"
            onChange={(e) => handleInput(e)}
          ></input>
        </div>
        <button type="submit">Confirm</button>
      </form>
      <button onClick={handleView}>View all customers</button>
      <br />
      {view && (
        <div>
          <table>
            {state.map((item) => (
              <tr key={item.id}>
                {Object.values(item).map((val) => (
                  <td>{val}</td>
                ))}
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
}

export default AddCustomer;
