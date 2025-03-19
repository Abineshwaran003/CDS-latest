import React from "react";
import "./index.css";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";


const App: React.FC = () => {
  return (
    <FluentProvider
      theme={{
        ...webLightTheme,
        colorCompoundBrandStroke: "#F15D22",
        colorCompoundBrandStrokeHover: "#F15D22",
      }}
    >
      <div></div>
    </FluentProvider>
  );
};

export default App;
