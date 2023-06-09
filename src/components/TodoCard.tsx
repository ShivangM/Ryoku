import getImageUrl from '@/lib/getImageUrl';
import { useBoardStore } from '@/store/boardStore';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

const TodoCard = (props: Props) => {
  const { todo, index, id, innerRef, dragHandleProps, draggableProps } = props;

  const { title, image } = todo;

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const deleteTodo = useBoardStore((state) => state.deleteTodo);

  useEffect(() => {
    if (image) {
      const fetchImage = async () => {
        const url = await getImageUrl(image);
        if (url) setImageUrl(url.toString());
      };

      fetchImage();
    }
  }, [image]);

  return (
    <div
      className="bg-white/5 rounded-md space-y-2 drop-shadow-md"
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p className="text-secondary">{title}</p>
        <button
          onClick={() => deleteTodo(index, todo, id)}
          className="text-red-400 hover:text-red-500"
        >
          <XCircleIcon className="h-8 w-8 ml-5" />
        </button>
      </div>

      {imageUrl ? (
        <div className="relative h-full w-full rounded-b-md">
          <Image
            src={imageUrl}
            alt="Todo Image"
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
          />
        </div>
      ) : null}
    </div>
  );
};

export default TodoCard;
