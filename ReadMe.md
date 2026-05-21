## Testing with React Testing Library and Jest

## What is React Testing Library?

1. `@testing-library/react` helps test React components the same way users interact with them.
2. `Instead of testing implementation details, you test`:
   1. What is visible on screen
   2. What users can click/type
   3. What changes after interaction

## Main Testing Stack

1. Library
   1. `@testing-library/react`:
      1. Render React components for testing
   2. `@testing-library/user-event`:
      1. Simulate real user interactions
   3. `@testing-library/dom`:
      1. Query/find elements in DOM
   4. `jest`:
      1. Test runner + assertions
   5. `jsdom`:
      1. Fake browser environment in Node.js

## How Jest Finds Test Files

1. `Jest automatically looks for files`:
   1. `*.test.js`
   2. `*.spec.js`
   3. Files inside `__tests__` folder
2. `Example`:
xc vv   3. UserList.test.js

## Basic Test Structure

1. ```js
   test("description of test", () => {
     // Arrange
     // Act
     // Assert
   });
   ```

2. `Example 1 - Check Default Products`:
   1. ```js
      import { render, screen } from "@testing-library/react";
      import App from "./App";

      test("shows 6 products by default", async () => {
        render(<App />);

        const titles = await screen.findAllByRole("heading");

        expect(titles).toHaveLength(6);
      });
      ```

3. `Example 2 - Load More Button`:
   1. ```js
      import { render, screen, waitFor } from "@testing-library/react";
      import user from "@testing-library/user-event";
      import App from "./App";

      test("clicking on button loads 6 more products", async () => {
        render(<App />);

        const button = await screen.findByRole("button", {
          name: /load more/i,
        });

        await user.click(button);

        await waitFor(async () => {
          const titles = await screen.findAllByRole("heading");

          expect(titles).toHaveLength(12);
        });
      });
      ```

## Understanding This Test

1. `render()`:
   1. ```js
      render(<App />);
      ```
   2. Renders component into fake browser (JSDOM).

2. `screen`:
   1. ```js
      screen.findAllByRole();
      ```

      1. Used to search elements from rendered HTML.

3. `findAllByRole()`:
   1. ```js
      screen.findAllByRole("heading");
      ```
   2. `Finds all heading elements`:
      1. h1
      2. h2
      3. h3
      4. h4
      5. h5
      6. h6, etc
   3. Returns array of matching elements.

4. `expect()`:
   1. Assertion function from Jest.
      1. ```js
         expect(titles).toHaveLength(6);
         ```
   2. Checks array length equals 6.
   3. Assertion.

5. `findByRole()`:
   1. Find single element.
      1. ```js
         screen.findByRole("button");
         ```

6. `name Option`:
   1. ```js
      {
        name: /load more/i;
      }
      ```
   2. `Matches button text`:
      1. Load More
      2. load more
      3. LOAD MORE
   3. `i` = case insensitive.

## user-event Library

1. Simulates real user interaction.
   1. `Example`:
      1. ```js
         await user.click(button);
         ```
   2. Simulate click
   3. `Other examples`:
      1. ```js
         await user.keyboard("hello");
         await user.keyboard("{Enter}");
         ```
   4. Simulate typing

2. `waitFor()`:
   1. Used when UI updates asynchronously.
   2. Wait for async updates.
   3. ```js
      await waitFor(()=>{
         expect(...);
      })
      ```
   4. `Useful after`:
      1. API Calls
      2. State updates
      3. Timers
      4. Delayed rendering

## ARIA Roles

1. Testing Library prefers finding elements by accessibility roles.
2. `Common Roles`:
   1. `HTML Element`:
      1. h1-h6
         1. heading
      2. button
         1. button
      3. a
         1. link
      4. input type='text'
         1. textbox
      5. ul
         1. list
      6. li
         1. listitem

## Query Types

1. `getBy..`:
   1. Used when element MUST exist.
      1. ```js
         screen.getByRole("button");
         ```
   2. Throws error if not found.
   3. Find element immediately.

2. `queryBy...`:
   1. Used when element may NOT exist.
   2. ```js
      screen.queryByRole("alert");
      ```
   3. Returns `null` if missing.

3. `findBy...`:
   1. Used for async elements.
   2. ```js
      await screen.findByRole("button");
      ```
   3. Waits until element appears.
   4. Find async element.

## Mock Function

1. Fake function that records:
   1. How many times called
   2. Arguments received
2. `Example`:
   1. ```js
      const callback = jest.fn();
      ```

## Useful Matchers

1. `Jest Matchers`:
   1. ```js
      expect(arr).toHaveLength(2);
      expect(value).toEqual(5);
      expect(arr).toContain("abc");
      expect(fn).toThrow();
      ```
2. `RTL Matchers (jest-dom)`:
   1. ```js
      expect(element).toBeInTheDocument();
      expect(element).toBeEnabled();
      expect(element).toHaveTextContent("hello");
      expect(input).toHaveValue("Jane");
      ```

## Querying By Label

1. Best practice for forms
2. `HTML`:
   1. ```html
      <label htmlFor="email">Enter Email</label> <input id="email" />
      ```
3. `Test`:
   1. ```js
      screen.getByLabelText(/enter email/i);
      ```

## Testing Playground Helper

1. ```js
   screen.logTestingPlaygroundURL();
   ```
2. Generates helper URL for writing queries
   1. `Very useful when`:
      1. Cannot find correct role
      2. Complex HTML structure
      3. Accessibility confusion

## Escape Hatches

1. `When normal queries are difficult`:
   1. `data-testid`:
      1. ```html
         <div data-testid="box"></div>
         ```
   2. ```js
      screen.getByTestId("box");
      ```
   3. `querySelector()`:
      1. ```js
         container.querySelector(".box");
         ```
      2. Use as last resort.

## Test Writing Process

1. `Recommended Flow`:
   1. Pick one component
   2. Create test file
   3. Identify important behavior
   4. Write tests
   5. Run tests

## Project Commands

1. Start App
   1. ```bash
      npm run start
      ```
2. Run Tests
   1. ```bash
      npm run test
      ```

## Important Philosophy

1. `React Testing Library encourages testing`:
   1. User behavior
   2. Visible UI
   3. Accessibility
2. `Avoid testing`:
   1. Internal state
   2. Private methods
   3. Implementation details
