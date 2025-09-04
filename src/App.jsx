import { BrowserRouter, Routes, Route } from "react-router";
import { SignIn, SignUp, Home, EventDetail, CreateEvent } from "./pages";
import { MainLayout, AuthLayout } from "./layouts";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="eventDetail/:id" element={<EventDetail />} />
          <Route path="createEvent" element={<CreateEvent />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
