import Dashboard from "./app/dashboard";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="application-theme">
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
