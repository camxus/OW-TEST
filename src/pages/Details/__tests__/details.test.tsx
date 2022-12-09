import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import { createMemoryHistory } from "history";
import Details from "..";
import { Provider } from "react-redux";
import { store } from "@src/redux";
import { getTitles } from "@src/redux/Titles/Titles";

describe("Details page", () => {
  test("should pass", async () => {
    const history = createMemoryHistory({ initialEntries: ["/LN163951"] });
    await store.dispatch(await getTitles({}));

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Routes>
            <Route path="/:title_number" element={<Details />} />
          </Routes>
        </Router>
      </Provider>
    );
    expect(history.location.pathname).toBe("/LN163951");
    expect(
      screen.getByText(
        "the site of 63 to 66 Hatton Garden, 56 to 70 (even) and part of 52 and 54 Leather Lane, London"
      )
    ).toBeVisible();
  });
});
