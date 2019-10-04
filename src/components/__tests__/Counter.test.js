import React from "react";
import "@testing-library/jest-dom/extend-expect";
import * as rtl from "@testing-library/react";
import Counter from "../Counter";

let tools;

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false
      };
    }
  }
});

beforeEach(() => {
  rtl.cleanup();
  tools = rtl.render(<Counter user="Peter" countLimit={5} />);
});

describe("Counter component", () => {
  it("can debug the output", () => {
    tools.debug();
  });

  it("shows the correct user", () => {
    const elementWithJoshText = tools.queryByText(/peter/i);
    expect(elementWithJoshText).toBeInTheDocument();
  });

  it("initial count is zero", () => {
    const elementWithZero = tools.queryByText(/0/);
    expect(elementWithZero).toBeInTheDocument();
  });

  it("can increment the count by one by clicking increment", () => {
    const incButton = tools.queryByTestId("incButton");

    rtl.fireEvent.click(incButton);
    expect(tools.queryByText(/0/)).not.toBeInTheDocument();
    expect(tools.queryByText(/1/)).toBeInTheDocument();

    rtl.fireEvent.click(incButton);
    expect(tools.queryByText(/1/)).not.toBeInTheDocument();
    expect(tools.queryByText(/2/)).toBeInTheDocument();
  });
  ///////////////////////////////////////////////////////////////////////
  it("can decrement the count by one by clicking decrement", () => {
    // implement
    const decButton = tools.queryByTestId("decButton");
    rtl.fireEvent.click(decButton);
    expect(tools.queryByText(/0/)).not.toBeInTheDocument();
    expect(tools.queryByText(/-1/)).toBeInTheDocument();
  });

  it("can reset the count clicking rest", () => {
    // implement
    const decButton = tools.queryByTestId("decButton");
    const resetButton = tools.queryByTestId("resetButton");
    rtl.fireEvent.click(decButton);
    rtl.fireEvent.click(resetButton);
    expect(tools.queryByText(/0/)).toBeInTheDocument();
    expect(tools.queryByText(/-1/)).not.toBeInTheDocument();
  });

  it("prevents the count from going over an upper limit", () => {
    // implement
    const higherLimit = 5;
    const incButton = tools.queryByTestId("incButton");

    for (let i = 0; i < higherLimit + 5; i++) {
      rtl.fireEvent.click(incButton);
    }

    expect(tools.queryByText(/5/)).toBeInTheDocument();
  });

  it("prevents the count from going under a lower limit", () => {
    // implement
    const lowerLimit = -5;
    const decButton = tools.queryByTestId("decButton");

    for (let i = 0; i > lowerLimit - 5; i--) {
      rtl.fireEvent.click(decButton);
    }

    expect(tools.queryByText(/-5/)).toBeInTheDocument();
  });

  it("shows a warning once we hit the upper limit of the counter", () => {
    // implement
    const higherLimit = 5;
    const overLimit = 50;

    const incButton = tools.queryByTestId("incButton");

    for (let i = 0; i < overLimit; i++) {
      rtl.fireEvent.click(incButton);
        const countDiv = tools.queryByTestId("countDiv");
        const count = countDiv.textContent.split("The count is ")[1];
        if(Number(count) === higherLimit) {
          console.warn("We have reached a upper limit of count, which is "+higherLimit);
          break;
        }    
    }


  });

  it("shows a warning once we hit the lower limit of the counter", () => {
    // implement
    const lowLimit = -5;
    const overLimit = -50;

    const decButton = tools.queryByTestId("decButton");

    for (let i = 0; i > overLimit; i--) {
      rtl.fireEvent.click(decButton);
        const countDiv = tools.queryByTestId("countDiv");
        const count = countDiv.textContent.split("The count is ")[1];
        if(Number(count) === lowLimit) {
          console.warn("We have reached a lower limit of count which is " +lowLimit);
          break;
        }    
    }
  });
});
