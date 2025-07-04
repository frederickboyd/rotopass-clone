"use client";
import api from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [titleSlug, subSlug, ...rest] = slug;
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [slugTitle, setSlugTitle] = useState<string>("");
  const [publishedDate, setPublishedDate] = useState<string>("");
  const [blogContent, setBlogContent] = useState<string>("");

  const getBlogBySlug = (titleSlug: string, subSlug: string) => {
    try {
      api
        .get(`/blogs/${titleSlug}/${subSlug}`)
        .then((response) => {
          setBlogTitle(response.data.blogTitle);
          setSlugTitle(response.data.slugTitle);
          setPublishedDate(response.data.publishedDate);
          setBlogContent(response.data.blogContent);
        })
        .catch((error) => {
          console.error("Error fetching blog by slug:", error);
        });
    } catch (error) {
      console.error("Error in getBlogBySlug:", error);
    }
  };
  
  useEffect(() => {
    if (!titleSlug || !subSlug) {
      console.error("Invalid slug format. Expected format: titleSlug/subSlug");
      return;
    }
    getBlogBySlug(titleSlug, subSlug);
  }, [titleSlug, subSlug]);

  return (
    <div className="rp-container mx-auto py-6">
      <div className="pt-4 mb-6 justify-center flex flex-wrap mx-0">
        <div className="w-full md:w-5/6 lg:w-2/3">
          <section className="text-center mb-6">
            <h1 className="!mb-4">{blogTitle}</h1>
            <div className="mb-4">
              <span className="mx-2">{publishedDate}</span>
              <span className="mx-2 font-bold">{slugTitle}</span>
            </div>
            <div className="mb-4">Written by RotoPass Staff</div>
          </section>
          <section dangerouslySetInnerHTML={{ __html: blogContent }}></section>
        </div>
      </div>
    </div>
  );
}
