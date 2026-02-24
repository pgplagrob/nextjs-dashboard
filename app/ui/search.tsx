// app/ui/search.tsx
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'; // เดี๋ยวเราจะลงตัวนี้ในขั้นตอนถัดไป

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // ใช้ useDebouncedCallback เพื่อไม่ให้ query รัวเกินไปขณะพิมพ์
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // เมื่อค้นหาใหม่ ให้กลับไปเริ่มหน้า 1 เสมอ
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // อัปเดต URL เช่น /dashboard/invoices?query=lee
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 shrink-0">
      <label htmlFor="search" className="sr-only">Search</label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        // ทำให้ค่าในช่อง Input ตรงกับ URL แม้จะกด Refresh
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}