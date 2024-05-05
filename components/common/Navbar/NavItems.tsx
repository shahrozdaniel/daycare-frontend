import { SheetClose } from "@/components/ui/sheet";
import Icon from "@/public/svgs/icons";
import Link from "next/link";
import React from "react";

type navItems = {
  arr: any;
  // checkPermission: any;
  title: string;
  className: string;
  titleClassName?: string;
};

type arrData = {
  title: string;
  href: string;
  icon: string;
  permission?: any;
};
const NavItems: React.FC<navItems> = ({
  arr,
  // checkPermission,
  title,
  className,
  titleClassName,
}) => {
  return (
    <div className="relative py-1 min-h-[6em]">
      <div
        className={`${
          titleClassName ? titleClassName : "left-[-20px] top-14"
        } -rotate-90   absolute font-medium text-[18px ]text-[#5C5B86]`}
      >
        {title}
      </div>
      <div className="flex flex-row gap-1 flex-wrap ml-10">
        {arr.map((item: arrData, index: number) => {
          return (
            <>
              {/* {checkPermission(item?.permission) && ( */}
                <div key={index} className="NavItem  w-40 h-[140px] md:w-36 md:h-32">
                  <SheetClose asChild>
                    <Link
                      href={`${item.href}`}
                      className={`${className}  flex gap-[8px] flex-col items-center justify-center border border-white p-2.5 rounded-lg h-full`}
                    >
                      <Icon type={item.icon} />

                      <p
                        className={`lg:text-[17px] md:text-[13px] text-center text-black-500 px-5 font-sans 
                          text-[#5C5B86] leading-5 md:leading-4`}
                      >
                        {item.title}
                      </p>
                    </Link>
                  </SheetClose>
                </div>
              {/* )} */}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default NavItems;
