"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {

  const [search, setSearch] = useState("");

  const router = useRouter();
  const params = useSearchParams();

  const handleSearch = () => {

    const url = new URLSearchParams(params.toString());

    if (search.trim()) {
      url.set("search", search);
    } else {
      url.delete("search");
    }

    router.push(`/appointment?${url.toString()}`);
  };

  return (
    <div className="flex border rounded-xl overflow-hidden bg-white">

      <input
        type="text"
        className="flex-1 p-3 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search doctor..."
      />

      <button
        onClick={handleSearch}
        className="bg-[#132573] text-white px-5 flex items-center justify-center"
      >
        <Search className="w-5 h-5" />
      </button>

    </div>
  );
}