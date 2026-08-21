"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  ApiDashboard,
  type DashboardDataset,
  type DashboardSession,
} from "@/components/sections/ApiDashboard";
import { ApiExplorer } from "@/components/sections/ApiExplorer";
import { useLocale } from "@/components/locale/LocaleProvider";

export function ApiPlatformShell({
  datasets,
  marketing,
  initialSession,
}: {
  datasets: DashboardDataset[];
  marketing: ReactNode;
  initialSession?: DashboardSession | null;
}) {
  const { copy } = useLocale();
  const [session, setSession] = useState<DashboardSession | null>(
    initialSession ?? null,
  );

  useEffect(() => {
    if (initialSession?.authenticated) return;
    let active = true;
    fetch("/api/auth/session")
      .then((response) => response.json())
      .then((data: DashboardSession) => {
        if (!active || !data.authenticated) return;
        setSession(data);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [initialSession?.authenticated]);

  if (session?.authenticated) {
    return (
      <ApiDashboard
        initialSession={session}
        datasets={datasets}
        playground={<ApiExplorer datasets={datasets} heading={false} />}
      />
    );
  }

  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        {marketing}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/api/login" className="w-full sm:w-auto">
            {copy.apiPlatform.logIn}
          </Button>
          <Button
            href="/api/register"
            variant="outline"
            className="w-full sm:w-auto"
          >
            {copy.apiPlatform.createAccount}
          </Button>
        </div>
        <div className="mt-12">
          <ApiExplorer datasets={datasets} />
        </div>
        <div className="mt-10">
          <Button href="/docs" variant="outline" className="w-full sm:w-auto">
            {copy.apiPage.documentation}
          </Button>
        </div>
      </Container>
    </section>
  );
}
