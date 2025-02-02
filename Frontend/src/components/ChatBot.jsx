import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import emailjs from "emailjs-com";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    userPhoneNumber: "",
    question: "",
  });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.userName,
      from_phoneNumber: formData.userPhoneNumber,
      to_name: "Recipient Name", // Replace with the recipient's name
      message: formData.question,
    };

    emailjs
      .send(
        "service_00qri5c", // Replace with your EmailJS service ID
        "template_5n5da2j", // Replace with your EmailJS template ID
        templateParams,
        "CMMUZS96g4IVLFL0R" // Replace with your EmailJS user ID
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response.status, response.text);
        },
        (error) => {
          console.error("Failed to send email:", error);
        }
      );

    setFormData({
      userName: "",
      userPhoneNumber: "",
      question: "",
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-2xl w-80 overflow-hidden transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Your HelpLine </h3>
            <button
              onClick={handleToggle}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-4">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="Enter your name"
            />
            <label
              htmlFor="userPhoneNumber"
              className="block text-sm font-medium text-gray-700 mb-2 mt-4"
            >
              Your Phone Number
            </label>
            <input
              type="number"
              id="userPhoneNumber"
              name="userPhoneNumber"
              value={formData.userPhoneNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              placeholder="Enter your email"
            />
            <p className="text-[12px] text-gray-600">You will receive a call on this number once we receive your concern</p>
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700 mb-2 mt-4"
            >
              How can we help you?
            </label>
            <textarea
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              required
              placeholder="Type your question here..."
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2 transition-colors duration-300"
              >
                <span>Send</span>
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={handleToggle}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
