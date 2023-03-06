import Routers from "./routes";
import Global from "./styles/global";

function App() {
  return (
    <>
      <Global />
      <div className="App">
        <Routers />
      </div>
    </>
  );
}

export default App;
