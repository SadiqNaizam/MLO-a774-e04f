import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import DashboardPage from "./pages/DashboardPage";
import EditorPage from "./pages/EditorPage";
import LoginPage from "./pages/LoginPage";
import PrototypeViewPage from "./pages/PrototypeViewPage";
import RegistrationPage from "./pages/RegistrationPage";
import ShareModalPage from "./pages/ShareModalPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<DashboardPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/prototype-view" element={<PrototypeViewPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/share-modal" element={<ShareModalPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
