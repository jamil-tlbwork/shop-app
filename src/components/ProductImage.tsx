import React from "react";

export const ProductImage: React.FC<{ imgUrl: string; [key: string]: any }> = ({
  imgUrl,
  ...props
}) => {
  return <img src={`/images/products/${imgUrl}`} {...props} alt={imgUrl} />;
};
