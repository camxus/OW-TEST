export const handlePaginate = (direction: "next" | "prev", params, setSearchParams) => {
    switch (direction) {
      case "next":
        params["offset"] = (
          (params.offset ? +params.offset : 0) + 5
        ).toString();
        setSearchParams(Object.entries(params));
        break;
      case "prev":
        if (+params.offset - 5 < 0) {
          params["offset"] = "0";
          setSearchParams(Object.entries(params));
          break;
        }
        params["offset"] = (+params.offset - 5).toString();
        setSearchParams(Object.entries(params));
        break;
      default:
        return;
    }
  };