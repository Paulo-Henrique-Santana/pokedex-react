import React from "react";
import Header from "./Header";
import Main from "./Main";

import imgBackground from "./img/background.png";

function App() {
  return (
    <main
      style={{
        backgroundImage: `url(${imgBackground})`,
        backgroundAttachment: "fixed",
      }}
    >
      <Header />
      <Main />
    </main>
  );
}

export default App;
