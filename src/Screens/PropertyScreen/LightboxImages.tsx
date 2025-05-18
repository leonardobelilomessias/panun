import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

type LightboxProps = {
  children: React.ReactNode;
  images: string[];
  initialIndex?: number;
};

export default function LightboxImages({
  children,
  images,
  initialIndex = 0,
}: LightboxProps) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(initialIndex);

  const slides = images.map((image, i) => ({
    src: image,
    alt: `Imagem ${i + 1}`,
    width: 1200,
    height: 800,
  }));

  const handleOpen = () => {
    setIndex(initialIndex);
    setOpen(true);
  };

  return (
    <>
      <button type="button" onClick={handleOpen}>
        {children}
      </button>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        plugins={[Thumbnails]}
        on={{
          view: ({ index: currentIndex }) => setIndex(currentIndex),
        }}
      />
    </>
  );
}
