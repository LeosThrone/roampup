export default function Footer() {
  return (
    <footer className="bg-[#efeeeb] border-t-[3px] border-[#1b1c1a] mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 w-full max-w-7xl mx-auto gap-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center w-full">
          <span className="font-headline text-base font-bold text-[#1b1c1a]">
            RoamPup
          </span>
          <span className="hidden sm:inline text-[#4b4731] font-bold">•</span>
          <span className="font-sans text-sm text-[#4b4731]">
            © 2026 RoamPup. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
