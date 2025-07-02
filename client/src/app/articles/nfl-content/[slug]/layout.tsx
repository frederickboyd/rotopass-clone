"use client";
import { useParams } from "next/navigation";
import BlogLists from "@/components/Blogs";
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const slug = params.slug as string;
  const title = BlogLists.find((blog) => blog.slug === slug)?.title;
  if (!title) {
    return <div className="container mx-auto py-6">Blog not found</div>;
  }
  const publishedDate = new Date(
    BlogLists.find((blog) => blog.slug === slug)?.publishedDate as string
  )
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .replace(/,/g, "");

  return (
    <div className="container mx-auto py-6">
      <div className="pt-4 mb-6 justify-center flex flex-wrap mx-0">
        <div className="w-full md:w-5/6 lg:w-2/3">
          <section className="text-center mb-6">
            <h1 className="mb-4">{title}</h1>
            <div className="mb-4">
              <span className="mx-2">{publishedDate}</span>
              <span className="mx-2 font-bold">NFL Content</span>
            </div>
            <div className="mb-4">Written by RotoPass Staff</div>
          </section>
          {children}
        </div>
      </div>
    </div>
  );
}
