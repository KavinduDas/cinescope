"use client";

import { useDeferredValue, useEffect, useRef, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function MovieSelectors() {
  const searchparams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const searchTerm = searchparams.get("query") || "";
  const [statusFilter, setstatusFilter] = useState("all");
  const [immediateSearchterm, setImmediateSearchterm] = useState(searchTerm);

  const deferredsearchTerm = useDeferredValue(immediateSearchterm);
  const isFirstRender = useRef(true);

  const handleMovieSearch = (term) => setImmediateSearchterm(term);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const params = new URLSearchParams(searchparams);

    deferredsearchTerm
      ? params.set("query", deferredsearchTerm)
      : params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  }, [deferredsearchTerm]);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center w-full space-x-2 md:w-1/2">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search movies.."
          onChange={(e) => handleMovieSearch(e.target.value)}
          className="h-9"
          // defaultValue={searchTerm}
        />
      </div>

      <div className="flex items-center gap-2">
        {/* Controlled Select Input*/}
        <Select value={statusFilter} onValueChange={setstatusFilter}>
          <SelectTrigger className="h-9 w-[180px]">
            <SelectValue placeholder="Filter by status"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">archived</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="h-9">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>
    </div>
  );
}
