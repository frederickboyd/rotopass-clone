"use client";
import BlogLists from "@/components/Blogs";
import { useParams } from "next/navigation";

export default function BlogPage() {
  const params = useParams();
  const slug = params.slug as string;
  const BlogCompenentBySlug = BlogLists.find(
    (blog) => blog.slug === slug
  )?.RenderBody;

  if (!BlogCompenentBySlug) {
    return <div>Blog not found.</div>;
  }
  return <BlogCompenentBySlug />;
}
