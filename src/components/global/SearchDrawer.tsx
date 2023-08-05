import {
  useState,
  useRef,
  useEffect,
  Fragment,
  type Dispatch,
  type SetStateAction,
  type FormEvent,
} from "react";
import Section from "../elements/Section";
import {
  Button,
  IconCaret,
  IconClose,
  IconCommercial,
  IconResidential,
  IconSearch,
  Text,
} from "../elements/index";
import { Listbox, Transition } from "@headlessui/react";
import { useUrl } from "../../hooks/index";
import { useLockedBody } from "usehooks-ts";

function SearchDrawer({ open, close }: { open: boolean; close: () => void }) {
  const searchBox = useRef<HTMLInputElement>(null);
  const options: string[] = ["For Sale", "For Rent"];
  const [q, setQ] = useState<string>("");
  const [type, setType] = useState<string>("residential");
  const [category, setCategory] = useState<string>(options[1]);
  const { href } = useUrl();

  useEffect(() => {
    if (searchBox.current !== null) {
      searchBox.current.focus();
    }
    const decodedUrl = decodeURIComponent(href);
    const params = new URLSearchParams(decodedUrl);
    const initCat = params.get("category");
    const initType = params.get("type");

    getInitValue(initCat, setCategory);
    getInitValue(initType, setType);
  }, []);

  function getInitValue(
    searchParam: string | null,
    action: Dispatch<SetStateAction<string>>
  ): void {
    if (searchParam !== null) {
      action(searchParam);
    }
  }

  const NAMES = {
    type: {
      residential: "residential",
      commercial: "commercial",
    },
    category: {
      forSale: "For sale",
      forRent: "For rent",
    },
  };

  function handleSubmit(
    e: React.KeyboardEvent<HTMLInputElement> | FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    const urlQ = encodeURIComponent(q);
    const urlType = encodeURIComponent(type);
    const urlCategory = encodeURIComponent(category);
    const searchUrl: string =
      "/search" +
      "?q=" +
      urlQ +
      "&type=" +
      urlType +
      "&category=" +
      urlCategory;
    window.location.href = searchUrl;
  }
  function handleTypeSelect(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const target = e.target as HTMLButtonElement;
    e.preventDefault();
    setType(target.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  }

  useLockedBody(true, "test-id");

  const topButtonStyle =
    "w-full rounded-md  flex flex-row justify-center gap-4 items-center h-12 w-fit p-4 ";
  return (
    <div id="test-id" className="relative w-full ">
      <div
        onClick={close}
        className="w-screen h-screen inset-0 absolute overscroll-none bg-white opacity-20 z-20"
      ></div>

      <Section
        display="flex"
        padding="x"
        className=" fixed z-30  overscroll-contain w-full h-fit bg-white pb-8 flex justify-center items-center border-b-[1px] border-b-black/10 shadow-lg  "
      >
        <div className="w-full flex flex-col justify-center items-center gap-6 bg-white ">
          <div className="w-full flex justify-end">
            <Button
              aria-label="close"
              className="w-fit max-w-3 "
              variant="inline"
              onClick={close}
            >
              <IconClose className="h-3 w-3" />
            </Button>
          </div>
          <form
            className="px-1 w-screen flex flex-col justify-center items-center gap-4"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className=" w-full max-w-sm  flex flex-col md:flex-row  justify-center items-center gap-4  ">
              <label className="w-full">
                <input
                  type="radio"
                  readOnly
                  checked={type === NAMES.type.residential}
                  className="sr-only"
                />
                <button
                  aria-label={NAMES.type.residential}
                  name={NAMES.type.residential}
                  value={NAMES.type.residential}
                  onClick={(e) => {
                    handleTypeSelect(e);
                  }}
                  className={`${topButtonStyle}  ${
                    type === NAMES.type.residential
                      ? "bg-primary "
                      : "bg-accent border-[1px] border-secondary/20 "
                  }`}
                >
                  <Text>Residential</Text>
                  <IconResidential />
                </button>
              </label>

              <label className="w-full">
                <input
                  type="radio"
                  readOnly
                  checked={type === NAMES.type.commercial}
                  className="sr-only"
                />
                <button
                  aria-label={NAMES.type.commercial}
                  name={NAMES.type.commercial}
                  value={NAMES.type.commercial}
                  onClick={(e) => {
                    handleTypeSelect(e);
                  }}
                  className={`${topButtonStyle}  ${
                    type === NAMES.type.commercial
                      ? "bg-primary"
                      : "bg-accent border-[1px] border-secondary/20 "
                  }`}
                >
                  <Text>Commercial</Text>
                  <IconCommercial />
                </button>
              </label>
            </div>

            <input
              ref={searchBox}
              onChange={(e) => {
                setQ(e.target.value);
              }}
              onKeyDown={(e) => {
                handleKeyDown(e);
              }}
              type="search"
              placeholder="Search by city, neighbourhood or province"
              className="hide-clear rounded-sm  h-12 text-black bg-tertiary/20 p-2 w-full max-w-lg"
            />
            <div className="w-full tablet:max-w-lg p-2 flex justify-center tablet:justify-end items-center gap-4">
              <div className="w-full flex justify-start tablet:justify-end relative">
                <CustomListBox
                  options={options}
                  selected={category}
                  setSelected={setCategory}
                />
              </div>
              <button className="bg-secondary rounded-md px-2 h-8 w-20 flex justify-center items-center">
                <IconSearch fill="#FFD600" className="text-accent" />
              </button>
            </div>
          </form>
        </div>
      </Section>
    </div>
  );
}

export default SearchDrawer;

export function CustomListBox({
  options,
  selected,
  setSelected,
}: {
  options: string[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [selected]);

  return (
    <div className=" relative w-1/3 ">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative w-full  ">
          <Listbox.Button
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
            className="relative w-fit flex  items-center tablet:w-full h-8 cursor-default rounded-lg bg-tertiary/20 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            <span className="block whitespace-nowrap">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <IconCaret direction={`${isOpen ? "up" : "down"}`} />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-28 tablet:w-full overflow-auto rounded-md bg-tertiary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative w-full cursor-default select-none py-2 px-4  ${
                      active ? "bg-secondary text-accent" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ active, selected }) => {
                    return (
                      <>
                        <span
                          className={`block whitespace-nowrap   ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {option}
                        </span>
                      </>
                    );
                  }}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
