import React from "react";
import ProductCard from "./ProductCard";
import dummyData from "./dummyData";

const List = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {dummyData.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image}
          name={product.name}
          description={product.description}
          reviews={product.reviews}
          rating={product.rating}
          offers={product.offers}
          price={product.price}
          freeDelivery={product.freeDelivery}
        />
      ))}
    </div>
  );
};

export default List;
