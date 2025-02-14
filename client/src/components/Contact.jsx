import { useState, useEffect } from "react";
import { getContact } from './../api/ContactApi';
import Card from "./Card";

const Contact = ({ data, setdata, setFormData, setUpdateFormData }) => {
  const getContactData = async () => {
    try {
      const res = await getContact();
      
      if (!res || !res.data) {
        throw new Error("Invalid response from server"); // Handle unexpected responses
      }

      console.log(res.data);
      setdata(res.data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
      alert("Failed to fetch contacts. Please try again later.");
    }
  };

  useEffect(() => {
    getContactData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-center pt-2">All Contacts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-8">
        {data.map((currContact) => (
          <Card
            key={currContact._id}
            currContact={currContact}
            setdata={setdata}
            setFormData={setFormData}
            setUpdateFormData={setUpdateFormData}
          />
        ))}
      </div>
    </div>
  );
};

export default Contact;
