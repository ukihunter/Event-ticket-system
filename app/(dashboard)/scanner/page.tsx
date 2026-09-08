import { ScanLine } from "lucide-react";

export default function ScannerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Scanner</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Scan participant QR codes at the event entrance.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-10 text-center">
        <ScanLine className="mx-auto h-10 w-10 text-red-500" />
        <h2 className="mt-4 font-medium text-white">QR Scanner</h2>
        <p className="mt-1 text-sm text-zinc-500">
          The camera scanner will be implemented next.
        </p>
      </div>
    </div>
  );
}
