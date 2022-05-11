import Tuotelista from "./harkkatyo";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        {
            id: "1",
            nimi: "Kivi",
            hyllypaikka: "9",
            maara: "9"
          },
          {
            id: "3",
            nimi: "Lokki",
            hyllypaikka: "10",
            maara: "10"
          },
          {
            id: "10",
            nimi: "Päärynä",
            hyllypaikka: "10",
            maara: "10"
          },
          {
            id: "4",
            nimi: "Auto",
            hyllypaikka: "3",
            maara: "10"
          },
          {
            id: "5",
            nimi: "Papaija",
            hyllypaikka: "4",
            maara: "13"
          },
          {
            id: "7",
            nimi: "Majoneesi",
            hyllypaikka: "70",
            maara: "1000"
          }
      ]),
    });
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });

   describe("testi harkkatyölle", () => {
    test("Testataan otsikkoa", () => {
      render(<Tuotelista />);
      expect(screen.queryByText(/Loading/)).toBeInTheDocument();
    });
});
describe("Testit tuoteluettelolle", () => {

    test("Haetaan REST-APISTA teidot ja tarkistetaan, että ne näkyvät oikein", async () => {
      render(<Tuotelista info={"Testi"} />);
  
      const items = await screen.findAllByTestId("pUser");
      expect(items).toHaveLength(6);
      expect(items[0].innerHTML).toBe("Kivi");
      expect(items[1].innerHTML).toBe("Lokki");
      expect(items[2].innerHTML).toBe("Päärynä");
      expect(items[3].innerHTML).toBe("Auto");
      expect(items[4].innerHTML).toBe("Papaija");
      expect(items[5].innerHTML).toBe("Majoneesi");
      expect(screen.getByText("Kivi")).toBeInTheDocument();
    });
  });