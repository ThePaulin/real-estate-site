import { render, screen } from "@testing-library/react";
// import Home from '../pages/index'
import Header from "../src/components/global/Header";
import { Button } from "../src/components/elements";
import "@testing-library/jest-dom";

// constants
const sampleText = "my text";
const sampleHref = "my sample href";

// button renders with text
describe("Button", () => {
  it("renders a Button", () => {
    render(<Button>{sampleText}</Button>);

    const button = screen.getByText(sampleText);
    expect(button).toBeInTheDocument();
  });
});

// button renders as Link
describe("Button", () => {
  it("renders a Link", () => {
    render(<Button href={sampleHref}>{sampleText}</Button>);
    const button = screen.getByRole("link");
    expect(button).toBeInTheDocument();
  });
});
