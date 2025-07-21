// pages/Calendar.tsx
import React, { useState } from 'react';
import Modal from '../components/Modal';
import { FiX, FiMail } from 'react-icons/fi';
import { AiOutlineCloud } from 'react-icons/ai';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ isOpen, onClose }) => {
  
  // Debug: Log when Calendar component renders
  console.log('Calendar component rendered, isOpen:', isOpen);

  /* -----------------------------------------------------------
     Modal body – wrapped in a white card so we can keep using
     the existing dark‑blue Modal container without changing it.
  ----------------------------------------------------------- */
  const content = (
    <div className="relative w-full max-w-md rounded-lg bg-white px-8 py-10 text-black" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      {/* close (×) icon */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 text-2xl hover:text-gray-600"
      >
        <FiX />
      </button>

      {/* heading */}
      <h2 className="mb-6 text-center text-2xl font-semibold">
        Connect your calendar
      </h2>

      {/* bullet list */}
      <ol className="mb-8 list-decimal space-y-1 pl-4 text-center text-sm leading-relaxed">
        <li>Connect your Google or Outlook calendars</li>
        <li>Schedule your personal and workspace tasks</li>
        <li>Easily create, edit and delete events</li>
      </ol>

      {/* action buttons */}
      <div className="space-y-4">
        {/* Google */}
        <GoogleLogin
          onSuccess={credentialResponse => {
            // credentialResponse contains the access token
            // You can now use this token to call Google Calendar API
            console.log(credentialResponse);
            // Save the token in state or localStorage as needed
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
        />

        {/* Outlook */}
        <button className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-300/70 py-2 font-medium text-blue-900 hover:bg-blue-400/90">
          <FiMail className="text-lg" />
          Connect&nbsp;Outlook&nbsp;Calendar
        </button>

        {/* iCloud */}
        <button className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-300/70 py-2 font-medium text-blue-900 hover:bg-blue-400/90">
          <AiOutlineCloud className="text-lg" />
          Connect&nbsp;iCloud&nbsp;Calendar
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'PT Sans', sans-serif", color: 'gray' }} className="mt-15 w-330 ml-30">

    <Modal
      isOpen={isOpen}
      onClose={onClose}
      content={content}
      showFooter={false}
    />
    </div>
  );
};

export default Calendar;
