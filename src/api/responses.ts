import { NextResponse } from "next/server";

export type ApiMeta = {
  apiVersion: string;
  generatedAt: string;
};

export function okJson<T>(data: T) {
  return NextResponse.json({
    ok: true,
    data,
    meta: {
      apiVersion: "1.0",
      generatedAt: new Date().toISOString(),
    } satisfies ApiMeta,
  });
}

export function errorJson(
  status: number,
  code: string,
  message: string,
  details: Record<string, unknown> = {},
) {
  return NextResponse.json(
    {
      ok: false,
      error: {
        code,
        message,
        details,
      },
      meta: {
        apiVersion: "1.0",
        generatedAt: new Date().toISOString(),
      } satisfies ApiMeta,
    },
    { status },
  );
}

