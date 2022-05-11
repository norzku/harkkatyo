import Editproducts from "./editproducts";
import { render, screen, fireEvent } from "@testing-library/react";

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

  describe("Testit Asiakaslistalle", () => {
    test("Testataan infotekstiä", () => {
      render(<Editproducts/>);
      expect(screen.getByText(/Loading.../)).toBeInTheDocument();
    });
    test("Haetaan REST-APISTA tiedot ja tarkistetaan, että ne näkyvät oikein", async () => {
      render(<Editproducts/>);
      // Haetaan pUserit
      screen.debug();
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