import { render, screen } from "@testing-library/react";
import Koti from "./Koti";

describe("testi harkkatyölle", () => {
    test("Testataan otsikkoa", () => {
      render(<Koti />);
      expect(screen.queryByText(/Tervetuloa tuotehallintaan/)).toBeInTheDocument();
    });
});