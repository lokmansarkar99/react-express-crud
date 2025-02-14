import { useEffect, useState } from "react";
import { addContact } from "../api/ContactApi";
import { editContact } from "./../api/ContactApi";

const InputForm = ({ setdata, formData, setFormData, updateFormData }) => {
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (updateFormData._id) {
      setFormData(updateFormData);
    }
  }, [updateFormData]);

  const addContactData = async () => {
    if (!formData.name || !formData.age || !formData.email || !formData.phone) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await addContact(formData);

      if (res.status === 201) {
        setdata((pre) => [...pre, res.data]);
        console.log("User Added:", res.data);
        alert("Contact added successfully!");
      } else {
        throw new Error("Failed to add contact");
      }
    } catch (error) {
      console.error("Error adding contact:", error.message);
      alert("Failed to add contact. Please try again.");
    }
  };

  const editContactData = async () => {
    try {
      const res = await editContact(formData._id, formData);

      if (res.status === 200) {
        setdata((pre) =>
          pre.map((contact) =>
            contact._id === formData._id ? res.data : contact
          )
        );
        console.log("Contact Updated:", res.data);
        alert("Contact updated successfully!");
      } else {
        throw new Error("Failed to update contact");
      }
    } catch (error) {
      console.error("Error updating contact:", error.message);
      alert("Failed to update contact. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData._id) {
      await editContactData();
    } else {
      await addContactData();
    }

    setFormData({ name: "", age: "", email: "", phone: "" });
  };

  return (
    <div className="flex justify-center items-start  bg-gray-100 p-4 ">
      <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-3xl">
      <h2 className="text-2xl font-semibold text-center text-blue-400 mb-4">
          React + Express CRUD 
        </h2>
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          {formData._id ? "Update Contact" : "Add Contact"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          {/* Grid for form inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-600 font-medium">
                Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-gray-600 font-medium">
                Age
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="age"
                placeholder="Age"
                value={formData.age}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-600 font-medium">
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-600 font-medium">
                Phone
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            {formData._id ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
