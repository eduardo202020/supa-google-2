import GlobalNavigation from "./navigation/GlobalNavigation";
import { SupabaseProvider } from "./context/SupabaseProvider";

export default function App() {
  return (
    <SupabaseProvider>
      <GlobalNavigation></GlobalNavigation>
    </SupabaseProvider>
  );
}
