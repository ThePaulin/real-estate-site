import { type IPropertyFull } from "@ali/src/types";
import { Button, IconCaret, IconCustomCaret, Section, Text } from "../elements";
import Carousel from "nuka-carousel";
import { urlFor } from "@ali/src/client";
import { CountAndSave } from "../search/CountAndSave";
import Link from "next/link";
import { useState } from "react";
import Modal, { useModal } from "../global/Modal";
import ServiceStatement from "../global/ServiceStatement";
import ContentRenderer from "../page/ContentRenderer";
import { Disclosure } from "@headlessui/react";

function PropertyPage({ property }: { property: IPropertyFull }) {
  const address = `${property?.address?.street_number}, ${property?.address?.street}, ${property?.address?.city}, ${property?.address?.zone}, ${property?.address?.country}`;

  return (
    <div className="w-full">
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
          {property?.title}
        </Text>
        <Section
          padding="none"
          display="flex"
          className="w-full flex-col tablet:flex-row mt-8 justify-center gap-8  "
        >
          <div className="w-full hidden lg:grid lg:grid-flow-row lg:grid-cols-2 lg:gap-2  max-w-6xl ">
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
              {property?.images?.images?.map((image) => {
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
            className="flex-col mt-6 tablet:mt-0 w-full tablet:w-1/3 gap-2  max-w-md"
          >
            <div className="w-full flex justify-between items-center">
              {property?.category !== undefined ? (
                <Text size="general">{property?.category}</Text>
              ) : (
                <></>
              )}
              {property?.price !== undefined ? (
                <Text size="lead" fontWeight="bold" className="text-primary">
                  ${property?.price}
                </Text>
              ) : (
                <></>
              )}
            </div>
            {address !== undefined ? (
              <Text size="small" className="text-black/40">
                {address}
              </Text>
            ) : (
              <></>
            )}
            {property !== undefined ? (
              <CountAndSave item={property} />
            ) : (
              "loading"
            )}
            <div className="max-w-md ">
              {/* <Text
            size="small"
            fontWeight="light"
            className=" leading-[24px] mt-4 text-black/80 "
          >
            {property?.description}
          </Text> */}

              <Disclosure defaultOpen>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={"flex justify-center items-center gap-4"}
                    >
                      <Text size="lead">Description</Text>
                      <IconCaret direction={`${open ? "up" : "down"}`} />
                    </Disclosure.Button>
                    <Disclosure.Panel className=" py-8 border-b-[1px]  drop-shadow-md">
                      {property.content !== undefined ? (
                        <ContentRenderer content={property.content} />
                      ) : (
                        <Text
                          size="small"
                          fontWeight="light"
                          className=" leading-[24px] mt-4 text-black/80 "
                        >
                          {property?.description}
                        </Text>
                      )}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              {/* <ContentRenderer content={property.content} /> */}
            </div>
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
      <div className="w-full">
        <ServiceStatement />
      </div>
    </div>
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
          className="rounded-lg w-full"
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
          {property?.images?.images?.map((image) => {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                className="w-full object-cover"
                key={image._key}
                src={urlFor(image.image).url()}
                width={"auto"}
                alt={image.alt_text}
              />
            );
          })}
        </Carousel>
      </Modal>
      {property?.images?.images?.map((image, idx) => {
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
