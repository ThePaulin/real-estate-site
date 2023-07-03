import { type IPropertyFull } from "@/types";
import { Button, IconCustomCaret, IconHeart, Section, Text } from "../elements";
import Carousel from "nuka-carousel";
import { urlFor } from "@/client";
import { CountAndSave, CountsDisplay } from "@/pages/search";
import Link from "next/link";
import { useState } from "react";
import Modal, { useModal } from "../global/Modal";

function PropertyPage({ property }: { property: IPropertyFull }) {
  const address = `${property.address.street_number}, ${property.address.street}, ${property.address.city}, ${property.address.zone}, ${property.address.country}`;

  return (
    <Section
      display="flex"
      padding="none"
      className=" px-0 py-4 lg:pl-0 lg:pr-4  flex-col gap-4 justify-center items-center"
    >
      <Text
        as={"h1"}
        size="heading"
        fontWeight="bold"
        className="capitalize text-center"
      >
        {property.title}
      </Text>
      <Section
        padding="none"
        display="flex"
        className="w-full flex-col tablet:flex-row mt-8 "
      >
        <div className="w-full hidden lg:grid lg:grid-flow-row lg:grid-cols-2 lg:gap-2  ">
          <Images property={property} clickable />
        </div>
        <div className="w-full block lg:hidden ">
          <Carousel
            defaultControlsConfig={{
              nextButtonText: (
                <IconCustomCaret className="tablet:w-2" direction="right" />
              ),
              prevButtonText: <IconCustomCaret direction="left" />,
              nextButtonStyle: { backgroundColor: "rgba(0,0,0,0)" },
              prevButtonStyle: { backgroundColor: "rgba(0,0,0,0)" },
              pagingDotsContainerClassName: "flex w-full gap-2 ",
              pagingDotsStyle: { fill: "rgba(255,255,255)" },
              pagingDotsClassName: "tablet:hidden",
            }}
            wrapAround={true}
            cellAlign="center"
          >
            {property.images.images.map((image) => {
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="w-full"
                  key={image._key}
                  src={urlFor(image.image).url()}
                  width={"auto"}
                  alt={image.alt_text}
                />
              );
            })}
          </Carousel>
        </div>

        <Section
          padding="x"
          display="flex"
          className="flex-col mt-6 tablet:mt-0 w-full tablet:w-1/3 gap-2"
        >
          <div className="w-full flex justify-between items-center">
            <Text size="general">{property.category}</Text>
            <Text size="lead" fontWeight="bold" className="text-primary">
              ${property.price}
            </Text>
          </div>
          <Text size="small" className="text-black/40">
            {address}
          </Text>
          <CountAndSave item={property} />
          <Text
            size="small"
            fontWeight="light"
            className=" leading-[24px] mt-4 text-black/80 "
          >
            {property?.description}
          </Text>
          <div className="w-full flex flex-col gap-2 mt-2 pb-8">
            <Text size="lead" fontWeight="semibold">
              Contact {property?.contact?.type}:
            </Text>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex gap-2">
                <Text size="small" fontWeight="semibold">
                  Phone:{" "}
                </Text>
                <Link href={`tel:${property?.contact?.phone}`}>
                  <Text size="small">{property?.contact?.phone}</Text>
                </Link>
              </div>
              <div className="flex gap-2">
                <Text size="small" fontWeight="semibold">
                  Email:{" "}
                </Text>
                <Link href={`mailto: ${property?.contact?.email}`}>
                  <Text size="small">{property?.contact?.email}</Text>
                </Link>
              </div>
            </div>
          </div>
        </Section>
      </Section>
    </Section>
  );
}

export default PropertyPage;

function Images({
  property,
  clickable = false,
}: {
  property: IPropertyFull;
  clickable?: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const { closeModal, openModal } = useModal();

  function handleOpenModal(idx: number): void {
    setImageIndex(idx);
    openModal(setIsOpen);
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={() => {
          closeModal(setIsOpen);
        }}
      >
        <Carousel
          slideIndex={imageIndex}
          className="rounded-lg"
          defaultControlsConfig={{
            nextButtonText: (
              <IconCustomCaret className="tablet:w-2" direction="right" />
            ),
            prevButtonText: (
              <IconCustomCaret className="tablet:w-2" direction="left" />
            ),
            nextButtonStyle: { backgroundColor: "rgba(0,0,0,0)" },
            prevButtonStyle: { backgroundColor: "rgba(0,0,0,0)" },
            pagingDotsContainerClassName: "flex w-full gap-2 ",
            pagingDotsStyle: { fill: "rgba(255,255,255)" },
            pagingDotsClassName: "tablet:hidden",
          }}
          wrapAround={true}
          cellAlign="center"
        >
          {property.images.images.map((image) => {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="w-full"
                key={image._key}
                src={urlFor(image.image).url()}
                width={"auto"}
                alt={image.alt_text}
              />
            );
          })}
        </Carousel>
      </Modal>
      {property.images.images.map((image, idx) => {
        return (
          <Button
            key={image._key}
            variant="blank"
            value={idx}
            onClick={() => {
              handleOpenModal(idx);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full"
              src={urlFor(image.image).url()}
              width={"auto"}
              alt={image.alt_text}
            />
          </Button>
        );
      })}
    </>
  );
}
