import React from 'react'
import { cache } from 'react';
import { getRequest } from '@/hook/api'
import { Metadata } from 'next';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MONTH } from '@/const/month';


const getrfq = cache(async (id: string) => {
    const rfq: any = await getRequest('/rfq/detail?code=' + id)
    return rfq;
});

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const id = params.id.split("*")[1]
    const rfq: any = await getrfq(id)

    return {
        title: rfq.rfq?.product_name,
        openGraph: {
            images: [],
        }
    }
}


const RfqDetail = async ({ params }: any) => {
    const id = params.id.split("*")[1]
    const { rfq, buyer, submitted_quotes, status }: any = await getrfq(id)
    const [countryData] = await Promise.all([
        getRequest('/config/countries')
    ]);
    const countries: any[] = countryData?.data;
    return (
        <div className='py-11 container flex flex-col gap-4'>
            <p className='text-4xl pb-9 font-bold text-[#081440]'>RFQS</p>
            <p className='text-xl text-[#6473B1]'>{status}</p>
            <div className='flex justify-between items-center'>
                <div className='flex gap-7 items-center'>
                    <Image src={rfq?.avatar} alt={rfq.product_name} width={208} height={208} className='w-52 h-52 object-contain' />
                    <div className='flex flex-col gap-3'>
                        <p className='text-4xl font-bold text-[#081342]'>{rfq.product_name}</p>
                        <div className='grid grid-cols-2'>
                            <p className='text-2xl font-light'>Product Category</p>
                            <p className='text-2xl font-bold'>{rfq.product_category.name}</p>
                            <p className='text-2xl font-light'>Request Duration</p>
                            <p className='text-2xl font-bold'>Mar 20, 2024 ~ Apr 19, 2024 at 15:59 (GMT+07:00)</p>
                        </div>
                    </div>
                </div>
                <Button>Submit Quote</Button>
            </div>
            <div className='grid grid-cols-2 gap-14'>
                <div className='flex flex-col gap-9'>
                    <p className='text-2xl font-bold text-[#081440]'>RFQ Details</p>
                    <div>
                        <p className='text-lg font-bold text-[#081440]'>Product Details</p>
                        <table className='border-separate border-spacing-1 w-full'>
                            <tbody>
                                {
                                    Object.keys(rfq.attribute_detail).map((key: any) => (
                                        <tr key={key} className='grid grid-cols-2'>
                                            <td className='text-[#8C8585] text-xl col-span-1'>{key}</td>
                                            <td className='text-[#404040] text-xl'>{rfq.attribute_detail[key]}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p className='text-lg font-bold text-[#081440]'>Sourcing Countries</p>
                        <table className='border-separate border-spacing-1 w-full'>
                            <tbody>
                                <tr className='grid grid-cols-2'>
                                    <td className='text-[#8C8585] text-xl col-span-1'>Sourcing Countries</td>
                                    <td className='text-[#404040] text-xl'>{rfq.source_country}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p className='text-lg font-bold text-[#081440]'>Expected Order Quantity</p>
                        <table className='border-separate border-spacing-1 w-full'>
                            <tbody>
                                <tr className='grid grid-cols-2'>
                                    <td className='text-[#8C8585] text-xl col-span-1'>Tentative Purchasing Volume</td>
                                    <td className='text-[#404040] text-xl'>{rfq.expected_order_quantity.tentative_purchasing_volume.quantity + " " + rfq.expected_order_quantity.tentative_purchasing_volume.unit}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p className='text-lg font-bold text-[#081440]'>Requirements</p>
                        <table className='border-separate border-spacing-1 w-full'>
                            <tbody>
                                <tr className='grid grid-cols-2'>
                                    <td className='text-[#8C8585] text-xl col-span-1'>Packaging Types</td>
                                    <td className='text-[#404040] text-xl'>{rfq.requirements.package_type.description}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p className='text-lg font-bold text-[#081440]'>Logistic Terms</p>
                        <table className='border-separate border-spacing-1 w-full'>
                            <tbody>
                                <tr className='grid grid-cols-2'>
                                    <td className='text-[#8C8585] text-xl col-span-1'>Delivery Terms</td>
                                    <td className='text-[#404040] text-xl'>{rfq.logistic_terms.delivery_term.map((dt: any) => dt.name).join(', ')}</td>
                                </tr>
                                <tr className='grid grid-cols-2'>
                                    <td className='text-[#8C8585] text-xl col-span-1'>Port of Destination</td>
                                    <td className='text-[#404040] text-xl'>{rfq.logistic_terms.port_of_destination.country.name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p className='text-lg font-bold text-[#081440]'>Payment Terms</p>
                        <table className='border-separate border-spacing-1 w-full'>
                            <tbody>
                                <tr className='grid grid-cols-2'>
                                    <td className='text-[#8C8585] text-xl col-span-1'>Payment Terms</td>
                                    <td className='text-[#404040] text-xl'>{rfq.payment_terms.type.map((dt: any) => dt.name).join(', ')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='flex flex-col gap-9'>
                    <p className='text-2xl font-bold text-[#081440]'>Buyer Information</p>
                    <div>
                        <p className='text-lg font-bold text-[#081440]'>Company Information</p>
                        <table className='border-separate border-spacing-1 w-full'>
                            <tbody>
                                {
                                    Object.keys(buyer.company_detail).map((key: any) => (
                                        <tr key={key} className='grid grid-cols-2'>
                                            <td className='text-[#8C8585] text-xl col-span-1'>{key}</td>
                                            <td className='text-[#404040] text-xl'>{buyer.company_detail[key]}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p className='text-lg font-bold text-[#081440]'>Submitted By</p>
                        <div className='flex flex-col gap-4'>
                            <div className='flex items-center gap-3'>
                                <Image src={buyer.avatar} alt={buyer.name} width={112} height={112} className='w-28 h-28 object-cover' />
                                <p className='text-xl font-bold text-[#4A4A4A]'>{buyer.name} · Supplier</p>
                            </div>
                            <div className='flex gap-4 underline items-center'>
                                <p>0 Followers</p>
                                <p>3 Products</p>
                                <Button>+ Follow</Button>
                            </div>
                            <div>
                                <Button>Send Message</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RfqDetail