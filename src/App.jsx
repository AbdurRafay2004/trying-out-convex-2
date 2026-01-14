import { useConvexAuth } from "convex/react";
import { SignIn } from "./components/SignIn";
import { ClickCounter } from "./components/ClickCounter";
import "./App.css";

function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {isAuthenticated ? <ClickCounter /> : <SignIn />}
    </div>
  );
}

export default App;
