import { Button } from '@/components/ui/button'
import { Metadata } from 'next';
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Command, CommandInput, CommandList } from '@/components/ui/command';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getRequest } from '@/hook/api';
import { ISupplier } from '@/type/supplier.interface';
import { IProduct } from '@/type/product.interface';
import { getServerSession } from 'next-auth';
import { options } from '../api/auth/[...nextauth]/options';
import { IRFQ } from '@/type/rfq.interface';
import { IUserProfile } from '@/type/user-profile.interface';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const metadata: Metadata = {
  title: "Home",
  description: "Home"
};



const Home = async (props: any) => {
  const session = await getServerSession(options);
  const [supplierData, productData, countryData, rfqData] = await Promise.all([
    getRequest('/supplier/list'),
    getRequest('/product/list'),
    getRequest('/config/countries'),
    getRequest('/rfq/list')
  ]);
  const user: IUserProfile = session?.user

  const supplier: ISupplier = supplierData.basic_supplier[0];
  const products: IProduct[] = productData.data;
  const countries: any[] = countryData.data;
  const rfq: IRFQ[] = rfqData.data;
  const country_supplier = countries.find(country => country.dial_code == supplier.supplier_country.code)
  return (
    <div>
      <div className='w-full relative'>
        <Image src={'/banner.png'} alt='banner' width={1920} height={750} className='h-auto w-full' />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
          <div className='w-full px-56 flex flex-col gap-6'>
            <Carousel>
              <CarouselContent>
                {Array.from({ length: 10 }).map((_, index) => (
                  <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/3 3xl:basis-1/5">
                    <div className="p-1">
                      <div className='bg-white rounded-xl px-6 py-4 w-full'>
                        <p>
                          Soybean in Argentina
                        </p>
                        <div className='font-bold text-[#208C35] flex gap-4 items-center'>
                          <Image src={'/top.png'} alt='top' width={13} height={13} className='h-[13px]' />
                          <p>+58.75%</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious src='/arrowleft.png' />
              <CarouselNext src='/arrowright.png' />
            </Carousel>
            <Command className='bg-transparent'>
              <CommandInput placeholder="Tìm sản phẩm thực phẩm & nông nghiệp" />
              <CommandList></CommandList>
            </Command>

          </div>
        </div>
      </div>
      <div className='container py-6'>
        <div className='grid grid-cols-4 gap-9'>
          {session?.user && (
            <div className='pb-12 col-span-4'>
              <div className='pb-6 flex justify-between'>
                <p className='font-bold text-2xl text-[#081440]'>RFQ</p>
                <p className='text-xl text-[#081440]'>Xem thêm</p>
              </div>
              <div className='grid grid-cols-2 gap-20'>
                {
                  rfq.map((dt) => (
                    <div className='flex flex-col gap-4' key={dt.code}>
                      <div className='flex gap-3'>
                        <Image src={'/rice.png'} alt='rice' width={135} height={128} />
                        <div className='flex flex-col gap-2'>
                          <p className='italic text-[#6473B1]'>{dt.status}</p>
                          <p className='text-xl text-[#081342] font-bold'>{dt.name}</p>
                          <p className='flex gap-2 items-start'>
                            <Image src={'/account.png'} alt='account' width={20} height={20} />
                            <strong> Reqested by:</strong> {dt.buyer.name} </p>
                          <p className='flex gap-2 items-start'>
                            <Image src={'/ana.png'} alt='anlisynt' width={20} height={20} />
                            <strong>Annual Revenue:</strong> USD {dt.revenue}M</p>
                        </div>
                        <div>
                        </div>
                      </div>
                      <Separator className="mb-2 bg-[#081342] w-2/3" />
                      <table className='border-separate border-spacing-1'>
                        <tbody>
                          <tr>
                            <td className='text-[#939AA1]'>Product Category</td>
                            <td className='font-bold'>{dt.product_category_name}</td>
                          </tr>
                          <tr>
                            <td className='text-[#939AA1]'>Port of Destination</td>
                            <td className='font-bold'>{dt.port_destination}</td>
                          </tr>
                          <tr>
                            <td className='text-[#939AA1]'>Sourcing Countries</td>
                            <td className='font-bold'>{dt.source_country}</td>
                          </tr>
                          <tr>
                            <td className='text-[#939AA1]'>Request Duration</td>
                            <td className='font-bold'>{dt.shipment_date}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className='pt-5'>
                        <Button>
                          Submit Quote
                        </Button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
          <div className='col-span-3'>
            <div>
              <div className='pb-6 flex justify-between'>
                <p className='font-bold text-2xl text-[#081440]'>Latest</p>
                <p className='text-xl text-[#081440]'>Xem thêm</p>
              </div>
              <div>
                <Carousel>
                  <CarouselContent>
                    {Array.from({ length: 10 }).map((_, index) => (
                      <CarouselItem key={index} className="basis-1/3">
                        <div className='p-1'>
                          <div className='flex flex-col gap-4'>
                            <div>
                              <Badge>Market & Price Trends</Badge>
                            </div>
                            <p className='font-bold text-xl'>The only Chinese dumpling processing company in Russia received financial support from ...</p>
                            <div className='flex justify-between pt-14'>
                              <p>Nongmin</p>
                              <p>3 ngày trước</p>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious src='/left.png' />
                  <CarouselNext src='/right.png' />
                </Carousel>
              </div>
            </div>
            <div className='py-12'>
              <div className='pb-6 flex justify-between'>
                <p className='font-bold text-2xl text-[#081440]'>Trending</p>
                <p className='text-xl text-[#081440]'>Xem thêm</p>
              </div>
              <div className='grid grid-cols-3 gap-10'>
                {
                  Array.from({ length: 6 }).map((_, index) => (
                    <div className='flex flex-col gap-4 pt-10' key={index}>
                      <div>
                        <Badge>Regulation & Compliances</Badge>
                      </div>
                      <p className='font-bold text-xl'>The EU reserved the right to return customs duties on Ukrainian products</p>
                      <p className='text-xl'>The EU reserves the right to restore duties if imports of Ukrainian produ...</p>
                      <div className='flex justify-between pt-5'>
                        <p>Nongmin</p>
                        <p>3 ngày trước</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          <div>
            <div className='flex flex-col justify-center gap-3 py-10'>
              {
                session?.user ?
                  <div className='flex flex-col justify-center items-center gap-3'>
                    <div className='flex gap-7 w-full'>
                      <Avatar className='w-[114px] h-[114px]'>
                        <AvatarImage src={session.user?.avatar} alt={session.user?.last_name} />
                        <AvatarFallback>{session.user?.last_name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {/* <Image src={'/ava.png'} alt='ava' width={114} height={114} /> */}
                      <div className='flex flex-col gap-2 w-[calc(100%-170px)]'>
                        <div className='flex justify-between items-center'>
                          <p className='text-xl font-bold'>{user.last_name}</p>
                          <Link href={'/my-account'} className='text-sm font-bold text-[#081342] flex gap-1 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#081342]">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                            Setting
                          </Link>
                        </div>
                        <p className='truncate'>{user.email}</p>
                        <div className='flex justify-between items-center'>
                          <Button>Suplier</Button>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[21px] h-[21px] text-[#081342]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                          </svg>
                          <p className='text-sm text-[#081342]'>Switch role</p>
                        </div>
                      </div>

                    </div>
                    <div className='w-3/5'>
                      <Separator className="my-10 bg-[#081342]" />
                    </div>

                  </div>
                  :
                  <div className='flex flex-col justify-center items-center gap-3 px-10'>
                    <Image src={'/lock.png'} alt='lock' width={58} height={58} />
                    <p className='font-medium text-xl text-center'>Sign in to get personalized recommendations</p>
                    <Button><Link href={'/api/auth/signin'}>Sign in</Link></Button>

                    <Separator className="my-10 bg-[#081342]" />
                  </div>
              }
              <div className='flex flex-col gap-3'>
                <div>
                  <Button className='bg-[#2D9541] hover:bg-[#2D9541]'>Premium</Button>
                </div>
                <div>
                  <p className='text-[#081342] font-bold text-[28px]'>Price Data</p>
                  <p className='text-xl'>Millet / Pearl / FAQ / Other Variety: Other .... </p>
                  <p className='text-xl'>India / Jaipur, Rajasthan</p>
                </div>
                <Image src={'/image.png'} alt='image' className='pt-1' width={1000} height={300} />
              </div>
            </div>
          </div>
        </div>
        {!props.searchParams.auth && (
          <div className='grid grid-cols-5 gap-9'>
            <div className='col-span-3 flex flex-col gap-7'>
              <div className='flex justify-between pb-2'>
                <p className='font-bold text-2xl text-[#081440]'>Recommended Supplier</p>
                <p>Xem thêm</p>
              </div>
              <Image src={supplier.avatar} alt={supplier.name} width={1000} height={600} />
              <div className='flex gap-9'>
                <Image src={'/company.png'} alt='company' width={109} height={109} />
                <div className='flex flex-col gap-5'>
                  <p className='text-xl font-bold text-[#081440] flex items-center gap-2'>{supplier.supplier_name}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-600">
                      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                  </p>
                  <div className='flex gap-2 items-center'>
                    <Image src={country_supplier.image} alt={'flag ' + country_supplier.name} width={45} height={30} />
                    <p className='text-xl font-bold text-[#939AA1]'>{supplier.supplier_country.name}</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-7'>
                <div className='flex gap-14'>
                  <p className='text-2xl text-[#081440]'>Number off Employees</p>
                  <p className='text-2xl font-bold text-[#081440]'>1-10 Employees</p>
                </div>
                <div className='flex gap-2'>
                  <Badge>Dried Common Bean</Badge>
                  <Badge>Roasted Coffee Beans</Badge>
                </div>
              </div>
            </div>
            <div className='col-span-2 flex flex-col gap-7'>
              <div className='flex justify-between pb-2'>
                <p className='font-bold text-2xl text-[#081440]'>Recommended Products</p>
                <p>Xem thêm</p>
              </div>
              {
                products.map((product) => {
                  const country = countries.find(country => country.name == product.origin_country.name)
                  return (
                    <div className='flex gap-12' key={product.code}>
                      <Image src={product.avatar} alt='product' width={283} height={271} />
                      <div className='py-1 flex flex-col gap-5'>
                        <p className='text-2xl font-bold text-[#081440] pb-9'>{product.name}</p>
                        <div className='flex gap-2 items-center'>
                          <Image src={country.image} alt={'flag ' + country.name} width={45} height={30} />
                          <p className='text-xl font-bold text-[#939AA1]'>{product.origin_country.name}</p>
                        </div>
                        <p className='text-base font-bold text-[#081440] flex items-center gap-2'>{product.supplier_name}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-600">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                          </svg>
                        </p>
                      </div>
                    </div>
                  )
                })
              }

            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home