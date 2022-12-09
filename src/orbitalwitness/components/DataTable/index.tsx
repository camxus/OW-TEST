import { handleSort } from "@src/orbitalwitness/components/DataTable/sort";
import { setSelectedTitle } from "@src/redux/Titles/Titles";
import { Title } from "@src/utility/types";
import React, { useMemo } from "react";

function DataTable({ dispatch, navigate, titles, params, setSearchParams, pageTitles }) {
  const handleClickTitle = (title: Title) => {
    dispatch(setSelectedTitle(title));
    navigate(`/${title["Title Number"]}`);
  };

  return (
    <>
      {titles?.length > 0 && (
        <table data-testid="datatable">
          <thead>
            <tr>
              <th
                onClick={() =>
                  handleSort("title", titles, params, dispatch, setSearchParams)
                }
              >
                Title Number
              </th>
              <th
                onClick={() =>
                  handleSort(
                    "tenure",
                    titles,
                    params,
                    dispatch,
                    setSearchParams
                  )
                }
              >
                Tenure
              </th>
            </tr>
          </thead>
          <tbody>
            {pageTitles?.current?.map((title, index) => (
              <tr key={index} onClick={() => handleClickTitle(title)}>
                <td data-testid="tableTitleNumber">{title["Title Number"]}</td>
                <td data-testid="tableTenure">{title["Tenure"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default DataTable;
