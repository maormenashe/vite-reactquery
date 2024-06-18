import * as React from "react";
import InfiniteScroll from "react-infinite-scroller";
import PersonListItem from "./PersonListItem";
import useInfinitePeopleQuery from "../../queries/people/useInfinitePeopleQuery";

interface InfinitePeopleProps {}

const InfinitePeople: React.FunctionComponent<InfinitePeopleProps> = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    error,
  } = useInfinitePeopleQuery();

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
          return pageData.results.map((person, index) => (
            <PersonListItem key={index} person={person} />
          ));
        })}
      </InfiniteScroll>
    </>
  );
};

export default InfinitePeople;
