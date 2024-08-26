import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GlobalStyles } from "./styles/GlobalStyles.js";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout.jsx";
import Home from "./pages/Home.jsx";
import Users from "./pages/Users.jsx";
import Settings from "./pages/settings/Settings.jsx";
import SettingsPermissions from "./pages/settings/SettingsPermissions.jsx";
import SettingsDepartements from "./pages/settings/SettingsDepartements.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="/home" />} />
            <Route path="home" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />}>
              <Route index element={<Navigate replace to="/settings" />} />
              <Route
                path="settings-permissions"
                element={<SettingsPermissions />}
              />
              <Route
                path="settings-departements"
                element={<SettingsDepartements />}
              />
            </Route>
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
