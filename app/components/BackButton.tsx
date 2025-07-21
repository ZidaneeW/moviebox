"use client";
import { useRouter } from "next/navigation";

export function BackButton({ label = "Back" }: { label?: string }) {
  const router = useRouter();
  return (
    <button
      className="bg-gray-700 hover:bg-gray-900 text-white px-4 py-2 rounded font-bold mb-6"
      onClick={() => router.back()}
      type="button"
    >
      &larr; {label}
    </button>
  );
}