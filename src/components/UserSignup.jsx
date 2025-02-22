import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const UserSignUp = () => {
  const [user_number, setUserNumber] = useState("");


  const handleChange = (e) => {
    setUserNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user_number.length !== 10) {
      toast.error("Enter a valid number");
      return;
    }

    try {
      const response = await axios.post("https://xtmpxko7pt.ap.loclx.io/api/v1/otp/send-otp", {
        mobileNumber: user_number,
      });
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div bg-black>
      <h1>User SignUp</h1>
      <form id="myForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="usernumber"
          placeholder="Enter mobile number"
          value={user_number}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default UserSignUp;
