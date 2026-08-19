export function BrowserMockup({
  command,
  body,
}: {
  command: string;
  body: string;
}) {
  return (
    <div className="rounded-lg sm:rounded-2xl border border-border bg-[#0f0f0f] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.4)] overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
        <span className="ml-3 text-muted text-sm tracking-[-0.01em] truncate">
          api.forrovivo.com
        </span>
      </div>
      <div className="px-4 py-5 sm:px-6 sm:py-6 overflow-x-auto">
        <p className="text-muted text-sm sm:text-base tracking-[-0.01em] break-all">
          <span className="text-white">$</span> {command}
        </p>
        <pre className="mt-5 text-[13px] sm:text-sm leading-relaxed text-[#cfcfcf] tracking-[-0.01em] whitespace-pre-wrap break-words">
          {body}
        </pre>
      </div>
    </div>
  );
}
