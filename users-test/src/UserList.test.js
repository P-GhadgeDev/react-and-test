import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';

/* screen.logTestingPlaygroundURL() */
// test('render one row per user', () => {
//   // Render the component
//   const users = [
//     { name: 'jane', email: 'jane@jane.com' },
//     { name: 'sam', email: 'sam@sam.com' },
//   ];
//   render(<UserList users={users} />);

//   // Find all the rows in the table
//   const rows = within(screen.getByTestId('users')).getAllByRole('row');

//   // Assertion: correct number of rows in the table
//   expect(rows).toHaveLength(2);
// });

/* Query Function Escape Hatches */
// test('render one row per user', () => {
//   // Render the component
//   const users = [
//     { name: 'jane', email: 'jane@jane.com' },
//     { name: 'sam', email: 'sam@sam.com' },
//   ];
//   render(<UserList users={users} />);

//   // Find all the rows in the table
//   const rows = within(screen.getByTestId('users')).getAllByRole('row');

//   // Assertion: correct number of rows in the table
//   expect(rows).toHaveLength(2);
// });

// test('render the email and name of each user', () => {
//   const users = [
//     { name: 'jane', email: 'jane@jane.com' },
//     { name: 'sam', email: 'sam@sam.com' },
//   ];
//   render(<UserList users={users} />);

//   for (let user of users) {
//     const name = screen.getByRole('cell', { name: user.name });
//     const email = screen.getByRole('cell', { name: user.email });

//     expect(name).toBeInTheDocument();
//     expect(email).toBeInTheDocument();
//   }
// });

/* Avoiding BeforeEach */
function renderComponent() {
  const users = [
    { name: 'jane', email: 'jane@jane.com' },
    { name: 'sam', email: 'sam@sam.com' },
  ];
  render(<UserList users={users} />);

  return {
    users,
  };
}

// test('render one row per user', () => {
//   // Render the component
//   renderComponent();

//   // Find all the rows in the table
//   const rows = within(screen.getByTestId('users')).getAllByRole('row');

//   // Assertion: correct number of rows in the table
//   expect(rows).toHaveLength(2);
// });

// test('render the email and name of each user', () => {
//   const { users } = renderComponent();

//   for (let user of users) {
//     const name = screen.getByRole('cell', { name: user.name });
//     const email = screen.getByRole('cell', { name: user.email });

//     expect(name).toBeInTheDocument();
//     expect(email).toBeInTheDocument();
//   }
// });

test('render one row per user', () => {
  // Render the component
  renderComponent();

  // Find all the rows in the table
  const rows = within(screen.getByTestId('users')).getAllByRole('row');

  // Assertion: correct number of rows in the table
  expect(rows).toHaveLength(2);
});

test('render the email and name of each user', () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole('cell', { name: user.name });
    const email = screen.getByRole('cell', { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});