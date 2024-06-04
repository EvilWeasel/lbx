"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      },
    );
    router.push(url);
  }, [debouncedValue, currentCategoryId, pathname]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-slate-600" />
      <Input
        className="w-full rounded-full bg-slate-100 pl-9 focus-visible:ring-slate-200 md:w-[300px]"
        placeholder="Search a course"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
