'use client';
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useModalStore } from '@/store/modalStore';
import { useBoardStore } from '@/store/boardStore';
import TaskTypeRadioGroup from './TaskTypeRadioGroup';
import Image from 'next/image';
import { PhotoIcon } from '@heroicons/react/24/solid';

function Modal() {
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);

  const [newTaskInput, setNewTaskInput, image, setImage, addTodo, newTaskType] =
    useBoardStore((state) => [
      state.newTaskInput,
      state.setNewTaskInput,
      state.image,
      state.setImage,
      state.addTodo,
      state.newTaskType,
    ]);

  const imagePickerRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;

    addTodo(newTaskInput, newTaskType, image);
    setImage(null);
    closeModal();
  };

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        onSubmit={handleSubmit}
        as="form"
        className="z-10"
        onClose={closeModal}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>
          </div>
        </div>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2"
                >
                  Add a Task
                </Dialog.Title>

                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Task Name"
                    className="w-full border border-gray-300 rounded-md p-5 outline-none"
                  />
                </div>

                <TaskTypeRadioGroup />

                <div className="">
                  <button
                    type="button"
                    onClick={() => imagePickerRef.current?.click()}
                    className="space-x-2 w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <PhotoIcon className="h-6 w-6 inline-block" />
                    <span>Upload Image</span>
                  </button>

                  {image && (
                    <Image
                      alt="Upload Image"
                      width={200}
                      height={200}
                      src={URL.createObjectURL(image)}
                      className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                      onClick={() => {
                        setImage(null);
                      }}
                    />
                  )}

                  <input
                    type="file"
                    ref={imagePickerRef}
                    hidden
                    onChange={(e) => {
                      if (!e.target.files![0].type.startsWith('image/')) return;
                      setImage(e.target.files![0]);
                    }}
                  />
                </div>

                <div className="my-4 w-full">
                  <button
                    type="submit"
                    className="px-5 w-full py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-blue-600 inline-block group disabled:cursor-not-allowed"
                    disabled={!newTaskInput}
                  >
                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-blue-600 group-hover:h-full opacity-90 group-disabled:opacity-20"></span>
                    <span className="relative group-hover:text-white">
                      Add Task
                    </span>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
