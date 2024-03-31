import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PersonalDetail from "@/components/ui/personal-detail";
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea";
import PersonalTab from "@/components/ui/personal-tab";
import FormSchema from "./FormSchema";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { IUserProfile } from "@/type/user-profile.interface";
import { getRequest } from "@/hook/api";

export const metadata: Metadata = {
  title: "My Account",
  description: "My Account",
};

const CompanyInformation = async () => {
  return (
    <div className="container">
      <PersonalTab key="company-information"></PersonalTab>
      <div className="flex gap-8 py-8">
        {/* Personal Detail */}
        <PersonalDetail />

        {/* Company Logo */}
        <FormSchema />

        {/* Members */}
        <div className="flex flex-col w-full">
          <span className="text-3xl leading-[48px] font-[900]">Members</span>
          <div className="flex flex-col gap-4">
            <span className="text-lg font-bold">Joined (1)</span>

            <div className="flex gap-4 items-center">
              <Image
                src="/avatar.png"
                alt="avatar"
                width={60}
                height={60}
              ></Image>
              <div className="flex flex-col">
                <span className="text-lg font-bold">Tom invi</span>
                <span className="text-lg">tomnguyen3006@gmail.com (You)</span>
              </div>
            </div>

            <span className="text-lg font-bold">Invited (0)</span>
            <div className="flex justify-between gap-8 items-center">
              <span className="text-sm">
                Invite fellow members from your company. Once an invitation has
                been sent out, you cannot cancel it.
              </span>
              <Button className="w-40 h-12 text-lg font-bold">+ Invite</Button>
            </div>

            <div className="flex flex-col px-2 border-l-[1px] border-black">
              <span className="text-sm font-semibold">
                Total available member limit 2
              </span>
              <span className="text-sm italic">
                Upgrade your account to have more members in your workspace.
              </span>
            </div>
            <span className="text-xg underline font-semibold">
              Contact sales
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInformation;
