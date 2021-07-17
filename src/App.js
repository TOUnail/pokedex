import { useState } from "react";

import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

import "./App.scss";

const App = () => {
  const [gen, setGen] = useState(0);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route
            path="/pokemon/:id"
            component={(props) => <Pokemon {...props} />}
          />
          <Route
            exact
            path={"/"}
            component={(props) => <Home {...props} gen={gen} setGen={setGen} />}
          />
        </Switch>
      </Router>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
};

export default App;
