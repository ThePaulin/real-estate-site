import { Transition, Dialog } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Section from '../elements/Section'
import { IconClose } from '../elements'
import Button from '../elements/Button'

function openDrawer (setIsOpen: Function): void {
  setIsOpen((prev: boolean): boolean => !prev)
}
function closeDrawer (setIsOpen: Function): void {
  setIsOpen(false)
}
export function useDrawer () {
  return { openDrawer, closeDrawer }
}

function Drawer ({
  title,
  open,
  onClose,
  children
}: {
  title: string
  open: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  return (
		<Transition.Root appear show={open} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={onClose}>
				<Transition.Child
					appear
					as={Fragment}
					enter="ease-in-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className=" fixed inset-0 bg-gray-100 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full desktop:pl-10">
							<Transition.Child
								appear
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
									<Transition.Child
										as={Fragment}
										enter="ease-in-out duration-500"
										enterFrom="opacity-0"
										enterTo="opacity-100"
										leave="ease-in-out duration-500"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
									>
										<div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
											<button
												type="button"
												className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-0"
												onClick={onClose}
											>
												<span className="sr-only">Close panel</span>
											</button>
										</div>
									</Transition.Child>
									<div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
										<div className="relative mt-6 flex-1 px-4 sm:px-6 ">
											<div className="flex flex-col justify-center ">
												<div className="flex flex-row justify-end desktop:justify-end w-full ">
													{/* <Dialog.Title className=" hidden  tablet:text-base tablet:font-semibold tablet:leading-6 tablet:text-gray-900 capitalize">
                            {title}
                            </Dialog.Title> */}
													<Button
														variant="inline"
														onClick={onClose}
														aria-label={`close ${title} drawer`}
														className="w-6 focus:outline-none focus:ring-2 focus:ring-primary"
													>
														<IconClose />
													</Button>
												</div>
												{children}
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
  )
}

export default Drawer
