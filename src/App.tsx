import { useEffect } from "react";
import { globalCss } from "@stitches/react";
import { Container } from "./components/Container/Container";

//Stiches global style
const globalStyles = globalCss({
  "@import": [
    "url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap')",
  ],
  "*": { margin: 0, padding: 0, boxSizing: "border-box", fontFamily: "Inter" },
  "#root": {
    backgroundColor: "#EEE4E1",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

function App() {
  useEffect(() => {
    globalStyles();
  }, []);

  return <Container />;
}

export default App;
