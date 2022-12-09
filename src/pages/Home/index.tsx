import { getTitleData } from "@src/orbitalwitness/api/titles";
import DataTable from "@src/orbitalwitness/components/DataTable";
import { store } from "@src/redux";
import {
  getTitles,
  setSelectedTitle,
  setTitles,
} from "@src/redux/Titles/Titles";
import { Title } from "@src/utility/types";
import { AxiosResponse } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { handlePaginate } from "./helpers";
import { handleSort } from "../../orbitalwitness/components/DataTable/sort";


function Home() {
  // deps
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof store.dispatch>();

  // search parameters
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(Array.from(searchParams));

  // redux state management
  const { titles, sortedTitles } = useSelector((state: any) => state.Titles);
  
  // titles from API => rendered title items
  const pageTitles = useMemo(() => {
    try {
      const _titles = sortedTitles.length ? sortedTitles : titles
      const offset = params.offset ? +params.offset : 0;
      const _pageTitles = {
        current: _titles.slice(offset, offset + 5),
        next: _titles.slice(offset + 5, offset + 10),
      };
      return _pageTitles;
    } catch (e) {
      console.error(e.message)
      return {
        current: [],
        next: [],
      };
    }
  }, [sortedTitles, titles, params.offset]);


  // on mount fetch data
  useEffect(() => {
    if (titles?.length === 0) dispatch(getTitles({ params, dispatch, setSearchParams }));
  }, []);


  return (
    <div className="container centered column">
      <DataTable {...{dispatch, navigate, titles, params, setSearchParams, pageTitles, sortedTitles}}/>
      <div className="centered">
        <button
          onClick={() => handlePaginate("prev", params, setSearchParams)}
          disabled={!(+params.offset > 0)}
        >
          Prev
        </button>
        <button
          disabled={pageTitles.next.length === 0}
          onClick={() => handlePaginate("next", params, setSearchParams)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
