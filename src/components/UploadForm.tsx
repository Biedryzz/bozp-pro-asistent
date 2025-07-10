import { useRef, useState } from "react";
import Loader from "./Loader";
import RiskReport from "./RiskReport";

interface AnalysisResult {
  risks: {
    name: string;
    description: string;
    solution: string;
    lawRef: string;
  }[];
  riskLevel: string;
  recommendation: string;
  imageUrl: string;
  error?: string;
}

export default function UploadForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResult(null);
    setLoading(true);
    setImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 2px 16px #0001",
      padding: 24,
      margin: "0 auto",
      maxWidth: 430,
      marginTop: 30
    }}>
      {!image && (
        <form>
          <label>
            <b>Nahrajte fotografii pracoviště:</b>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              style={{ display: "block", margin: "20px 0" }}
            />
          </label>
        </form>
      )}

      {image && (
        <div>
          <img src={image} alt="Pracoviště" style={{
            width: "100%",
            borderRadius: 10,
            marginBottom: 16
          }} />
          {!loading && <button onClick={handleReset} style={{
            border: "none", background: "#ececec", padding: "8px 18px", borderRadius: 8, cursor: "pointer"
          }}>Zpět</button>}
        </div>
      )}

      {loading && <Loader />}
      {result && <RiskReport result={result} />}
    </div>
  );
}
