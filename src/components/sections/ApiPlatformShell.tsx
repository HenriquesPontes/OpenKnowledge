"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { ApiDashboard } from "@/components/sections/ApiDashboard";
import { useLocale } from "@/components/locale/LocaleProvider";

export function ApiPlatformShell({
  children,
  marketing,
}: {
  children: ReactNode;
  marketing: ReactNode;
}) {
  const { copy } = useLocale();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/session")
      .then((response) => response.json())
      .then((data: { authenticated?: boolean }) => {
        if (!active) return;
        setAuthenticated(Boolean(data.authenticated));
      })
      .catch(() => {
        if (!active) return;
        setAuthenticated(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      {authenticated ? (
        <>
          <ApiDashboard />
          {children}
        </>
      ) : (
        <>
          {marketing}
          {authenticated === false ? (
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="/api/login" className="w-full sm:w-auto">
                {copy.apiPlatform.logIn}
              </Button>
              <Button href="/api/register" variant="outline" className="w-full sm:w-auto">
                {copy.apiPlatform.createAccount}
              </Button>
            </div>
          ) : (
            <p className="mt-8 text-muted text-sm tracking-[-0.01em]">
              {copy.apiPlatform.checkingSession}
            </p>
          )}
          {children}
        </>
      )}
    </>
  );
}
