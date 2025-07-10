import Head from "next/head";
import UploadForm from "@/components/UploadForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>BOZP asistent – demo</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <img src="/icon.svg" alt="BOZP" width={60} style={{ marginBottom: 10 }} />
        <h1>BOZP asistent</h1>
        <p style={{ maxWidth: 370, textAlign: "center", color: "#444" }}>
          Nahrajte fotografii pracoviště, identifikujeme rizika a doporučíme řešení dle legislativy ČR.
        </p>
        <UploadForm />
        <footer style={{ marginTop: 42, color: "#888", fontSize: 13 }}>
          © {new Date().getFullYear()} BOZP asistent – Demo
        </footer>
      </main>
    </>
  );
}
