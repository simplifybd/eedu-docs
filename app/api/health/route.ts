export function GET() {
  return Response.json(
    { status: 'ok', app: 'eedu-docs', timestamp: new Date().toISOString() },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}