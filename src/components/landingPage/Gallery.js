import React, { useState, useEffect } from "react";
import { Card } from "antd";
import "magnific-popup";
import $ from "jquery";

function Gallery() {
  const [images] = useState([
    { src: "https://unsplash.it/974/?random", alt: "9.jpg", title: "9.jpg" },
    { src: "https://unsplash.it/900/?random", alt: "10.jpg", title: "10.jpg" },
    { src: "https://unsplash.it/974/?random", alt: "11.jpg", title: "11.jpg" },
    { src: "https://unsplash.it/900/?random", alt: "12.jpg", title: "12.jpg" },
    { src: "https://unsplash.it/974/?random", alt: "9.jpg", title: "9.jpg" },
    { src: "https://unsplash.it/900/?random", alt: "10.jpg", title: "10.jpg" },
    { src: "https://unsplash.it/974/?random", alt: "11.jpg", title: "11.jpg" },
    { src: "https://unsplash.it/900/?random", alt: "12.jpg", title: "12.jpg" },
    { src: "https://unsplash.it/974/?random", alt: "9.jpg", title: "9.jpg" },
    { src: "https://unsplash.it/900/?random", alt: "10.jpg", title: "10.jpg" },
   
  ]);

  useEffect(() => {
    $(".image-popup-vertical-fit").magnificPopup({
      type: "image",
      mainClass: "mfp-with-zoom",
      gallery: {
        enabled: true,
      },
      zoom: {
        enabled: true,
        duration: 300,
        easing: "ease-in-out",
        opener: function (openerElement) {
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        },
      },
    });
  }, []); // Ensure this useEffect runs only once

  return (
    <div className="mfg-container">
      <h2 className="font-poppins  m-5">Gallery</h2>
      <section className="img-gallery-magnific">
        {images.map((image, index) => (
          <div key={index} className="magnific-img">
            <a
              className="image-popup-vertical-fit"
              href={image.src}
              title={image.title}
            >
              <img src={image.src} alt={image.alt} />
              <i className="fa fa-search-plus" aria-hidden="true"></i>
            </a>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Gallery;
