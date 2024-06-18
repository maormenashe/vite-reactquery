import * as React from "react";
import useInfiniteSpeciesQuery from "../../queries/species/useInfiniteSpeciesQuery";
import InfiniteScroll from "react-infinite-scroller";
import SpeciesListItem from "./SpeciesListItem";

interface InfiniteSpeciesProps {}

const InfiniteSpecies: React.FunctionComponent<InfiniteSpeciesProps> = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfiniteSpeciesQuery();

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div>Error! {error.toString()}</div>;

  const handleLoadMore = async (page: number) => {
    if (isFetching) return;
    console.log("Fetching Page number:", page);
    await fetchNextPage();
  };

  return (
    <>
      {isFetching && <div className="loading">Fetching...</div>}
      <InfiniteScroll
        initialLoad={false}
        hasMore={hasNextPage}
        loadMore={handleLoadMore}
      >
        {data?.pages.map((pageData) => {
          console.log(pageData);
          return pageData.results.map((species, index) => (
            <SpeciesListItem key={index} species={species} />
          ));
        })}
      </InfiniteScroll>
    </>
  );
};

export default InfiniteSpecies;
