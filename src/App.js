import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./pages/Home";
const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

export default App;
