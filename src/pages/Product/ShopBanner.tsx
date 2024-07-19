import React from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import { Avatar } from "@mui/material";
interface imageSlider {
  listshopBanner: Ibanner.IshopBanner | undefined;
}
export default function ShopSlider(props: imageSlider) {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1200,
    autoplaySpeed: 800,
    arrows: false,
  };
  return (
    <Slider {...settings} className="">
      {props.listshopBanner?.banners.map((i) => {
        return (
          <div key={i._id}>
            <Avatar
              src={i.image}
              alt="r"
              sx={{ width: "100%", height: "20%" }}
              variant="square"
            />
          </div>
        );
      })}
    </Slider>
  );
}
