﻿"use client";
import { Checkbox } from "@/components/ui/checkbox";
import PersonalDetail from "@/components/ui/personal-detail";
import PersonalTab from "@/components/ui/personal-tab";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import React, { use, useState } from "react";
import FormSchema from "./FormSchema";
import Loading from "@/components/Loading";

const Data = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allow, setAllow] = useState(false);
  const [listCheck, setListCheck] = useState([
    {
      title: "Transactional Emails",
      description:
        "Receive transactional emails related to your activities on Tridge.",
      isChecked: false,
    },
    {
      title: "Reminder Emails",
      description:
        "Receive reminder emails related to things that need your attention on Tridge.",
      isChecked: false,
    },
  ]);
  const [listCheckNewsletter, setListCheckNewsletter] = useState([
    {
      title: "Tridge Daily Market Digest",
      description:
        "Receive customized digest emails with media contents curated by your following product preferences.",
      isChecked: false,
    },
    {
      title: "Reminder Emails",
      description:
        "Receive updates based on your activity on our website, and the latest announcements about our products and services.",
      isChecked: false,
    },
  ]);
  const changeAllowEmail = (e: any) => {
    setAllow(e);
    if (!e) {
      const list1 = [...listCheck];
      const list2 = [...listCheckNewsletter];
      const result = list1.map((item: any) => ({
        ...item,
        isChecked: false,
      }));
      const result1 = list2.map((item: any) => ({
        ...item,
        isChecked: false,
      }));
      setListCheck(result);
      setListCheckNewsletter(result1);
    }
  };
  const changeListCheck = (e: any, index: any) => {
    const list = [...listCheck];
    list[index].isChecked = e;
    setListCheck(list);
  };
  const changeListCheckNewsLetter = (e: any, index: any) => {
    const list = [...listCheckNewsletter];
    list[index].isChecked = e;
    setListCheckNewsletter(list);
  };
  console.log(isLoading)
  return (
    <div>
      {isLoading ? <Loading /> : ""}
      <div className={`container ${isLoading ? "hidden" : "block"}`}>
        <PersonalTab key="my-account"></PersonalTab>
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-y-10 xl:gap-10 py-6">
          {/* Personal details */}
          <PersonalDetail />

          {/* Account Information */}
          <div className="flex flex-col gap-8 w-full col-span-2 pl-0 xl:pl-6">
            <FormSchema loading={setIsLoading} />
          </div>

          {/* Notification */}
          <div className="flex flex-col gap-4 w-full col-span-2">
            <span className="text-3xl leading-[48px] font-[900]">
              Notification
            </span>

            <div className="flex justify-between w-full">
              <span className="font-bold text-lg ">
                Allow Email Notification
              </span>
              <Switch
                checked={allow}
                onCheckedChange={(e) => changeAllowEmail(e)}
              />
            </div>

            {listCheck.map((item: any, index: any) => (
              <div key={item.title}>
                <div className="flex justify-between items-center gap-8">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{item.title}</span>
                    <span className="text-sm">{item.description}</span>
                  </div>
                  <Checkbox
                    disabled={!allow}
                    checked={item.isChecked}
                    onCheckedChange={(e) => changeListCheck(e, index)}
                  />
                </div>

                <Separator className="w-3/4 bg-[#081342]" />
              </div>
            ))}

            <div className="flex justify-between w-full">
              <span className="font-bold text-lg ">Newsletter</span>
            </div>

            {listCheckNewsletter.map((item: any, index: any) => (
              <div key={item.title}>
                <div className="flex justify-between items-center gap-8">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">{item.title}</span>
                    <span className="text-sm">{item.description}</span>
                  </div>
                  <Checkbox
                    disabled={!allow}
                    checked={item.isChecked}
                    onCheckedChange={(e) => changeListCheckNewsLetter(e, index)}
                  />
                </div>

                <Separator className="w-3/4 bg-[#081342]" />
              </div>
            ))}

            <div></div>
          </div>
        </div>
        {/* <MyAccountComponent/> */}
      </div>
    </div>
  );
};

export default Data;
