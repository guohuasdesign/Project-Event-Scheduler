import { BrowserRouter, Routes, Route } from "react-router";
import {
  SignIn,
  SignUp,
  Home,
  EventDetail,
  CreateEvent,
  MyEvents,
  NotFound,
} from "./pages";
import { MainLayout, AuthLayout } from "./layouts";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="eventDetail/:id" element={<EventDetail />} />
          <Route path="events" element={<AuthLayout />}>
            <Route index element={<MyEvents />} />
            <Route path="createEvent" element={<CreateEvent />} />
          </Route>

          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
