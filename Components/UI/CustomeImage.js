import Image from "next/image";
import React from "react";

const CustomeImage = ({
  src,
  alt,
  width = 500,
  height = 500,
  className,
  layout,
  objectFit,
  objectPosition,
  loading,
  quality,
  priority,
  sizes,
  srcSet,
  placeholder,
  blurDataURL,
  unoptimized,
  draggable,
  onDragStart,
  onLoadingComplete,
  onError,
  ...rest
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      layout={layout}
      objectFit={objectFit}
      objectPosition={objectPosition}
      loading={loading}
      quality={quality}
      priority={priority}
      sizes={sizes}
      srcSet={srcSet}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      unoptimized={unoptimized}
      draggable={draggable}
      onDragStart={onDragStart}
      onLoadingComplete={onLoadingComplete}
      onError={onError}
      {...rest}
    />
  );
};

export default CustomeImage;
