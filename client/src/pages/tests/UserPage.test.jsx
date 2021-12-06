import { render, screen } from "@testing-library/react";
import UserPage from "../UserPage";

describe("UserPage component", () => {
  test("UserPage renders", () => {
    render(<UserPage />);
  });
});
