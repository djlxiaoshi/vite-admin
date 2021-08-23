import React, { useState, lazy, Suspense } from "react";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import { NormalLayout, MicroLayout } from "./layouts/BaseLayout";

import styles from "./index.module.scss";

function App() {
  return (
    <Suspense fallback="loading">
      <HashRouter>
        <Route path="/" component={NormalLayout} />
      </HashRouter>
    </Suspense>
  );
}

export default App;
