'use client';

import { useEffect } from 'react';
import socket from '@/lib/socket';

const ClientSocketWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      socket.on(`user-${userId}`, (data) => {
        alert(data.message); // Customize or replace with toast notification
      });
    }

    return () => {
      if (userId) {
        socket.off(`user-${userId}`);
      }
    };
  }, []);

  return <>{children}</>;
};

export default ClientSocketWrapper;
