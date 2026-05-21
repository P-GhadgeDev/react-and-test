import { render, screen } from "@testing-library/react";
import user from '@testing-library/user-event';
import App from "./App";

// test("renders user form", () => {
//   render(<App />);

//   const inputs = screen.getAllByRole("textbox");
//   expect(inputs.length).toBe(2);
// });

// test("renders user list component", () => {
//   render(<App />);

//   const hrElement = screen.getByRole("separator");
//   expect(hrElement).toBeInTheDocument();
// });

test('can receive a new user and show it on a list', async () => {
  render(<App />);

  const nameInput = screen.getByRole('textbox', {
    name: /name/i,
  });
  const emailInput = screen.getByRole('textbox', {
    name: /email/i,
  });
  const button = screen.getByRole('button');

  await user.click(nameInput);
  await user.keyboard('jane');
  await user.click(emailInput);
  await user.keyboard('jane@jane.com');

  await user.click(button);

  const name = screen.getByRole('cell', { name: 'jane' });
  const email = screen.getByRole('cell', { name: 'jane@jane.com' });

  expect(name).toBeInTheDocument();
  expect(email).toBeInTheDocument();
});
