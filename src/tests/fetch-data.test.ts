import fetchData from "../fetch/fetch-data";
import { expect, vi } from "vitest";
import { IClub } from "../interfaces/club";

global.fetch = vi.fn();

const sampleClub: IClub = {
  id: "id1",
  name: "Club 123",
  country: "Deutschland",
  value: 123,
  image: "some.image.url",
  european_titles: 523,
  stadium: {
    size: 133123,
    name: "Arena",
  },
  location: {
    lat: 1,
    lng: 2,
  },
};

function createSuccessfulResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

function createErrorResponse(data) {
  return { json: () => new Promise((_, reject) => reject("some error")) };
}

beforeEach(() => {
  fetch.mockReset();
});

it("should map a susccess response to the expected map", async () => {
  fetch.mockResolvedValue(createSuccessfulResponse([sampleClub]));
  const result = await fetchData("https://whatever.com");
  expect(fetch).toHaveBeenCalledWith("https://whatever.com");
  const expected = new Map<string, IClub>([["id1", sampleClub]]);
  expect(result).toStrictEqual(expected);
});

it("should throw an error if the fetch errors out", async () => {
  fetch.mockResolvedValue(createErrorResponse([sampleClub]));
  try {
    await fetchData("https://whatever.com");
  } catch (e) {
    expect(e).toEqual(Error("Clubs data cannot be loaded or is malformed"));
  }
});
