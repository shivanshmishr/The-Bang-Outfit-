import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { useSession } from "next-auth/react";

export default function AccountDetails() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    userprofilepic: "",
    firstname: "",
    lastname: "",
    mobilenumber: "",
    emailid: session?.user.email || "",
    alternatemailid: session?.user.email || "",
    streetaddress: "",
    zipcode: "",
    city: "",
    state: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const requiredFields = [
      "firstname",
      "lastname",
      "mobilenumber",
      "streetaddress",
      "zipcode",
      "city",
      "state",
      "country",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        return false;
      }
    }
    return true;
  };

  const handleSaveDetails = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all the details");
      return;
    }

    setLoading(true);

    try {

      const dataToSend = { ...formData, emailid: session?.user.email };

      const response = await fetch("./api/saveAccountDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log("User details saved successfully");
        toast.success("User details saved successfully");
        setFormData({
          ...formData,
          firstname: "",
          lastname: "",
          mobilenumber: "",
          alternatemailid: "",
          streetaddress: "",
          zipcode: "",
          city: "",
          state: "",
          country: "",
        });
      } else {
        console.error("Failed to save user details");
        toast.error("User Already exists");
      }
    } catch (error) {
      console.error("Error saving user details:", error);
      toast.error("Failed to save user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user.email) {
      setFormData({
        ...formData,
        emailid: session.user.email,
        alternatemailid: session.user.email,
      });
    }
  }, [session]);

  return (
    <div className="md:my-[8vh]  font-sans w-full md:w-[55vw] border-gray-100 shadow-xl border-[1px] flex ">
      <div className="w-full px-[8vh]  mx-auto h-[60vh] overflow-y-scroll ">
        <div className="my-[8vh]">
          <h2 className="text-[3vh] mb-[3vh] font-semibold">Account Details</h2>
          <div>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
              className="bg-gray-100 w-full p-[1vh] rounded-lg border-2 border-gray-300 my-[1vh]"
              placeholder="Enter First Name"
            />
          </div>

          <div>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
              className="bg-gray-100 w-full p-[1vh] rounded-lg border-2 border-gray-300 my-[1vh]"
              placeholder="Enter Last Name"
            />
          </div>

          <div>
            <input
              type="number"
              maxLength={10}
              name="mobilenumber"
              value={formData.mobilenumber}
              onChange={handleInputChange}
              className="bg-gray-100 w-full p-[1vh] rounded-lg border-2 border-gray-300 my-[1vh]"
              placeholder="Enter Mobile Number"
            />
          </div>

          <div>
            <input
              type="email"
              name="alternatemailid"
              value={formData.alternatemailid || session?.user.email || ""}
              onChange={handleInputChange}
              className="bg-gray-100 w-full p-[1vh] rounded-lg border-2 border-gray-300 my-[1vh]"
              placeholder="Alternate Email"
            />
          </div>
        </div>

        <div className="my-[8vh]">
          <h2 className="text-[3vh] mb-[3vh]  font-medium ">Billing Address</h2>

          <div>
            <input
              type="text"
              name="streetaddress"
              value={formData.streetaddress}
              onChange={handleInputChange}
              className="bg-gray-100 w-full p-[1vh] rounded-lg border-2 border-gray-300 my-[1vh]"
              placeholder="Flat No./Street Address"
            />
          </div>

          <div>
            <input
              type="number"
              maxLength={6}
              name="zipcode"
              value={formData.zipcode}
              onChange={handleInputChange}
              className="bg-gray-100 w-full p-[1vh] rounded-lg border-2 border-gray-300 my-[1vh]"
              placeholder="Zip Code"
            />
          </div>

          <div>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="bg-gray-100 w-full p-[1vh] rounded-lg border-2 border-gray-300 my-[1vh]"
              placeholder="City"
            />
          </div>

          <div>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="bg-gray-100 w-full p-[1vh] rounded-lg border-2 border-gray-300 my-[1vh]"
              placeholder="State"
            />
          </div>

          <div>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="bg-gray-100 w-full p-[1vh] rounded-lg border-2 border-gray-300 my-[1vh]"
              placeholder="Country"
            />
          </div>

          <button
            onClick={handleSaveDetails}
            disabled={loading} // Disable the button while loading
            className="savebtn bg-purple-700 w-[12vh] flex flex-row justify-center items-center font-semibold text-white rounded-lg text-[2.5vh]  py-[1.2vh] my-[1vh]"
          >
            {loading ? (
              <div className="flex flex-row ">
                <CircularProgress size={24} color="inherit" />
              </div>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
