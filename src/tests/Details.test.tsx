import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { createTheme } from "@mui/material/styles";
import { IClub } from "../interfaces/club";
import Details from "../components/Details";
import { BrowserRouter } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#01C13B",
      contrastText: "#fff",
    },
  },
});

const clubs = new Map<string, IClub>([
  [
    "id1",
    {
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
    },
  ],
]);

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual<any>("react-router-dom")),
  useParams: () => ({
    id: "id1",
  }),
}));

it("should show the clubs name in the header", () => {
  render(
    <BrowserRouter>
      <Details theme={theme} clubs={clubs} />
    </BrowserRouter>
  );
  expect(screen.getByTestId("header").textContent).toEqual("Club 123");
});

it("should show the error placeholder if the clubs id could not be found", () => {
  render(
    <BrowserRouter>
      <Details
        theme={theme}
        clubs={new Map([["unknownId", clubs.get("id1")!]])}
      />
    </BrowserRouter>
  );
  expect(screen.getByTestId("header").textContent).toEqual("Club not found ❌");
});
