import { IClub } from "../interfaces/club";

const BASE_URL = "https://public.allaboutapps.at/hiring/clubs.json";

async function fetchData(url: string = BASE_URL): Promise<Map<string, IClub>> {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return mapJsonToClubs(json);
  } catch (err) {
    console.error("err =", err);
    throw new Error("Clubs data cannot be loaded or is malformed");
  }
}

function mapJsonToClubs(clubsArray: Array<IClub>): Map<string, IClub> {
  const result = new Map<string, IClub>();
  clubsArray.forEach((club) => {
    result.set(club.id, club);
  });
  return result;
}

export default fetchData;
