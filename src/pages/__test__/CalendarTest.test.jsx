import { fireEvent, render, screen } from "../../utils/test-utils";
import Calendar from "../Calendar";

test("Modal opens on date click and check date in modal", () => {
  render(<Calendar />);
  const dateElement = screen.getByText(/15/i);

  fireEvent.click(dateElement);
  expect(screen.getByText(/Location/i)).toBeInTheDocument();
  expect(screen.getByText(/15-09-2022/i)).toBeInTheDocument();
});

test("Open modal and enter text into reminder, doesnt allow for length > 30", () => {
  render(<Calendar limit={5} />);
  const dateElement = screen.getByText(/15/i);
  fireEvent.click(dateElement);
  const textArea = screen.getByRole("textbox");
  fireEvent.change(textArea, { target: { value: "Testing All the way" } });
  expect(screen.getByTestId("characterCount")).toHaveTextContent("19 / 30");
  fireEvent.change(textArea, {
    target: { value: "Testing all the way home again" },
  });
  expect(screen.getByTestId("characterCount")).toHaveTextContent("30 / 30");
  //testing over 30 characters isnt allowed
  fireEvent.change(textArea, {
    target: { value: "Testing all the way home agains" },
  });
  expect(screen.getByTestId("characterCount")).toHaveTextContent("30 / 30");
});

test("Toggle change date", () => {
  render(<Calendar limit={5} />);
  const dateElement = screen.getByText(/15/i);
  fireEvent.click(dateElement);

  fireEvent.click(screen.getByText(/15-09-2022/i));
  expect(screen.getByTestId("dateSelector")).toBeInTheDocument();
  fireEvent.change(screen.getByTestId("dateSelector"), {
    target: { value: "2022-08-19" },
  });
  expect(screen.getByTestId("dateSelector").value).toBe("2022-08-19");
});

test("Adding a reminder", () => {
  render(<Calendar />);
  const dateElement = screen.getByText(/15/i);
  fireEvent.click(dateElement);
  fireEvent.click(screen.getByText(/15-09-2022/i));
  const textArea = screen.getByRole("textbox");
  const submit = screen.getByText(/Add to calender/i);
  fireEvent.change(textArea, {
    target: { value: "Test entry" },
  });

  fireEvent.click(submit);
  expect(screen.queryByTestId("characterCount")).not.toBeInTheDocument();
  expect(screen.getByText(/Test entry/i)).toHaveTextContent("12:00");
});
