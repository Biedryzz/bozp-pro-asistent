// Mapování simulovaných detekcí na popis, řešení a paragrafy
export interface Risk {
  name: string;
  description: string;
  solution: string;
  lawRef: string;
}

export const RISK_DATABASE: Risk[] = [
  {
    name: "Chybějící ochranné přilby",
    description: "Někteří pracovníci nemají ochrannou přilbu.",
    solution: "Zajistit používání ochranných přileb na pracovišti.",
    lawRef: "§ 104 zákoníku práce (262/2006 Sb.), NV 495/2001 Sb."
  },
  {
    name: "Zablokovaná úniková cesta",
    description: "Úniková cesta je částečně nebo úplně zablokovaná.",
    solution: "Označit a uvolnit únikovou cestu.",
    lawRef: "§ 5 NV č. 101/2005 Sb."
  },
  {
    name: "Nechráněný pohyblivý stroj",
    description: "Stroj nemá ochranný kryt pohyblivých částí.",
    solution: "Instalovat ochranný kryt na stroj.",
    lawRef: "§ 4 NV č. 378/2001 Sb."
  },
  {
    name: "Nepořádek na pracovišti",
    description: "Na pracovišti je nepořádek, zvýšené riziko zakopnutí.",
    solution: "Provést úklid a udržovat pořádek.",
    lawRef: "§ 3 NV č. 101/2005 Sb."
  },
  {
    name: "Skladování materiálu nad hlavou",
    description: "Materiál je uskladněn nad hlavami pracovníků.",
    solution: "Zajistit bezpečné skladování mimo pohyb osob.",
    lawRef: "§ 101 zákoníku práce, § 2 NV 101/2005 Sb."
  }
];

// Demo funkce: pro ukázku vrací 1–3 náhodná rizika
export function detectRisksFromImageName(imageName: string): Risk[] {
  // Pro demo – urči rizika podle názvu souboru, jinak náhodně
  if (imageName.includes("prilba")) {
    return [RISK_DATABASE[0]];
  }
  if (imageName.includes("unik")) {
    return [RISK_DATABASE[1]];
  }
  // Jinak náhodně 1–3 rizika
  const count = Math.floor(Math.random() * 3) + 1;
  return RISK_DATABASE.sort(() => 0.5 - Math.random()).slice(0, count);
}
