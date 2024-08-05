import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import router from "./routes";
import Navbar from "./components/modules/Navbar";
import Footer from "./components/modules/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./services/Redux/store";
import Tickets from "./components/modules/tickets";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </QueryClientProvider>
  );
}

function AppContent() {
  return (
    <>
      <Router>
        <Routes>
          {router.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={(() => {
                if (
                  route.path === "/login" ||
                  route.path === "/register" ||
                  route.path === "/my-account/" ||
                  route.path === "/my-account/:value" ||
                  route.path === "/admin" ||
                  route.path === "*"
                ) {
                  return <route.component />;
                } else {
                  return (
                    <>
                      <Navbar />
                      <route.component />
                      <Footer />
                      <Tickets />
                    </>
                  );
                }
              })()}
            />
          ))}
        </Routes>
      </Router>
    </>
  );
}
