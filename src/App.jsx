import { useState } from "react";
import { BackgroundLines } from "../components/ui/background-lines";

function App() {
  const [upiID, setUpiID] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  // const [currency, setCurrency] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateQRCode = (e) => {
    e.preventDefault();
    const upiURL = `upi://pay?pa=${upiID}&pn=${name}&am=${amount}&cu=INR`;
    const qrAPI = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      upiURL
    )}`;
    setQrCodeUrl(qrAPI);
    setIsModalOpen(true);
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-5">
       <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        ezUPI <br /> 
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
      Generate Dynamic QR Code for your store or events <br />
      Save 2% transaction fee <br />
      Unlock more possibilites
      </p>
    </BackgroundLines>
      <h2 className="text-2xl font-bold mb-6">Generate UPI QR Code</h2>
      <form
        onSubmit={generateQRCode}
        className="bg-stone-300 p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700">UPI ID:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
            value={upiID}
            onChange={(e) => setUpiID(e.target.value)}
            required
            placeholder="12345@hdfc"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Merchant Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount:</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="199"
            min={1}
          />
          
        </div>
        {/* <div className="mb-4">
          <label className="block text-gray-700">Currency:</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
          />
        </div> */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Generate QR Code
        </button>
      </form>

      //Modal
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Scan the QR Code to pay ₹{amount} to {name}</h3>
            <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-4" />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <footer>
        <div className="text-white">
          Built with ♥ by Akash
        </div>
      </footer>
    </div>
  );
}

export default App;
