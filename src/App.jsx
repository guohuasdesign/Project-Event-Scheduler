import { BrowserRouter, Routes, Route } from "react-router";
import { SignIn, SignUp, Home, EventDetail } from "./pages";
import { MainLayout } from "./layouts";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="eventDetail/:id" element={<EventDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
