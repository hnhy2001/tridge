"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { postRequest } from "@/hook/apiClient";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SendMessenger = ({ user, code }: any) => {
  const [mess, setMess] = useState<any>("");
  const route = useRouter();
  const actionComment = () => {
    postRequest("/post/update", {
      code: code,
      comment: mess,
      user_role: user.role,
    })
      .then(() => {
          route.refresh();
          setMess('')
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {user && (
        <div className=" flex gap-4 items-start">
          <Image
            src={user?.avatar}
            unoptimized
            alt={user.name}
            width={45}
            height={45}
            className="h-[45px] w-[45px] rounded-full object-cover"
          />
          <Textarea value={mess} onChange={(e) => setMess(e.target.value)} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
            onClick={() => actionComment()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SendMessenger;