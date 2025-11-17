import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* Redux Wrapper */}
      <Provider store={store}>
        {/* Persist Redux State (cart won't reset on refresh) */}
        <PersistGate loading={null} persistor={persistor}>
          
          {/* Google Auth */}
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>

        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
