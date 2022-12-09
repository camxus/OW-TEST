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
import { Provider } from "react-redux";
import { store } from "@src/redux";
import { getTitles } from "@src/redux/Titles/Titles";
import Home from "..";
import { parseURLParameters } from "@src/utility/Utils";

describe("Home page", () => {
  test("sort by tenure and reverse order", async () => {
    const history = createMemoryHistory({
      initialEntries: ["/?sort=tenure&reverse=true"],
    });

    const params = parseURLParameters(history.location.search);
    await store.dispatch(
      await getTitles({ params, dispatch: () => {}, setSearchParams: () => {} })
    );

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Home />
        </Router>
      </Provider>
    );
    expect(history.location.search).toBe("?sort=tenure&reverse=true");
    expect(screen.getAllByTestId("tableTitleNumber")[0]).toHaveTextContent(
      "NGL937491"
    );
    expect(screen.getAllByTestId("tableTenure")[0]).toHaveTextContent(
      "Leasehold"
    );
  });

  test("sort by title and reverse order", async () => {
    const history = createMemoryHistory({
      initialEntries: ["/?sort=title&reverse=true"],
    });

    const params = parseURLParameters(history.location.search);
    await store.dispatch(
      await getTitles({ params, dispatch: () => {}, setSearchParams: () => {} })
    );

    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Home />
        </Router>
      </Provider>
    );
    expect(history.location.search).toBe("?sort=title&reverse=true");
    expect(screen.getAllByTestId("tableTitleNumber")[0]).toHaveTextContent(
      "NGL937491"
    );
    expect(screen.getAllByTestId("tableTenure")[0]).toHaveTextContent(
      "Leasehold"
    );
  });
});
