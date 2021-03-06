import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import PaginationT1 from './components/PaginationT1';
import PaginationT2 from './components/PaginationT2';
import InfiniteScroll from './components/InfiniteScroll';

const App = () => {
  return (
    <div className="Apps">
      <Header />
      <Switch>
        <Route exact path="/" component={PaginationT1} />
        <Route exact path="/pagination2" component={PaginationT2} />
        <Route exact path="/infinitescroll" component={InfiniteScroll} />
        <Route exact path="*">
          404 Page Not Found!
        </Route>
      </Switch>
    </div>
  );
};

export default App;
