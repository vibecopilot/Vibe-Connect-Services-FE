import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';
import CategoryTab from './tabs/calendarpage';
import PlanMyCalendar from './tabs/planmycalendar';
// import { handleGoogleAuthCallback } from './utils/googleAuth';
// import { GoogleOAuthProvider } from '@react-oauth/google';

// const clientId = "651583943828-23m6g7cg8ld2a0nbn4i3npm1uv78b09f.apps.googleusercontent.com";

function App() {
  // useEffect(() => {
    // Handle Google OAuth callback on app load
    // const authResult = handleGoogleAuthCallback();
    
  //   if (authResult.success) {
  //     console.log('Google Calendar connected successfully!');
  //     // You can show a success notification here
  //   } else if (authResult.error) {
  //     console.error('Google OAuth error:', authResult.error);
  //     // You can show an error notification here
  //   }
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/calendar" element={<CategoryTab />} />
        <Route path="/plan-my-calendar" element={<PlanMyCalendar />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
