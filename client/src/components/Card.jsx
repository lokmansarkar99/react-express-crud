import { deleteContact } from "../api/ContactApi";

const Card = ({ currContact, setdata, setUpdateFormData }) => {
  const deleteContactData = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
      if (!confirmDelete) return; // Stop if user cancels

      const res = await deleteContact(currContact._id);

      if (res.status === 200) {  // Ensure the request was successful
        setdata((pre) => pre.filter((contact) => contact._id !== currContact._id));
        console.log("Contact deleted successfully", res.data);
        alert("Contact deleted successfully");
      } else {
        throw new Error("Failed to delete contact"); // Handle unexpected responses
      }
    } catch (error) {
      console.error("Error deleting contact:", error.message);
      alert("Failed to delete contact. Please try again.");
    }
  };

  const handleUpdateData = () => {
    setUpdateFormData(currContact);
  };

  const { _id, name, age, phone, email } = currContact;
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-600">Age: {age}</p>
      <p className="text-gray-600">Phone: {phone}</p>
      <p className="text-gray-600">Email: {email}</p>

      <div className="mt-4 flex justify-between space-x-4">
        <button
          onClick={handleUpdateData}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Edit
        </button>
        <button
          onClick={deleteContactData}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
