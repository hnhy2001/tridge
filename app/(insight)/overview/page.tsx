import SearchBar from "@/components/Search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { getRequest } from "@/hook/api";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Overview = async () => {
  const [suggestInsightData, trendingData] = await Promise.all([
    getRequest("/insight/suggest?number_posts=10"),
    getRequest("/insight/trading?number_posts=6"),
  ]);
  function convertToISO8601(dateStr: any) {
    const parts = dateStr.split(/[- :]/);
    const isoDateStr = `${parts[2]}-${parts[1]}-${parts[0]}T${parts[3]}:${parts[4]}:${parts[5]}Z`;
    return new Date(isoDateStr);
  }
  const suggest: any[] = suggestInsightData?.data;
  const trending: any[] = trendingData?.data;

  return (
    <div className="container py-16">
      <SearchBar placeholder="Search Insight" category_number="3" />
      <div className="pt-16">
        <div className="pb-6 flex justify-between">
          <p className="font-bold text-2xl text-[#081440]">Latest</p>
          <Button>Manage following</Button>
        </div>
        <div>
          <Carousel>
            <CarouselContent className="p-1">
              {suggest.map((data: any) => (
                <CarouselItem
                  key={data.title_slug}
                  className="md:basis-1/4 cursor-pointer"
                >
                  <Link href={data.title_slug} className="p-4" target="_blank">
                    <div className="flex flex-col gap-4 shadow-lg justify-between h-3/4 rounded-lg p-4">
                      <div>
                        <Badge>{data.category.name}</Badge>
                      </div>
                      <p className="font-bold text-xl line-clamp-2">
                        {data.title}
                      </p>
                      <div className="flex justify-between pt-14">
                        <p>{data.author}</p>
                        <p>
                          {formatDistanceToNow(
                            new Date(convertToISO8601(data.public_date)),
                            { addSuffix: true, locale: vi }
                          )}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious src="/left.png" />
            <CarouselNext src="/right.png" />
          </Carousel>
        </div>
      </div>
      <Separator className="" />
      <div className="grid grid-cols-5 gap-10 py-8">
        <div className="flex flex-col gap-3">
          <p className="font-bold text-2xl text-[#081440]">Featured</p>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 shadow-lg justify-between rounded-lg p-4">
              <Image
                src={
                  "https://bizweb.dktcdn.net/thumb/grande/100/021/974/products/b982d6a970fc8ba2d2ed.jpg?v=1585213758903"
                }
                alt="khai tay"
                width={362}
                height={121}
                className="w-full aspect-video object-cover"
              />
              <div>
                <Badge>News</Badge>
              </div>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <div className="flex justify-between">
                <p>Susantimes</p>
                <p>Mar 18, 2024</p>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 shadow-lg justify-between rounded-lg p-4">
              <Image
                src={
                  "https://bizweb.dktcdn.net/100/021/974/products/bi-quyet-chien-khoai-tay-thom-ngon-gion-rum-an-hoai-khong-chan-6.jpg?v=1585224083547"
                }
                alt="khai tay"
                width={362}
                height={121}
                className="w-full aspect-video object-cover"
              />
              <div>
                <Badge>News</Badge>
              </div>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <div className="flex justify-between">
                <p>Susantimes</p>
                <p>Mar 18, 2024</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-span-3 flex flex-col gap-3 justify-between">
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 shadow-lg justify-between rounded-lg p-4">
              <Image
                src={
                  "https://bizweb.dktcdn.net/thumb/grande/100/021/974/products/785ba328-1dae-4c4c-9694-5bcc16587cc3.jpg?v=1686137364653"
                }
                alt="khai tay"
                width={362}
                height={121}
                className="w-full aspect-[5/2] object-cover"
              />
              <div>
                <Badge>News</Badge>
              </div>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <div className="flex justify-between">
                <p>Susantimes</p>
                <p>Mar 18, 2024</p>
              </div>
            </div>
          </Link>
          <div className="grid grid-cols-2 gap-3">
            <Link href={"#"} target="_blank">
              <div className="flex flex-col gap-4 shadow-lg justify-between rounded-lg p-4">
                <div>
                  <Badge>News</Badge>
                </div>
                <p className="font-bold text-xl line-clamp-2">
                  Chips Key Takeaways from January Retailer Trends
                </p>
                <div className="flex justify-between">
                  <p>Susantimes</p>
                  <p>Mar 18, 2024</p>
                </div>
              </div>
            </Link>
            <Link href={"#"} target="_blank">
              <div className="flex flex-col gap-4 shadow-lg justify-between rounded-lg p-4">
                <div>
                  <Badge>News</Badge>
                </div>
                <p className="font-bold text-xl line-clamp-2">
                  Chips Key Takeaways from January Retailer Trends
                </p>
                <div className="flex justify-between">
                  <p>Susantimes</p>
                  <p>Mar 18, 2024</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 shadow-lg justify-between rounded-lg p-4">
              <div>
                <Badge>News</Badge>
              </div>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <div className="flex justify-between">
                <p>Susantimes</p>
                <p>Mar 18, 2024</p>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 shadow-lg justify-between rounded-lg p-4">
              <div>
                <Badge>News</Badge>
              </div>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <div className="flex justify-between">
                <p>Susantimes</p>
                <p>Mar 18, 2024</p>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 shadow-lg justify-between rounded-lg p-4">
              <div>
                <Badge>News</Badge>
              </div>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <div className="flex justify-between">
                <p>Susantimes</p>
                <p>Mar 18, 2024</p>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 shadow-lg justify-between rounded-lg p-4">
              <div>
                <Badge>News</Badge>
              </div>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <div className="flex justify-between">
                <p>Susantimes</p>
                <p>Mar 18, 2024</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Separator className="" />
      <div className="py-8">
        <div className="flex gap-3 items-center">
          <p className="font-bold text-2xl text-[#081440]">
            {" "}
            Weekly Product Updates
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
        <Carousel>
          <CarouselContent className="p-1">
            {suggest.map((data: any) => (
              <CarouselItem
                key={data.title_slug}
                className="md:basis-1/4 cursor-pointer"
              >
                <Link href={data.title_slug} className="p-4" target="_blank">
                  <div className="flex flex-col gap-4 shadow-lg justify-end aspect-[5/6] rounded-lg relative">
                    <Image
                      src={
                        "https://bizweb.dktcdn.net/thumb/grande/100/021/974/products/1-lat-banh-mi-sandwich-bao-nhieu-calo-4.jpg?v=1585316169803"
                      }
                      alt="banhmi"
                      width={392}
                      height={392}
                      className="w-full h-full absolute top-0 left-0 z-0 object-cover"
                    />
                    <div className="flex flex-col h-1/3 justify-between gap-4 z-10 text-white bg-gradient-to-b p-4 from-transparent to-slate-600">
                      <div>
                        <Badge>{data.category.name}</Badge>
                      </div>
                      <p className="font-bold text-xl line-clamp-2">
                        {data.title}
                      </p>
                      <div className="flex justify-between">
                        <p>{data.author}</p>
                        <p>
                          {formatDistanceToNow(
                            new Date(convertToISO8601(data.public_date)),
                            { addSuffix: true, locale: vi }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious src="/left.png" />
          <CarouselNext src="/right.png" />
        </Carousel>
      </div>
      <Separator className="" />
      <div className="py-8 flex flex-col gap-8">
        <div className="flex gap-3 items-center">
          <p className="font-bold text-2xl text-[#081440]">
            {" "}
            Innovation & Technology
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-10 items-center shadow-lg  rounded-lg p-4">
          <Image
            src={
              "https://bizweb.dktcdn.net/thumb/grande/100/021/974/products/1-lat-banh-mi-sandwich-bao-nhieu-calo-4.jpg?v=1585316169803"
            }
            alt="banhmi"
            width={392}
            height={392}
            className="w-full h-full object-cover aspect-video"
          />
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 p-4">
              <div>
                <Badge>News</Badge>
              </div>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <p>
                The global banana industry, valued at USD 64.06 billion in 2023,
                is anticipated to reach USD 76.76 billion by 2030, with Latin
                America and the Caribbean leading in exports. Ecuador,
                Guatemala, the Philippines, Costa Rica, and Colombia dominate
                the market, leveraging favorable climates and sustainable
                practices. Emerging trends include a shift towards sustainable
                farming, increased demand for organic and specialty bananas, and
                a growing market for value-added products. Leading exporters are
                adapting to these trends by expanding product ranges and
                investing in technology. Despite challenges like climate change
                and disease outbreaks, the industry remains resilient, focusing
                on quality, sustainability, and fair labor practices to meet
                evolving consumer demands.
              </p>
              <div className="flex justify-between">
                <p>Susantimes</p>
                <p>Mar 18, 2024</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex gap-3 justify-between">
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 shadow-lg justify-between rounded-lg p-4">
              <div>
                <Badge>News</Badge>
              </div>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <div className="flex justify-between">
                <p>Susantimes</p>
                <p>Mar 18, 2024</p>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 shadow-lg justify-between rounded-lg p-4">
              <div>
                <Badge>News</Badge>
              </div>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <div className="flex justify-between">
                <p>Susantimes</p>
                <p>Mar 18, 2024</p>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 shadow-lg justify-between rounded-lg p-4">
              <div>
                <Badge>News</Badge>
              </div>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <div className="flex justify-between">
                <p>Susantimes</p>
                <p>Mar 18, 2024</p>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 shadow-lg justify-between rounded-lg p-4">
              <div>
                <Badge>News</Badge>
              </div>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <div className="flex justify-between">
                <p>Susantimes</p>
                <p>Mar 18, 2024</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Separator className="" />
      <div className="py-8 flex flex-col gap-8">
        <div className="flex gap-3 items-center">
          <p className="font-bold text-2xl text-[#081440]">
            {" "}
            Innovation & Technology
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-10 items-center shadow-lg  rounded-lg p-4">
          <Image
            src={
              "https://bizweb.dktcdn.net/thumb/grande/100/021/974/products/1-lat-banh-mi-sandwich-bao-nhieu-calo-4.jpg?v=1585316169803"
            }
            alt="banhmi"
            width={392}
            height={392}
            className="w-full h-full object-cover aspect-video"
          />
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 p-4">
              <div>
                <Badge>News</Badge>
              </div>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <p>
                The global banana industry, valued at USD 64.06 billion in 2023,
                is anticipated to reach USD 76.76 billion by 2030, with Latin
                America and the Caribbean leading in exports. Ecuador,
                Guatemala, the Philippines, Costa Rica, and Colombia dominate
                the market, leveraging favorable climates and sustainable
                practices. Emerging trends include a shift towards sustainable
                farming, increased demand for organic and specialty bananas, and
                a growing market for value-added products. Leading exporters are
                adapting to these trends by expanding product ranges and
                investing in technology. Despite challenges like climate change
                and disease outbreaks, the industry remains resilient, focusing
                on quality, sustainability, and fair labor practices to meet
                evolving consumer demands.
              </p>
              <div className="flex justify-between">
                <p>Susantimes</p>
                <p>Mar 18, 2024</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="flex gap-3 justify-between">
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 shadow-lg justify-between rounded-lg p-4">
              <div>
                <Badge>News</Badge>
              </div>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <div className="flex justify-between">
                <p>Susantimes</p>
                <p>Mar 18, 2024</p>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 shadow-lg justify-between rounded-lg p-4">
              <div>
                <Badge>News</Badge>
              </div>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <div className="flex justify-between">
                <p>Susantimes</p>
                <p>Mar 18, 2024</p>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 shadow-lg justify-between rounded-lg p-4">
              <div>
                <Badge>News</Badge>
              </div>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <div className="flex justify-between">
                <p>Susantimes</p>
                <p>Mar 18, 2024</p>
              </div>
            </div>
          </Link>
          <Link href={"#"} target="_blank">
            <div className="flex flex-col gap-4 shadow-lg justify-between rounded-lg p-4">
              <div>
                <Badge>News</Badge>
              </div>
              <p className="font-bold text-xl line-clamp-2">
                Chips Key Takeaways from January Retailer Trends
              </p>
              <div className="flex justify-between">
                <p>Susantimes</p>
                <p>Mar 18, 2024</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Separator className="" />
      <div className="py-8 flex flex-col gap-5 items-center">
        <p className="font-bold text-4xl text-[#081342]">
          Always stay up-to-date with our daily newsletter
        </p>
        <p className="text-2xl text-[#081342]">
          Our newsletter brings you regular updates on emerging trends and
          developments in agri-foods across the globe.
        </p>
        <Button>Learn more</Button>
      </div>
    </div>
  );
};

export default Overview;