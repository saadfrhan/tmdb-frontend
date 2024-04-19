import { Skeleton } from "@/components/ui/skeleton";

export default function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {[...Array(20)].map((_, index) => (
        <Skeleton key={index} className="bg-gray-100 rounded-md w-full h-96" />
      ))}
    </div>
  );
}
