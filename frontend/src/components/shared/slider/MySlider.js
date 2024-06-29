import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slide from "./Slide";

function MySlider({items}) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 8000
    };
    return (
        <div className={"slider-section"}>
            <div className={"wrapper"}>
                <Slider {...settings}>
                    {items.map((item, index) => (
                        Slide(item, index)
                    ))
                    }
                </Slider>
            </div>
        </div>
    );
}

export default MySlider;