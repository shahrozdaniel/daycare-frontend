import {
  IconBox,
  SliderBox,
  SliderContainer,
} from "@/app/classroomActions/classroomActions.styled";
import Image from "next/image";
import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Icon from "@/public/svgs/icons";

interface sliderSwiperProp {
  handleSliderAction: (value: string) => void;
  slideraction: any;
}
const SliderSwiper: React.FC<sliderSwiperProp> = ({
  handleSliderAction,
  slideraction,
}) => {
  function SampleNextArrow(props: any) {
    const { className, style, onClick, currentSlide } = props;
    return (
      <div onClick={onClick}>
        <div className={className} style={{ ...style, display: "none" }} />
        {!(currentSlide === 7 || currentSlide === 9 || currentSlide === 8) && (
          <Image
            src={"/svgs/right-arrow-slide.svg"}
            className={`${className} mr-3`}
            width={30}
            height={30}
            alt={"name"}
          />
        )}
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick, currentSlide } = props;
    return (
      <div onClick={onClick}>
        <div className={className} style={{ ...style, display: "none" }} />
        {currentSlide !== 0 && (
          <Image
            src={"/svgs/left-arrow-slide.svg"}
            className={`${className}`}
            width={50}
            height={50}
            alt={"name"}
          />
        )}
      </div>
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 906,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="pt-10">
      <SliderContainer>
        <Slider {...settings}>
          <SliderBox
            className={`border-2 ${
              slideraction === "checkIn"
                ? "bg-[#DBF0F1]  border-[#00858E]"
                : "bg-white border-[#E2E2E2]"
            }`}
            onClick={() => handleSliderAction("checkIn")}
          >
            <IconBox>
              <div
                className={` w-[72px] h-[72px] rounded-full   object-fill flex  items-center justify-center bg-white`}
              >
                <Icon type="clock" />

                {/* <Image
                  className="gif-active"
                  src={"/images/checkin2.png"}
                  width={45}
                  height={45}
                  alt="icon"
                /> */}
              </div>
              <div
                className={`py-1  text-center text-[#4B4B4B]  font-['DM Sans'] text-[18px] font-medium leading-7`}
              >
                Check-in
              </div>
            </IconBox>
          </SliderBox>
          <SliderBox
            className={`border-2 ${
              slideraction === "addActivity"
                ? "bg-[#DBF0F1]  border-[#00858E]"
                : "bg-white border-[#E2E2E2]"
            }`}
            onClick={() => handleSliderAction("addActivity")}
          >
            <IconBox>
              <div
                className={` w-[72px] h-[72px] rounded-full   object-fill flex  items-center justify-center bg-white`}
              >
                <Icon type="Activity" />
              </div>
              <div
                className={`py-1  text-center text-[#4B4B4B]  font-['DM Sans'] text-[18px] font-medium leading-7`}
              >
                Activity
              </div>
            </IconBox>
          </SliderBox>
          <SliderBox
            className={`border-2 ${
              slideraction === "addNotes"
                ? "bg-[#DBF0F1]  border-[#00858E]"
                : "bg-white border-[#E2E2E2]"
            }`}
            onClick={() => handleSliderAction("addNotes")}
          >
            <IconBox>
              <div
                className={` w-[72px] h-[72px] rounded-full   object-fill flex  items-center justify-center bg-white`}
              >
                {" "}
                {/* <Image
                  // className="static"
                  src={"/svgs/notes.svg"}
                  width={65}
                  height={65}
                  alt="icon"
                /> */}
                <Icon type="Notes" />
              </div>
              <div
                className={`py-1  text-center text-[#4B4B4B]  font-['DM Sans'] text-[18px] font-medium leading-7`}
              >
                Notes
              </div>
            </IconBox>

            {/* <Image
                className="gif-active"
                src={"/images/notes2.png"}
                width={45}
                height={45}
                alt="icon"
              /> */}
          </SliderBox>
          <SliderBox
            className={`border-2 ${
              slideraction === "addMeals"  ? "bg-[#DBF0F1]  border-[#00858E]"
              : "bg-white border-[#E2E2E2]"
            }`}
            onClick={() => handleSliderAction("addMeals")}
          >
            <IconBox>
              <div
                className={` w-[72px] h-[72px] rounded-full   object-fill flex  items-center justify-center bg-white`}
              >
                {" "}
                {/* <Image
                  // className="static"
                  src={"/svgs/meals.svg"}
                  width={65}
                  height={65}
                  alt="icon"
                /> */}
                <Icon type="Meals" />
              </div>
              {/* <Image
              className="gif-active"
              src={"/images/meal2.png"}
              width={45}
              height={45}
              alt="icon"
            /> */}
              <div
                className={`py-1  text-center text-[#4B4B4B]  font-['DM Sans'] text-[18px] font-medium leading-7`}
              >
                Meals
              </div>
            </IconBox>
          </SliderBox>
          <SliderBox
            className={`border-2 ${
              slideraction === "addSleep"
                ? "bg-[#DBF0F1]  border-[#00858E]"
                : "bg-white border-[#E2E2E2]"
            }`}
            onClick={() => handleSliderAction("addSleep")}
          >
            <IconBox>
              <div
                className={` w-[72px] h-[72px] rounded-full   object-fill flex  ml-3 justify-center bg-white`}
              >
                {" "}
                {/* <Image
                  // className="static"
                  src={"/svgs/sleeptime.svg"}
                  width={65}
                  height={65}
                  alt="icon"
                /> */}
                <Icon type="Sleep" />
              </div>
              {/* <Image
              className="gif-active"
              src={"/images/sleep2.png"}
              width={45}
              height={45}
              alt="icon"
            /> */}
              <div
                className={`py-1  text-center text-[#4B4B4B]  font-['DM Sans'] text-[18px] font-medium leading-7`}
              >
                Sleep Time
              </div>
            </IconBox>
          </SliderBox>
          <SliderBox
            className={`border-2 ${
              slideraction === "addToilet"
                ? "bg-[#DBF0F1]  border-[#00858E]"
                : "bg-white border-[#E2E2E2]"
            }`}
            onClick={() => handleSliderAction("addToilet")}
          >
            <IconBox>
              <div
                className={` w-[72px] h-[72px] rounded-full   object-fill flex  items-center justify-center bg-white`}
              >
                {" "}
                {/* <Image
                  // className="static"
                  src={"/svgs/tissue.svg"}
                  width={65}
                  height={65}
                  alt="icon"
                /> */}
                <Icon type="Break" />
              </div>
              {/* <Image
              className="gif-active"
              src={"/images/loo2.png"}
              width={45}
              height={45}
              alt="icon"
            /> */}
              <div
                className={`py-1  text-center text-[#4B4B4B]  font-['DM Sans'] text-[18px] font-medium leading-7`}
              >
                Loo Break
              </div>
            </IconBox>
          </SliderBox>
          <SliderBox
            className={`border-2 ${
              slideraction === "addMood"
                ? "bg-[#DBF0F1]  border-[#00858E]"
                : "bg-white border-[#E2E2E2]"
            }`}
            onClick={() => handleSliderAction("addMood")}
          >
            <IconBox>
              <div
                className={` w-[72px] h-[72px] rounded-full   object-fill flex  items-center justify-center bg-white`}
              >
                {" "}
                {/* <Image
                  // className="static"
                  src={"/svgs/lotus.svg"}
                  width={65}
                  height={65}
                  alt="icon"
                /> */}
                <Icon type="Mood" />
              </div>
              {/* <Image
              className="gif-active"
              src={"/images/happy.png"}
              width={45}
              height={45}
              alt="icon"
            /> */}
              <div
                className={`py-1  text-center text-[#4B4B4B]  font-['DM Sans'] text-[18px] font-medium leading-7`}
              >
                Mood
              </div>
            </IconBox>
          </SliderBox>
          <SliderBox
            className={`border-2 ${
              slideraction === "addMoveRoom"
                ? "bg-[#DBF0F1]  border-[#00858E]"
                : "bg-white border-[#E2E2E2]"
            }`}
            onClick={() => handleSliderAction("addMoveRoom")}
          >
            <IconBox>
              <div
                className={` w-[72px] h-[72px] rounded-full   object-fill flex  items-center justify-center bg-white`}
              >
                {" "}
                {/* <Image
                  // className="static"
                  src={"/svgs/building.svg"}
                  width={65}
                  height={65}
                  alt="icon"
                /> */}
                <Icon type="Rooms" />
              </div>
              {/* <Image
              className="gif-active"
              src={"/images/move-classroom2.png"}
              width={45}
              height={45}
              alt="icon"
            /> */}
              <div
                className={`py-1  text-center text-[#4B4B4B]  font-['DM Sans'] text-[18px] font-medium leading-7`}
              >
                Rooms
              </div>
            </IconBox>
          </SliderBox>

          <SliderBox
            className={`border-2 ${
              slideraction === "addHealth"
                ? "bg-[#DBF0F1]  border-[#00858E]"
                : "bg-white border-[#E2E2E2]"
            }`}
            onClick={() => handleSliderAction("addHealth")}
          >
            <IconBox>
              <div
                className={` w-[72px] h-[72px] rounded-full   object-fill flex  items-center justify-center bg-white`}
              >
                {" "}
                {/* <Image
                  // className="static"
                  src={"/svgs/health.svg"}
                  width={65}
                  height={65}
                  alt="icon"
                /> */}
                <Icon type="Health" />
              </div>
              {/* <Image
              className="gif-active"
              src={"/images/health2.png"}
              width={45}
              height={45}
              alt="icon"
            /> */}
              <div
                className={`py-1  text-center text-[#4B4B4B]  font-['DM Sans'] text-[18px] font-medium leading-7`}
              >
                Health{" "}
              </div>
            </IconBox>
          </SliderBox>
          <SliderBox
            className={`border-2 ${
              slideraction === "addSupplies"
                ? "bg-[#DBF0F1]  border-[#00858E]"
                : "bg-white border-[#E2E2E2]"
            }`}
            onClick={() => handleSliderAction("addSupplies")}
          >
            <IconBox>
              <div
                className={` w-[72px] h-[72px] rounded-full   object-fill flex  items-center justify-center bg-white`}
              >
                {" "}
                <Icon type="supplies" />
                {/* <Image
                  // className="static"
                  src={"/svgs/diaper.svg"}
                  width={65}
                  height={65}
                  alt="icon"
                /> */}
              </div>
              {/* <Image
              className="gif-active"
              src={"/images/supplies.png"}
              width={45}
              height={45}
              alt="icon"
            /> */}
              <div
                className={`py-1  text-center text-[#4B4B4B]  font-['DM Sans'] text-[18px] font-medium leading-7`}
              >
                Supplies
              </div>
            </IconBox>
          </SliderBox>
          <SliderBox
            className={`border-2 ${
              slideraction === "addFluids"
                ? "bg-[#DBF0F1]  border-[#00858E]"
                : "bg-white border-[#E2E2E2]"
            }`}
            onClick={() => handleSliderAction("addFluids")}
          >
            <IconBox>
              <div
                className={` w-[72px] h-[72px] rounded-full   object-fill flex  items-center justify-center bg-white`}
              >
                {" "}
                {/* <Image
                  // className="static"
                  src={"/svgs/milkbottle.svg"}
                  width={65}
                  height={65}
                  alt="icon"
                /> */}
                <Icon type="fluid" />
              </div>
              <div
                className={`py-1  text-center text-[#4B4B4B]  font-['DM Sans'] text-[18px] font-medium leading-7`}
              >
                Fluids
              </div>
            </IconBox>
          </SliderBox>
          <SliderBox
            className={`border-2 ${
              slideraction === "addCheckOut"
                ? "bg-[#DBF0F1]  border-[#00858E]"
                : "bg-white border-[#E2E2E2]"
            }`}
            onClick={() => handleSliderAction("addCheckOut")}
          >
            <IconBox>
              <div
                className={` w-[72px] h-[72px] rounded-full ml-2  object-fill flex  justify-center bg-white`}
              >
                {" "}
                {/* <Image
                  // className="static"
                  src={"/svgs/door.svg"}
                  width={65}
                  height={65}
                  alt="icon"
                /> */}
                <Icon type="checkout" />
              </div>
              {/* <Image
                className="gif-active"
                src={"/images/checkout2.png"}
                width={45}
                height={45}
                alt="icon"
              /> */}
              <div
                className={`py-1  text-center text-[#4B4B4B]  font-['DM Sans'] text-[18px] font-medium leading-7`}
              >
                Check-out
              </div>
            </IconBox>
          </SliderBox>
        </Slider>
      </SliderContainer>
      <style>{`
      .slick-list{
        margin-left:27px;
      }
      `}</style>
    </div>
  );
};

export default SliderSwiper;
