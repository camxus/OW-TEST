import { setSortedTitles, setTitles } from "@src/redux/Titles/Titles";

export const sortArrayAlphabethically = (array, parameter, reverse) => {
  array.sort((a, b) => {
    return a[parameter].localeCompare(b[parameter]);
  });

  if (reverse) {
    array.reverse();
  }
  return array;
};

export const handleSort = (
  option: "title" | "tenure" | "init",
  titles,
  params,
  dispatch,
  setSearchParams
) => {
  const _titles = [...titles];

  const overrideReverse = (init) => {
    return init
      ? // if init read value
        JSON.parse(params.reverse || false)
      : // else init read toggle reverses
        !JSON.parse(params.reverse || false);
  };

  const toggleReverse = () => {
    params.reverse = params.reverse ? !JSON.parse(params.reverse) : true;
  };

  const sortByTitle = ({ init }) => {
    const sorted = sortArrayAlphabethically(
      _titles,
      "Title Number",
      overrideReverse(init)
    );

    params["sort"] = "title";
    return sorted;
  };

  const sortByTenure = ({ init }) => {
    const sorted = sortArrayAlphabethically(
      _titles,
      "Tenure",
      overrideReverse(init)
    );

    params["sort"] = "tenure";
    return sorted;
  };

  let titlesSorted = titles;
  switch (option) {
    case "title":
      titlesSorted = sortByTitle({ init: false });
      toggleReverse();
      break;
    case "tenure":
      titlesSorted = sortByTenure({ init: false });
      toggleReverse();
      break;
    case "init":
      if (params.sort === "title") titlesSorted = sortByTitle({ init: true });
      if (params.sort === "tenure") titlesSorted = sortByTenure({ init: true });
      break;
    default:
      break;
  }

  // update redux state
  dispatch(setSortedTitles(titlesSorted));
  setSearchParams(Object.entries(params));
  return titlesSorted;
};
