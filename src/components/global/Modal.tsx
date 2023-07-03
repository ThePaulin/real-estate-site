import { Dialog, Transition } from "@headlessui/react";
import { type Dispatch, Fragment, type SetStateAction } from "react";
import { Button, IconClose } from "../elements";

function closeModal(setIsOpen: Dispatch<SetStateAction<boolean>>): void {
  setIsOpen(false);
}

function openModal(setIsOpen: Dispatch<SetStateAction<boolean>>): void {
  setIsOpen(true);
}

export function useModal() {
  return { closeModal, openModal };
}

function Modal({
  children,
  open,
  onClose,
  title,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  title?: string;
}) {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {title !== undefined ? (
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                  ) : null}
                  <div className="w-full flex justify-end">
                    <Button
                      aria-label="close modal"
                      variant="blank"
                      onClick={onClose}
                      className="w-fit"
                    >
                      <IconClose />
                    </Button>
                  </div>
                  <div className="w-full mt-8 ">{children}</div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Modal;
