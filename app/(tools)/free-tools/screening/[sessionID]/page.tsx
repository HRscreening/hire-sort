"use client";

import { use } from "react";
import SessionResult from "../../../_components/sessionResult";
import { SCREENING_CONFIG } from "../../../_lib/api";

type PageProps = {
  params: Promise<{ sessionID: string }>;
};

export default function Page({ params }: PageProps) {
  const { sessionID } = use(params);
  return <SessionResult sessionID={sessionID} config={SCREENING_CONFIG} />;
}
