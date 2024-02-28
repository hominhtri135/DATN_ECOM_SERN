import HeaderContent from "../Content/HeaderContent";
import ItemProduct from "../Product/ItemProduct";
import React from "react";

function NewProductFeature(props) {
  return (
    <section className="new_product_area  section_gap_bottom_custom">
      <div className="container">
        <HeaderContent
          mainContent={props.title}
          infoContent={props.description}
        >
          {" "}
        </HeaderContent>
        <div className="row">
          <div className="col-lg-12 mt-5 mt-lg-0">
            <div className="row">
              {props.data &&
                props.data.length > 0 &&
                props.data.map((item, index) => {
                  return (
                    <ItemProduct
                      id={item.id}
                      key={index}
                      type="col-lg-3 col-md-3"
                      name={item.name}
                      img={item.productDetail[0].productImage[0].image}
                      price={item.productDetail[0].originalPrice}
                      discountPrice={item.productDetail[0].discountPrice}
                    ></ItemProduct>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewProductFeature;
