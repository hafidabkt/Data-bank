import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/authen";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Documents from "./scenes/documents"; 
import Users from "./scenes/users";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Login from "./scenes/login/login";
import UserForm from "./scenes/form/user_form";
import DocForm from "./scenes/form/doc_form";
import DocumentDetails from "./scenes/documents/doc_details";
import SearchBar from "./scenes/search/search";
import ManagementScreen from "./scenes/managment";
import UserMetadataManagement from "./scenes/managment/user_metadata";
import DocumentMetadataManagement from "./scenes/managment/doc_metadata";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar] = useState(true);
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <AuthProvider> {/* Wrap the whole app */}
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {!isLoginPage && <Sidebar isSidebar={isSidebar} />}
            <main className="content">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/user_form" element={<UserForm />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} />
                <Route path="/doc_form" element={<DocForm />} />
                <Route path="/document_details/:id" element={<DocumentDetails />} />
                <Route path="/search" element={<SearchBar />} />
                <Route path="/management" element={<ManagementScreen />} />
                <Route path="/user_metadata" element={<UserMetadataManagement />} />
                <Route path="/document_metadata" element={<DocumentMetadataManagement/>} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}

export default App;
