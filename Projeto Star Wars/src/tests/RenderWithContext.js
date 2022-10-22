import React from "react";
import { render } from "@testing-library/react";
import Provider from "../Hooks/Provider";

export const renderWithContext = (component) => ({
...render(<Provider>{component}</Provider>),
}); 