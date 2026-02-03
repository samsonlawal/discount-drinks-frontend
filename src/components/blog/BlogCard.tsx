import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types";
import { Folder, Clock } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="blog-card">
      <figure className="bg-cultured aspect-[2/1.37] overflow-hidden mb-6 group">
        <Link href={`/blog/${post.slug}`}>
          <Image
            src={post.image}
            alt={post.title}
            width={1020}
            height={700}
            className="h-full w-full object-cover transition-transform duration-750 group-hover:scale-105"
          />
        </Link>
      </figure>

      <div className="px-5">
        <ul className="flex justify-center items-center gap-6 mb-2.5">
          <li className="flex items-center gap-2.5">
            <Folder
              size={12}
              strokeWidth={2}
              className="!w-3 !h-3 text-sonic-silver"
            />
            <Link
              href={`/category/${post.category.toLowerCase()}`}
              className="text-sonic-silver text-fs-9 font-medium uppercase hover:text-eerie-black transition-colors"
            >
              {post.category}
            </Link>
          </li>

          <li className="flex items-center gap-2.5">
            <Clock
              size={10}
              strokeWidth={2}
              className="!w-3 !h-3 text-sonic-silver"
            />
            <Link
              href={`/blog/${post.slug}`}
              className="text-sonic-silver text-fs-9 font-medium uppercase hover:text-eerie-black transition-colors"
            >
              <time dateTime={post.date}>{formattedDate}</time>
            </Link>
          </li>
        </ul>

        <h3 className="text-fs-6 font-semibold text-center leading-snug">
          <Link
            href={`/blog/${post.slug}`}
            className="text-eerie-black hover:text-ocean-green transition-colors"
          >
            {post.title}
          </Link>
        </h3>
      </div>
    </div>
  );
}
