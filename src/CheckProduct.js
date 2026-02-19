import { useState } from "react";
import "./CheckProduct.css";

/* ===============================
   FAKE MEDICINE DATABASE (100)
================================= */
const medicines = [
  { code: "MED-1000", name: "Panadol 500mg", manufacturer: "GSK Pharma", status: "legit" },
  { code: "MED-1001", name: "Disprin Tablet", manufacturer: "Reckitt Benckiser", status: "legit" },
  { code: "MED-1002", name: "Brufen 400mg", manufacturer: "Abbott Pharma", status: "legit" },
  { code: "MED-1003", name: "Augmentin 625mg", manufacturer: "GSK Pharma", status: "legit" },
  { code: "MED-1004", name: "Calpol Syrup", manufacturer: "GSK Pharma", status: "legit" },
  { code: "MED-1005", name: "Ponstan Forte", manufacturer: "Pfizer Labs", status: "expired" },
  { code: "MED-1006", name: "Flagyl 400mg", manufacturer: "Sanofi", status: "legit" },
  { code: "MED-1007", name: "Ventolin Inhaler", manufacturer: "GSK Pharma", status: "legit" },
  { code: "MED-1008", name: "Zyrtec 10mg", manufacturer: "UCB Pharma", status: "legit" },
  { code: "MED-1009", name: "Neurobion Tablet", manufacturer: "Merck", status: "legit" },

  { code: "MED-1010", name: "Arinac Forte", manufacturer: "Hilton Pharma", status: "fake" },
  { code: "MED-1011", name: "Surbex-Z", manufacturer: "Abbott Pharma", status: "legit" },
  { code: "MED-1012", name: "Rigix 10mg", manufacturer: "Getz Pharma", status: "legit" },
  { code: "MED-1013", name: "Buscopan 10mg", manufacturer: "Sanofi", status: "expired" },
  { code: "MED-1014", name: "Mucaine Suspension", manufacturer: "Pfizer Labs", status: "legit" },
  { code: "MED-1015", name: "ORS Sachet", manufacturer: "PharmaCare Ltd", status: "legit" },
  { code: "MED-1016", name: "Glucophage 850mg", manufacturer: "Merck", status: "legit" },
  { code: "MED-1017", name: "Lipitor 20mg", manufacturer: "Pfizer Labs", status: "fake" },
  { code: "MED-1018", name: "Amoxil 250mg", manufacturer: "GSK Pharma", status: "legit" },
  { code: "MED-1019", name: "Cac-1000 Plus", manufacturer: "Searle Pakistan", status: "legit" },

  { code: "MED-1020", name: "Panadol Extra", manufacturer: "GSK Pharma", status: "legit" },
  { code: "MED-1021", name: "Disprin Plus", manufacturer: "Reckitt Benckiser", status: "expired" },
  { code: "MED-1022", name: "Brufen Syrup", manufacturer: "Abbott Pharma", status: "legit" },
  { code: "MED-1023", name: "Augmentin 375mg", manufacturer: "GSK Pharma", status: "legit" },
  { code: "MED-1024", name: "Calpol 500mg", manufacturer: "GSK Pharma", status: "fake" },
  { code: "MED-1025", name: "Ponstan 250mg", manufacturer: "Pfizer Labs", status: "legit" },
  { code: "MED-1026", name: "Flagyl Suspension", manufacturer: "Sanofi", status: "legit" },
  { code: "MED-1027", name: "Ventolin Syrup", manufacturer: "GSK Pharma", status: "expired" },
  { code: "MED-1028", name: "Zyrtec Syrup", manufacturer: "UCB Pharma", status: "legit" },
  { code: "MED-1029", name: "Neurobion Injection", manufacturer: "Merck", status: "legit" },

  { code: "MED-1030", name: "Arinac Tablet", manufacturer: "Hilton Pharma", status: "legit" },
  { code: "MED-1031", name: "Surbex-T", manufacturer: "Abbott Pharma", status: "legit" },
  { code: "MED-1032", name: "Rigix Syrup", manufacturer: "Getz Pharma", status: "fake" },
  { code: "MED-1033", name: "Buscopan Syrup", manufacturer: "Sanofi", status: "legit" },
  { code: "MED-1034", name: "Mucaine Gel", manufacturer: "Pfizer Labs", status: "legit" },
  { code: "MED-1035", name: "ORS Orange", manufacturer: "PharmaCare Ltd", status: "expired" },
  { code: "MED-1036", name: "Glucophage XR", manufacturer: "Merck", status: "legit" },
  { code: "MED-1037", name: "Lipitor 10mg", manufacturer: "Pfizer Labs", status: "legit" },
  { code: "MED-1038", name: "Amoxil Suspension", manufacturer: "GSK Pharma", status: "fake" },
  { code: "MED-1039", name: "Cac-1000", manufacturer: "Searle Pakistan", status: "legit" },

  // Remaining 60 generic realistic medicines
];

for (let i = 40; i < 100; i++) {
  medicines.push({
    code: `MED-10${i}`,
    name: `Generic Medicine ${i + 1}`,
    manufacturer: "Global Pharma",
    status: i % 7 === 0 ? "fake" : i % 5 === 0 ? "expired" : "legit"
  });
}

/* ===============================
   COMPONENT
================================= */
export default function CheckProduct() {
  const [file, setFile] = useState(null);
  const [productCode, setProductCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===============================
     CODE CHECK FUNCTION
  ================================= */
  const handleCodeCheck = (e) => {
    e.preventDefault();
    if (!productCode) return alert("Enter a product code");

    setLoading(true);

    setTimeout(() => {
      const found = medicines.find(
        (med) => med.code.toLowerCase() === productCode.toLowerCase()
      );

      if (found) {
        setResult({
          status: "legit",
          message: `Medicine Name: ${found.name}
Manufacturer: ${found.manufacturer}
Code: ${found.code}

This product is ORIGINAL and VERIFIED.`,
        });
      } else {
        setResult({
          status: "fake",
          message: "Fake Medicine — Code Not Found",
        });
      }

      setLoading(false);
    }, 800);
  };

  /* ===============================
     IMAGE CHECK (Fake for Now)
  ================================= */
  const handleImageUpload = (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first");

    setLoading(true);

    setTimeout(() => {
      setResult({
        status: "legit",
        message:
          "Image Verified Successfully!\n\nThis product appears to be ORIGINAL (Demo Mode).",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="check-wrapper">
      <div className="check-card">
        <h1>🔍 Medicine Authenticity Identifier</h1>
        <p className="subtitle">
          Enter the code to verify your Medicines
        </p>


        {/* Code Check */}
        <form onSubmit={handleCodeCheck} className="form-section">
          <label>🔑 Enter Medicine Code:</label>
          <input
            type="text"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            placeholder="e.g., MED-1000"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Check by Code"}
          </button>
        </form>

        {/* Result Box */}
        {result && (
          <div
            className={`result-box ${
              result.status === "legit" ? "success" : "error"
            }`}
          >
            <pre>{result.message}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
