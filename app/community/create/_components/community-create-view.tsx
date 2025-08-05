"use client";

import PostEditor from "@/components/custom/PostEditor/post-editor";
import { useState } from "react";

export default function CommunityCreateView() {
  const [content, setContent] = useState("");

  const handleSave = () => {
    console.log("HTML:", content);
  };

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">새 글 작성</h1>
      <PostEditor onChange={setContent} initialContent={content} />
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg"
      >
        저장
      </button>
    </div>
  );
}
