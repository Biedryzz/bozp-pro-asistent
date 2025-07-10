export default function RiskReport({ result }: { result: any }) {
  if (result.error) {
    return (
      <div style={{ color: "red", fontWeight: "bold", marginTop: 12 }}>
        {result.error}
      </div>
    );
  }
  return (
    <div style={{ marginTop: 18 }}>
      <h3>Identifikovaná rizika:</h3>
      <ul>
        {result.risks.map((r: any, i: number) => (
          <li key={i} style={{ marginBottom: 14 }}>
            <b>{r.name}</b><br />
            <span>{r.description}</span><br />
            <span style={{ color: "#007b5a" }}><b>Opatření:</b> {r.solution}</span><br />
            <span style={{ color: "#888" }}><b>Legislativa:</b> {r.lawRef}</span>
          </li>
        ))}
      </ul>
      <hr />
      <div>
        <b>Míra rizika:</b> <span style={{ color: "#cb6700" }}>{result.riskLevel}</span>
        <br />
        <b>Doporučení:</b> {result.recommendation}
      </div>
    </div>
  );
}
