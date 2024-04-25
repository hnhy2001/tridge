﻿"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { getRequest, postRequest } from "@/hook/apiClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const UpdateCompanyContact = () => {
  const [country, setCountry] = useState<any>();
  const [businessType, setBusinessType] = useState<any>();
  const [numberEmployess, setNumberEmployess] = useState<any>();
  const [salesRevenue, setSalesRevenue] = useState<any>();
  const [lSave, setLSave] = useState<any>(false);
  const [currentYear] = useState(moment().year());
  const [yearEstablished, setYearEstablished] = useState<any>([]);
  useEffect(() => {
    (async () => {
      await Promise.all([
        getRequest("/config/countries").then((data) => setCountry(data)),
        getRequest("/config/type_bussines").then((data) =>
          setBusinessType(data)
        ),
        getRequest("/config/number_of_employee").then((data) =>
          setNumberEmployess(data)
        ),
        getRequest("/config/annual_sale_revenue").then((data) =>
          setSalesRevenue(data)
        ),
      ]);
      getYearEstablished();
    })();
  }, []);
  const formSchema = z
    .object({
      contactYourName: z.string(),
      contactEmail: z.string(),
      contactNationCode: z.string(),
      contactPhoneNumber: z.string(),
      contactOtherContact: z.string(),
      companyName: z.string(),
      companyBusinessType: z.string(),
      companyCountry: z.string(),
      companyNumberEmployess: z.string(),
      companySalesRevenue: z.string(),
      companyWebsite: z.string(),
      companyAddress: z.string(),
      companyDescription: z.string(),
      companyYear: z.string(),
    })
    .refine(
      (data: any) => {
        const regex = /^http:\/\/.*\.com$/;
        return regex.test(data.companyWebsite);
      },
      {
        message: "website cần bắt đầu bằng http:// và kết thúc bằng .com",
        path: ["companyWebsite"],
      }
    );

  const getYearEstablished = () => {
    const arr = [];
    for (let i = 0; i <= currentYear - 1945; i++) {
      arr.push((1945 + i).toString());
    }
    setYearEstablished(arr.reverse());
    return arr;
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: () => {
      return getRequest("/auth/user-profile").then((data) => {
        return {
          contactYourName: data?.last_name,
          contactEmail: data?.email,
          contactNationCode: JSON.stringify({
            code: data?.phone?.code,
            name: data?.phone?.name,
          }),
          contactPhoneNumber: data?.phone?.phone,
          contactOtherContact: data?.other_contact_info,
          companyName: data?.company.name,
          companyBusinessType: JSON.stringify(data?.company.type),
          companyCountry: JSON.stringify({
            code: data?.company.location.code,
            name: data?.company.location.name,
          }),
          companyNumberEmployess: JSON.stringify(data?.company.number_members),
          companySalesRevenue: JSON.stringify(data?.company.revenue),
          companyWebsite: data?.company.website,
          companyAddress: data?.company.address,
          companyDescription: data?.company.description,
          companyYear: data?.company.year_established,
        };
      });
    },
  });

  const { toast } = useToast();
  const updateCompanyContact = (values: any) => {
    const userPhone = {
      code: JSON.parse(values.contactNationCode).code,
      name: JSON.parse(values.contactNationCode).name,
      phone: values.contactPhoneNumber,
    };
    const payloadUser = {
      first_name: values.contactYourName,
      other_contact_info: values.contactOtherContact,
      phone: userPhone,
    };

    const payloadCompany = {
      name: values.companyName,
      location: JSON.parse(values.companyCountry),
      type: { code: JSON.parse(values.companyBusinessType).code },
      website: values.companyWebsite,
      revenue: JSON.parse(values.companySalesRevenue),
      number_members: JSON.parse(values.companyNumberEmployess),
      description: values.companyDescription,
      address: values.companyAddress,
      year_established: values.companyYear,
    };
    setLSave(true);
    postRequest("/user/upload", payloadUser).then((data: any) => {
      postRequest("/user/company-update", payloadCompany).then((data: any) => {
        if (data.code == 400) {
          setLSave(false);
          return toast({
            variant: "destructive",
            title: "Fail!",
            description: JSON.stringify(data.data),
            action: <ToastAction altText="Try again">Again</ToastAction>,
          });
        } else {
          setLSave(false);
          return toast({
            variant: "default",
            title: "Success!",
            description: "Change user profile and company profile success",
            action: <ToastAction altText="Try again">Done</ToastAction>,
          });
        }
      });
    });
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    updateCompanyContact(values);
  };
  return (
    <div className="flex justify-center w-full">
      <div className="w-full flex flex-col gap-6">
        <span className="text-lg">
          Your RFQ will be uploaded and visible on Social Marketplace once you
          become a verified buyer. Fill in the fields below and submit to
          proceed.
        </span>
        <span className="text-4xl font-[900] text-[#081342]">
          Create New RFQ
        </span>
        <span className="text-lg">
          Relevant suppliers will be notified through email when your RFQ is
          successfully uploaded. Once uploaded, an RFQ will be valid for 30
          days.
        </span>
        <span className="text-3xl font-[900] text-[#081342]">
          My Information
        </span>
        <span className="text-lg">
          You must fill out this section to insert your request details.
        </span>

        <Accordion type="multiple" className="w-full border-b-0">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-3xl font-bold">
                  Contact Information
                </AccordionTrigger>
                <AccordionContent className="px-1">
                  <div className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name="contactYourName"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel className="text-lg font-semibold">
                              Your name *
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                type="text"
                                {...field}
                                className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel className="text-lg font-semibold">
                              Email *
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Email"
                                type="text"
                                {...field}
                                className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <div className="w-full flex flex-col !gap-2">
                      <span className="text-lg font-semibold">
                        Phone Number
                      </span>
                      <div className="w-full flex gap-2">
                        <FormField
                          control={form.control}
                          name="contactNationCode"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-1/4">
                                <Select
                                  onValueChange={field.onChange}
                                  value={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans">
                                      <SelectValue placeholder="Select an nation code" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="border border-black">
                                    <SelectGroup>
                                      {country?.data.map(
                                        (e: any, index: any) => {
                                          return (
                                            <SelectItem
                                              key={index}
                                              value={JSON.stringify({
                                                code: e.dial_code,
                                                name: e.code,
                                              })}
                                            >
                                              <div className="flex gap-2 w-full items-center text-lg">
                                                <img
                                                  src={e.image}
                                                  alt={e.name}
                                                  className="w-11 h-7"
                                                />
                                                <span>{e.dial_code}</span>
                                              </div>
                                            </SelectItem>
                                          );
                                        }
                                      )}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        ></FormField>

                        <FormField
                          control={form.control}
                          name="contactPhoneNumber"
                          render={({ field }) => {
                            return (
                              <FormItem className="w-3/4">
                                <FormControl>
                                  <Input
                                    placeholder="Enter phone number"
                                    type="text"
                                    {...field}
                                    className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        ></FormField>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="contactOtherContact"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel className="text-lg font-semibold">
                              Other Contact Information
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Example: WhatsApp +1-000-000-0000"
                                type="text"
                                {...field}
                                className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-1">
                <AccordionTrigger className="text-3xl font-bold">
                  Company Information
                </AccordionTrigger>
                <AccordionContent className="px-1 flex flex-col gap-2">
                  <span className="text-lg">
                    Editing these will also update your company information in
                    your settings
                  </span>
                  <div className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel className="text-lg font-semibold">
                              Company name *
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Company name"
                                type="text"
                                {...field}
                                className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="companyBusinessType"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel className="text-lg font-semibold">
                              Business Type
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans">
                                  <SelectValue placeholder="-Select Bussiness Type-" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border border-black">
                                {businessType?.data.map((e: any) => {
                                  return (
                                    <SelectItem
                                      key={JSON.stringify(e)}
                                      value={JSON.stringify(e)}
                                    >
                                      {e.name}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    ></FormField>

                    <FormField
                      control={form.control}
                      name="companyCountry"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel className="text-lg font-semibold">
                              Country
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border border-black">
                                {country?.data.map((e: any) => {
                                  return (
                                    <SelectItem
                                      key={JSON.stringify(e)}
                                      value={JSON.stringify({
                                        code: e.code,
                                        name: e.name,
                                      })}
                                    >
                                      {e.name}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    ></FormField>

                    <FormField
                      control={form.control}
                      name="companyYear"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel className="text-lg font-semibold">
                              Year Established
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans">
                                  <SelectValue placeholder="-Select Year-" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border border-black">
                                {yearEstablished.map((e: any) => (
                                  <SelectItem key={e} value={e}>
                                    {e}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    ></FormField>

                    <FormField
                      control={form.control}
                      name="companyNumberEmployess"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel className="text-lg font-semibold">
                              Number Of Employees
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans">
                                  <SelectValue placeholder="-Select Number of Employees-" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border border-black">
                                {numberEmployess?.data.map((e: any) => {
                                  return (
                                    <SelectItem
                                      key={JSON.stringify(e)}
                                      value={JSON.stringify(e)}
                                    >
                                      {e.name}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    ></FormField>

                    <FormField
                      control={form.control}
                      name="companySalesRevenue"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel className="text-lg font-semibold">
                              Annual Sales Revenue
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans">
                                  <SelectValue placeholder="-Select Annual Sales Revenue-" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="border border-black">
                                {salesRevenue?.data.map((e: any) => {
                                  return (
                                    <SelectItem
                                      key={JSON.stringify(e)}
                                      value={JSON.stringify(e)}
                                    >
                                      {e.name}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    ></FormField>

                    <FormField
                      control={form.control}
                      name="companyWebsite"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel className="text-lg font-semibold">
                              Company website *
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter company website URL"
                                type="text"
                                {...field}
                                className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="companyAddress"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel className="text-lg font-semibold">
                              Company address *
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter company address"
                                type="text"
                                {...field}
                                className="border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="companyDescription"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-full">
                            <FormLabel className="text-lg font-semibold">
                              Company description *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter company description"
                                {...field}
                                className="!border-[#939AA1] border !h-[3.4rem] text-[#000000] !text-xl !font-sans"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  <Button type="submit" className="w-full h-14 text-xl">
                    {lSave ? (
                      <Loader2 className=" w-5 font-bold animate-spin mr-2 h-full" />
                    ) : (
                      <span>Save</span>
                    )}
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </form>
          </Form>
        </Accordion>
      </div>
    </div>
  );
};

export default UpdateCompanyContact;
