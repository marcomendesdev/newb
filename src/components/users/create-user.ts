"use client";

import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

export default function CreateUserOnLogin() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  

  useEffect(() => {
    if (isSignedIn && user) {
      fetch('/api/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error('Error creating user:', data.error);
          } else {
            console.log('User created successfully:', data);
          }
        })
        .catch((error) => {
          console.error('Error creating user:', error);
        });
    }
  }, [isSignedIn, user]);

  return null;
}