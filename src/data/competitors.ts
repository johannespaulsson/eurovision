export interface Competitor {
  id: string;
  country: string;
  artist: string;
  song: string;
  order: number;
}

export const competitors: Competitor[] = [
  { id: "dk", country: "Denmark", artist: "Søren Torpegaard Lund", song: "Før vi går hjem", order: 1 },
  { id: "de", country: "Germany", artist: "Sarah Engels", song: "Fire", order: 2 },
  { id: "il", country: "Israel", artist: "Noam Bettan", song: "Michelle", order: 3 },
  { id: "be", country: "Belgium", artist: "Essyla", song: "Dancing on the Ice", order: 4 },
  { id: "al", country: "Albania", artist: "Alis", song: "Nân", order: 5 },
  { id: "gr", country: "Greece", artist: "Akylas", song: "Ferto", order: 6 },
  { id: "ua", country: "Ukraine", artist: "Leléka", song: "Ridnym", order: 7 },
  { id: "au", country: "Australia", artist: "Delta Goodrem", song: "Eclipse", order: 8 },
  { id: "rs", country: "Serbia", artist: "Lavina", song: "Kraj Mene", order: 9 },
  { id: "mt", country: "Malta", artist: "Aidan", song: "Bella", order: 10 },
  { id: "cz", country: "Czechia", artist: "Daniel Žižka", song: "Crossroads", order: 11 },
  { id: "bg", country: "Bulgaria", artist: "Dara", song: "Bangaranga", order: 12 },
  { id: "hr", country: "Croatia", artist: "Lelek", song: "Andromeda", order: 13 },
  { id: "gb", country: "United Kingdom", artist: "Look Mum No Computer", song: "Eins, Zwei, Drei", order: 14 },
  { id: "fr", country: "France", artist: "Monroe", song: "Regarde!", order: 15 },
  { id: "md", country: "Moldova", artist: "Satoshi", song: "Viva, Moldova!", order: 16 },
  { id: "fi", country: "Finland", artist: "Linda Lampenius x Pete Parkkonen", song: "Liekinheitin", order: 17 },
  { id: "pl", country: "Poland", artist: "Alicja", song: "Pray", order: 18 },
  { id: "lt", country: "Lithuania", artist: "Lion Ceccah", song: "Sólo quiero más", order: 19 },
  { id: "se", country: "Sweden", artist: "Felicia", song: "My System", order: 20 },
  { id: "cy", country: "Cyprus", artist: "Antigoni", song: "Jalla", order: 21 },
  { id: "it", country: "Italy", artist: "Sal Da Vinci", song: "Per Sempre Sì", order: 22 },
  { id: "no", country: "Norway", artist: "Jonas Lovv", song: "Ya Ya Ya", order: 23 },
  { id: "ro", country: "Romania", artist: "Alexandra Căpitănescu", song: "Choke Me", order: 24 },
  { id: "at", country: "Austria", artist: "Cosmó", song: "Tanzschein", order: 25 },
];
