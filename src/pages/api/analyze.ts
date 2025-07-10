import type { NextApiRequest, NextApiResponse } from "next";
import { detectRisksFromImageName } from "@/utils/riskRules";

export const config = {
  api: {
    bodyParser: false
  }
};

function buffer(req: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const contentType = req.headers["content-type"] || "";
  if (!contentType.startsWith("multipart/form-data")) {
    return res.status(400).json({ error: "Špatný typ dat, nahrajte prosím fotografii." });
  }

  // Ruční parsování multipart dat (demo, bez třetích stran)
  const raw = await buffer(req);
  const str = raw.toString();
  const filenameMatch = /filename="(.+?)"/.exec(str);
  const imageName = filenameMatch ? filenameMatch[1] : "unknown";

  // Simulace: nekvalitní obrázek (pro demo, pokud obsahuje "blur" v názvu)
  if (imageName.includes("blur")) {
    return res.status(200).json({
      error: "Fotografie není dostatečně kvalitní – zkuste prosím jiný úhel nebo lepší světlo."
    });
  }

  const risks = detectRisksFromImageName(imageName);

  // Vyhodnocení míry rizika
  let riskLevel = "Nízké";
  if (risks.length >= 3) riskLevel = "Vysoké";
  else if (risks.length === 2) riskLevel = "Střední";

  let recommendation = "Pracoviště je v pořádku. Doporučujeme pravidelnou kontrolu.";
  if (riskLevel === "Střední") recommendation = "Proveďte školení a fyzickou kontrolu BOZP.";
  if (riskLevel === "Vysoké") recommendation = "Doporučujeme okamžitě kontaktovat bezpečnostního technika.";

  res.status(200).json({
    risks,
    riskLevel,
    recommendation
  });
}
