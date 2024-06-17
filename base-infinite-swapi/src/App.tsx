import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import InfinitePeople from "./components/people/InfinitePeople";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Infinite SWAPI</h1>
        <InfinitePeople />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
