import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Movie from "./pages/movie";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Button } from "./components/ui/button";
import SettingsPage from "./pages/settings";

function App() {
  return (
    <div>
      <header className="flex w-full justify-start px-[2rem] max-sm:px-[1rem] pt-[2rem] max-sm:pt-[1rem] pb-[1.5rem] max-sm:pb-[0.5rem] mx-auto">
        <SignedOut>
          <Button>
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "rounded-full h-12 w-12",
              },
            }}
          />
        </SignedIn>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<h1>404</h1>} />
        <Route path="movie/:id" element={<Movie />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
