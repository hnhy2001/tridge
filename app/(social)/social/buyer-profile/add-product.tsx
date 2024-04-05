"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DragDropPhoto from "@/components/ui/drag-drop-photo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { getRequest, postRequestWithFormData } from "@/hook/apiClient";
import { Loader2 } from "lucide-react";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const AddProduct = () => {
  const { toast } = useToast();
  const [session, setSession] = useState<any>();
  const [avatar, setAvatar] = useState<any>();
  const [galleries, setGalleries] = useState<any>();
  const [name, setName] = useState("Fresh Carrot 5");
  const [categories, setCategoryies] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<any>();
  const [representative, setRepresentative] = useState([
    {
      code: "EMP-LKD876",
      email: "abch@gmail.com",
      first_name: "TMT",
      last_name: "company",
      avatar:
        "https://images.tridge.com/300x300/booth-supply-main-image/b5/bf/a5/b5bfa547415b494795c73ff9977d64c1871bec22/z4914433809222_0ca58a3f2951d513afacade0bee65ac8_1.jpg",
    },
  ]);
  const [detail, setDetail] = useState<any>([]);
  const [details, setDetails] = useState<any>([]);
  const [originCountry, setOriginCountry] = useState<any>();
  const [countries, setCountries] = useState<any>([]);
  const [productQuantity, setProductQuantity] = useState<any>();
  const [productUnit, setProductUnit] = useState<any>();
  const [productFrequency, setProductFrequency] = useState<any>();
  const [exportQuantity, setExportQuantity] = useState<any>();
  const [exportUnit, setExportUnit] = useState<any>();
  const [exportFrequency, setExportFrequency] = useState<any>();
  const [units, setUnits] = useState<any>([]);
  const [frequency, setFrequency] = useState<any>([
    {
      code: "monthly",
      name: "Monthly",
    },
  ]);

  function convertToSeasonalityStatus(listMonth: any) {
    const seasonalityStatus = listMonth.reduce(
      (acc: any, month: any, index: any) => {
        let monthIndex = index + 1;
        if (monthIndex < 10) {
          monthIndex = "0" + monthIndex;
        }
        acc[monthIndex] = month.isChecked ? 1 : 0;
        return acc;
      },
      {}
    );

    return seasonalityStatus;
  }

  const [description, setDescription] = useState("Something text here");
  function getAllLevelThreeItems(data: any) {
    const levelThreeItems: any = [];

    for (const key in data) {
      const children = data[key].children;
      if (children) {
        children.forEach((child: any) => {
          if (child.children && child.children.length > 0) {
            child.children.forEach((levelThree: any) => {
              levelThreeItems.push(levelThree);
            });
          }
        });
      }
    }

    return levelThreeItems;
  }
  useEffect(() => {
    getRequest("/product/list-category-by-level").then((data: any) =>
      setCategoryies(getAllLevelThreeItems(data.data))
    );
    getRequest("/config/countries").then((data: any) =>
      // setCategoryies(getAllLevelThreeItems(data.data))
      setCountries(data.data)
    );
    getRequest("/config/product_unit").then((data: any) => setUnits(data.data));
  }, []);

  useEffect(() => {
    if (category?.code) {
      getRequest("/product/attribute/" + category?.code).then((data: any) =>
        setDetails(data.data)
      );
    }
  }, [category]);
  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", JSON.stringify(category));
    formData.append(
      "representative",
      JSON.stringify(session?.user?.representative)
    );
    formData.append("detail", JSON.stringify(detail));
    formData.append("origin_country", JSON.stringify(originCountry));
    formData.append("product_quantity", "" + productQuantity);
    formData.append("product_unit", JSON.stringify(productUnit));
    formData.append("product_frequency", JSON.stringify(productFrequency));
    formData.append("export_quantity", "" + exportQuantity);
    formData.append("export_unit", JSON.stringify(exportUnit));
    formData.append("export_frequency", JSON.stringify(exportFrequency));
    formData.append(
      "seasonality_status",
      JSON.stringify(convertToSeasonalityStatus(listMonth))
    );
    formData.append("description", description);
    formData.append("user_role", "SELLER");
    galleries.forEach((image: any, index: any) => {
      formData.append(`galleries[${index}]`, image);
    });
    formData.append(`avatar`, avatar[0]);
    postRequestWithFormData("/product/create", formData)
      .then(() => {
        toast({
          title: "Success",
          description: "Create Product",
        });
      })
      .catch((err) => {
        toast({
          variant:'destructive',
          title: "Fail",
          description: "Create Product",
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      setSession(session);
    };
    fetchData();
  }, []);
  const currentYear = new Date().getFullYear();
  const startYear = 1949;
  const [listYear, setListYear] = useState([] as any[]);
  const [purchasingVolume, setPuchasingVolume] = useState(0);
  const [listMonth, setListMonth] = useState([
    { name: "Jan", isChecked: false },
    { name: "Feb", isChecked: false },
    { name: "Mar", isChecked: false },
    { name: "Apr", isChecked: false },
    { name: "May", isChecked: false },
    { name: "Jun", isChecked: false },
    { name: "Jul", isChecked: false },
    { name: "Aug", isChecked: false },
    { name: "Sep", isChecked: false },
    { name: "Oct", isChecked: false },
    { name: "Nov", isChecked: false },
    { name: "Dec", isChecked: false },
  ]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState([] as any);
  const increasingPurchase = (e: any, field: any) => {
    e.preventDefault();
  };
  const decreasingPurchase = (e: any, field: any) => {
    e.preventDefault();
    let value = Number(field.value);
    if (value <= 0) return;
    const result = value - 1;
  };
  const getListYear = () => {
    let list: any[] = [];
    for (let i = currentYear; i >= startYear; i--) {
      list.push(i);
    }
    setListYear(list);
  };
  const changeSelectedMonth = (event: any, i: any) => {
    const result = listMonth.map((item: any) => item);
    result[i].isChecked = event;
    setListMonth(result);
    const checkAll = listMonth.every((item: any) => item.isChecked);
    if (checkAll) {
      setIsCheckAll(true);
    } else {
      setIsCheckAll(false);
    }
  };
  const checkAll = (event: any) => {
    setIsCheckAll(event);
    if (event) {
      const selected = listMonth.map((item: any) => ({
        ...item,
        isChecked: true,
      }));
      setListMonth(selected);
    } else {
      const selected = listMonth.map((item: any) => ({
        ...item,
        isChecked: false,
      }));
      setListMonth(selected);
    }
  };
  useEffect(() => {
    getListYear();
  }, [selectedMonth, isCheckAll]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Add</Button>
      </DialogTrigger>
      <DialogContent className="!min-w-1/2 !w-1/2 !max-w-[50%] !h-70% !max-h-[80%] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Product</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex flex-col gap-4 flex-1 max-h-full overflow-y-auto px-4">
          {/* <div className="flex flex-col gap-2">
            <Label>Main Image *</Label>
            <DragDropPhoto img={avatar} setImg={setAvatar} multiple={false} />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Other Images</Label>
            <DragDropPhoto
              img={galleries}
              setImg={setGalleries}
              multiple={true}
            />
          </div> */}
          {/* <div className="flex flex-col gap-2">
            <Label>Product Name *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Specify product name"
            />
          </div> */}
          <div className="flex flex-col gap-2 w-full">
            <Label>Product Category *</Label>
            <Select
              onValueChange={(e: any) => {
                setCategory(
                  categories.find((c: any) => c.code == e.split("*")[0])
                );
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {categories.map((category: any, index: any) => (
                  <SelectItem
                    key={category.code + "*" + index}
                    value={category.code + "*" + index}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Country of Origin * </Label>
            <Select
              onValueChange={(e: any) =>
                setOriginCountry(
                  countries.find((i: any) => i.code == e.split("*")[0])
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="-Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countries?.map((country: any, index: any) => (
                  <SelectItem
                    key={country.code + "*" + index}
                    value={country.code + "*" + index}
                  >
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {details &&
              Object.keys(details)?.map((value: any, idx: any) => {
                return (
                  <div key={idx}>
                    <div key={idx} className="font-bold py-2">{details[value][0]?.label}</div>
                    <div className="flex flex-col gap-2">
                      {details[value].map((item: any, index: any) => (
                        <div className="flex items-center gap-2" key={index}>
                          <Checkbox
                            id={item._id}
                            value={item.value}
                            onCheckedChange={(e) => {
                              if (e) {
                                setDetail((prev: any) => [...prev, item]);
                              } else {
                                let detail_ = detail.filter(
                                  (d: any) => d._id !== item?._id
                                );
                                setDetail(detail_);
                              }
                            }}
                          />
                          <label
                            htmlFor={item.value}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {item.value}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
          {/* <div className="flex flex-col gap-2">
            <Label>Representatives *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="-Select Representative-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Representative</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
          {/* <div className="flex flex-col gap-2">
            <Label>Award</Label>
            <div className="flex gap-1 w-full">
              <div className="w-full flex flex-col gap-1">
                <div className="flex gap-1">
                  <div className="w-[80%]">
                    <Input placeholder="Type to search award" />
                  </div>
                  <div className="w-[20%]">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {listYear.map((item: any) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-1">
                  <div className="w-[70%]">
                    <Input placeholder="Enter medal/prize" />
                  </div>
                  <div className="w-[30%]">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Enter score" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Button className="h-full px-8">Add</Button>
            </div>
            <div className="flex gap-4">
              <div>Non Gmo - 2018 - medal/prize - score</div>
              <button>X</button>
            </div>
          </div> */}
          {/* <div className="flex flex-col gap-2">
            <Label>Country of Origin * </Label>
            <Select
              onValueChange={(e: any) =>
                setOriginCountry(
                  countries.find((i: any) => i.code == e.split("*")[0])
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="-Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countries?.map((country: any, index: any) => (
                  <SelectItem
                    key={country.code + "*" + index}
                    value={country.code + "*" + index}
                  >
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
          {/* <div className="flex flex-col gap-2">
            <Label>Production Capacity</Label>
            <div className="flex gap-1">
              <div className="relative w-[60%]">
                <Input
                  type="number"
                  value={productQuantity}
                  onChange={(e) => setProductQuantity(e.target.value)}
                  placeholder="Enter quantity"
                />
               
              </div>
              <div className="grid grid-cols-2 gap-1 w-[40%]">
                <Select
                  key={"unit1"}
                  onValueChange={(e: any) =>
                    setExportUnit({
                      code: e.split("*")[0],
                      name: e.split("*")[1],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="-Select Unit-" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit: any) => (
                      <SelectItem
                        key={unit.code}
                        value={unit.code + "*" + unit.name}
                      >
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  key={"frequency1"}
                  onValueChange={(e) =>
                    setExportFrequency({
                      code: e.split("*")[0],
                      name: e.split("*")[1],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="-Select Unit-" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequency.map((f: any) => (
                      <SelectItem key={f.code} value={f.code + "*" + f.name}>
                        {f.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
           
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 flex-wrap">
              {listMonth.map((item: any, index: any) => (
                <div className="flex items-center gap-2" key={item.name}>
                  <Checkbox
                    id={item.name}
                    value={item}
                    checked={item.isChecked}
                    onCheckedChange={(e) => changeSelectedMonth(e, index)}
                  />
                  <label
                    htmlFor={item}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Checkbox
                id="terms"
                checked={isCheckAll}
                onCheckedChange={(e) => checkAll(e)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                All season
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed specifications of this product as much as possible"
            />
          </div> */}
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="border border-black"
            >
              Cancel
            </Button>
          </DialogClose>
          {loading ? (
            <Button disabled size={"lg"}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button variant="default" onClick={handleSubmit}>
              Confirm
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddProduct;