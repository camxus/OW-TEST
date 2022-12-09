import { getTitleData } from "@src/orbitalwitness/api/titles";
import { render, screen, within } from "@testing-library/react";
import DataTable from "../index";

test("datatable component", async () => {
  const { data: titles } = await getTitleData();
  const params = {
    offset: "0",
    sort: "title",
    reverse: "true",
  };

  const pageTitles = () => {
    const offset = params.offset ? +params.offset : 0;
    const _pageTitles = {
      current: titles.slice(offset, offset + 5),
      next: titles.slice(offset + 5, offset + 10),
    };
    return _pageTitles;
  };

  const props = {
    dispatch: undefined,
    navigate: undefined,
    titles,
    params,
    setSearchParams: undefined,
    pageTitles: pageTitles(),
  };

  render(<DataTable {...props} />);
  expect(screen.getAllByTestId("tableTitleNumber")[0]).toHaveTextContent(titles[0]["Title Number"]);

});
