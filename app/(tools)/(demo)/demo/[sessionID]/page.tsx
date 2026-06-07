"use client";

import { use } from "react";
import SessionResult from "../../../_components/sessionResult";
import { DEMO_CONFIG } from "../../../_lib/api";

type PageProps = {
  params: Promise<{ sessionID: string }>;
};

export default function Page({ params }: PageProps) {
  const { sessionID } = use(params);
  return <SessionResult sessionID={sessionID} config={DEMO_CONFIG} />;
}
