import { Skeleton } from "@/components/ui/skeleton";

export default function GridSkeletonMovie() {
  return (
    // one card only
    <div>
      {[...Array(1)].map((_, index) => (
        <Skeleton key={index} className="bg-gray-100 rounded-md w-full h-96" />
      ))}
    </div>
  );
}
