"use client";
import { Checkbox } from "@/components/ui/checkbox";
import DragDropFile from "@/components/ui/drag-drop-file";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import * as z from "zod";
const Request = ({
  form,
  country,
  productCategory,
  productUnit,
}: {
  form: z.infer<any>;
  country: any[];
  productCategory: any[];
  productUnit: any[];
}) => {
  const [purchasingVolume, setPuchasingVolume] = useState(0);
  const { toast } = useToast();
  const increasingPurchase = (e: any, field: any) => {
    e.preventDefault();
    let value = Number(field.value);
    const result = value + 1;
    form.setValue(
      "expected_order_quantity.tentative_purchasing_volume.quantity",
      result.toString()
    );
  };
  const decreasingPurchase = (e: any, field: any) => {
    e.preventDefault()
    let value = Number(field.value)
    if (value <= 0) return;
    const result = value - 1
    form.setValue(
      "expected_order_quantity.tentative_purchasing_volume.quantity",
      result.toString()
    );
  };
  useEffect(() => {}, []);
  return (
    <div className="gap-[40px] flex flex-col">
      <div className="font-bold text-3xl">Request Details</div>
      <div className="flex flex-col gap-6">
        <div className="font-[600] text-2xl">Product & Specifications</div>
        <FormField
          control={form.control}
          name="product_name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-base">Product Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter product name"
                    type="text"
                    {...field}
                    className="border-black border"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        ></FormField>
        <FormField
          control={form.control}
          name="product_category"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-base">Product Category *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Search and select product category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {productCategory.map((item: any) => (
                        <SelectItem key={item._id} value={item._id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        ></FormField>
      </div>
      <div className="flex flex-col gap-6">
        <div className="font-[600] text-2xl">Sourcing Countries</div>
        <div>
          <Label className="text-base">Sourcing Countries *</Label>
          <div className="py-[8px]">
            <RadioGroup className="flex space-x-[24px]">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label className="text-base" htmlFor="r1">
                  All
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default1" id="r2" />
                <Label className="text-base" htmlFor="r2">
                  Exclude
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default2" id="r3" />
                <Label className="text-base" htmlFor="r3">
                  Only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Nonnegotiable
                </label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div>
          <FormField
            control={form.control}
            name="source_country"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-base">
                    Preferred Sourcing Countries *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="-Select Countries-" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {country.map((item: any) => (
                          <SelectItem key={item.code} value={item.code}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          ></FormField>
          <Label>
            Choose your preferred countries based on the selection above.
          </Label>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="font-[600] text-2xl">Expected Order Quantity</div>
        <div>
          <Label className="text-base">Tentative Purchasing Volume *</Label>
          <div className="flex gap-1 mb-[4px]">
            <FormField
              control={form.control}
              name="expected_order_quantity.tentative_purchasing_volume.quantity"
              render={({ field }) => {
                return (
                  <FormItem className="w-[70%]">
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="10,000"
                          type="number"
                          {...field}
                          className="border-black border"
                        />
                      </FormControl>
                      <div className="absolute top-1/2 right-0 -translate-x-[12px] -translate-y-1/2">
                        <div className="flex space-x-[3px]">
                          <button
                            key="Tentative Purchasing Volume Decrease1"
                            className="w-[24px] h-[24px] bg-[#C84646] text-white font-[900] rounded-[3px]"
                            onClick={(e) => decreasingPurchase(e,field)}
                          >
                            -
                          </button>
                          <button
                            key="Tentative Purchasing Volume Increase1"
                            className="w-[24px] h-[24px] bg-[#46C851] text-white font-[900] rounded-[3px]"
                            onClick={(e) => increasingPurchase(e, field)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
            <FormField
              control={form.control}
              name="expected_order_quantity.tentative_purchasing_volume.unit"
              render={({ field }) => {
                return (
                  <FormItem className="w-[30%]">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="-Select Unit-" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          productUnit.map((item: any) => (
                            <SelectItem key={item.code} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms1" />
            <label
              htmlFor="terms1"
              className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base"
            >
              Nonnegotiable
            </label>
          </div>
        </div>
        <div>
          <Label className="text-base">Do you plan to have trial orders?</Label>
          <div className="py-[8px]">
            <RadioGroup className="flex space-x-[24px]">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r1" />
                <Label className="text-base" htmlFor="r1">
                  Yes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default1" id="r2" />
                <Label className="text-base" htmlFor="r2">
                  No
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex gap-1 mb-[4px]">
            <div className="w-[70%] relative">
              <Input
                type="number"
                min={0}
                placeholder="10,000"
                value={purchasingVolume}
              />
              <div className="absolute top-1/2 right-0 -translate-x-[12px] -translate-y-1/2">
                <div className="flex space-x-[3px]">
                  <button
                    className="w-[24px] h-[24px] bg-[#C84646] text-white font-[900] rounded-[3px]"
                    onClick={(e) => decreasingPurchase(e,1)}
                  >
                    -
                  </button>
                  <button
                    className="w-[24px] h-[24px] bg-[#46C851] text-white font-[900] rounded-[3px]"
                    onClick={(e) => increasingPurchase(e, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="w-[30%]">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="-Select Unit-" />
                </SelectTrigger>
                <SelectContent></SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms2" />
            <label
              htmlFor="terms2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 tex"
            >
              Nonnegotiable
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="font-[600] text-2xl">Requirements</div>
        <div>
          <Label className="text-base">Packaging Types *</Label>
          <Textarea
            className="border-black border-[1px] mb-[4px]"
            placeholder="Specify preferred packaging types"
          />
          <div className="flex items-center space-x-2">
            <Checkbox id="terms3" />
            <label
              htmlFor="terms3"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 tex"
            >
              Nonnegotiable
            </label>
          </div>
        </div>
        <div>
          <Label className="text-base">Required Certifications *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Search and select ceritication" />
            </SelectTrigger>
            <SelectContent></SelectContent>
          </Select>
          <div className="flex items-center space-x-2 mt-[4px]">
            <Checkbox id="terms4" />
            <label
              htmlFor="terms5"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 tex"
            >
              Nonnegotiable
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="font-[600] text-2xl">Logistic Terms</div>
        <div>
          <Label className="text-base">Delivery Terms *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="-Select Delivery Team-" />
            </SelectTrigger>
            <SelectContent></SelectContent>
          </Select>
          <div className="flex items-center space-x-2 mt-[4px]">
            <Checkbox id="terms6" />
            <label
              htmlFor="terms6"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 tex"
            >
              Nonnegotiable
            </label>
          </div>
        </div>
        <div>
          <Label className="text-base">Port of Destination *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Search and select ceritication" />
            </SelectTrigger>
            <SelectContent></SelectContent>
          </Select>
          <div className="flex items-center space-x-2 mt-[4px]">
            <Checkbox id="terms7" />
            <label
              htmlFor="terms7"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 tex"
            >
              Nonnegotiable
            </label>
          </div>
        </div>
        <div>
          <Label className="text-base">Target Shipment Date</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="-Select Date-" />
            </SelectTrigger>
            <SelectContent></SelectContent>
          </Select>
          <div className="flex items-center space-x-2 mt-[4px]">
            <Checkbox id="terms8" />
            <label
              htmlFor="terms8"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 tex"
            >
              Nonnegotiable
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="font-[600] text-2xl">Payment Terms</div>
        <div>
          <Label className="text-base">Payment Terms *</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="-Select Payment Terms-" />
            </SelectTrigger>
            <SelectContent></SelectContent>
          </Select>
          <div className="flex items-center space-x-2 mt-[4px]">
            <Checkbox id="terms9" />
            <label
              htmlFor="terms9"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 tex"
            >
              Nonnegotiable
            </label>
          </div>
        </div>
        <div>
          <Label className="text-base">Detailed Payment Terms</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Specify detailed payment terms" />
            </SelectTrigger>
            <SelectContent></SelectContent>
          </Select>
          <div className="text-[14px] mb-[4px]">
            <div></div>
            <div>100% irrevocable L/C at sight</div>
            <div>T/T 30% in advance, 70% against copy documents</div>
          </div>
          <div className="flex items-center space-x-2 mt-[4px]">
            <Checkbox id="terms10" />
            <label
              htmlFor="terms10"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 tex"
            >
              Nonnegotiable
            </label>
          </div>
        </div>
        <div>
          <Label className="text-base">Payment To Be Made By</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Specify Whom" />
            </SelectTrigger>
            <SelectContent></SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="font-[600] text-2xl">Additional Information</div>
        <div>
          <Label className="text-base">Reason For This Request</Label>
          <Textarea
            className="border-black border-[1px] mb-[4px]"
            placeholder="Add reason for this request"
          />
        </div>
        <div>
          <Label className="text-base">Intended Usage</Label>
          <Textarea
            className="border-black border-[1px] mb-[4px]"
            placeholder="Specify your intended usage"
          />
        </div>
        <div>
          <Label className="text-base">Intended Usage</Label>
          <Textarea
            className="border-black border-[1px] mb-[4px]"
            placeholder="Add additional details regarding this request"
          />
        </div>
        <div>
          <Label className="text-base">Attachments</Label>
          <DragDropFile />
        </div>
        <div>
          <Checkbox id="terms11" />
          <label
            htmlFor="terms11"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            * I acknowledge that I have read and understood{" "}
            <a href="#" className="text-primary font-bold underline">
              Tridge Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary font-bold underline">
              Privacy Policy
            </a>
            , and I hereby grant my consent to Tridge to share my personal
            information that I voluntarily provide to Tridge with third parties
            for the purpose of providing services such as offering products and
            services; sending information about potential business
            opportunities, products, or services; or disclosing contact
            information for communication with visitors or participants to
            Social Marketplace and Tridge’s partners.
          </label>
        </div>
      </div>
    </div>
  );
};
export default Request;
