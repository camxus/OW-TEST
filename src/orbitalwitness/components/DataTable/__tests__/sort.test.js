import { getTitleData } from "@src/orbitalwitness/api/titles";
import { render, screen, within } from "@testing-library/react";
import Home from "../../../../pages/Home/index";
import { handleSort } from "../sort";

test("init sort", async () => {
  const { data: titles } = await getTitleData();
  const params = {
    offset: "0",
    sort: "tenure",
    reverse: "true",
  };

  const result = handleSort("init", titles, params, () => {}, () => {})

  expect(result[0]["Title Number"]).toEqual("NGL937491")
  expect(result[0]["Tenure"]).toEqual("Leasehold")
});

