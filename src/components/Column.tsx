import idToColumnText from '@/lib/idToColumnText';
import { useBoardStore } from '@/store/boardStore';
import { useModalStore } from '@/store/modalStore';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TodoCard from './TodoCard';

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

const Column = ({ id, todos, index }: Props) => {
  const [searchString, setNewTaskType] = useBoardStore((state) => [
    state.searchString,
    state.setNewTaskType,
  ]);
  const openModal = useModalStore((state) => state.openModal);

  const handleAddTodo = () => {
    openModal();
    setNewTaskType(id);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className=""
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={classNames(
                  'p-4 rounded-2xl shadow-lg shadow-primary/40',
                  snapshot.isDraggingOver ? 'bg-dark/90' : 'bg-dark'
                )}
              >
                <h2 className="flex justify-between font-bold text-xl p-2 text-primary">
                  <span>{idToColumnText(id)}</span>
                  <div className="text-primary bg-white/5 rounded-full flex items-center justify-center h-10 w-10 text-sm font-normal">
                    <span>
                      {!searchString
                        ? todos.length
                        : todos.filter((todo) =>
                            todo.title
                              .toLowerCase()
                              .includes(searchString.toLowerCase())
                          ).length}
                    </span>
                  </div>
                </h2>

                <div className="space-y-4">
                  {todos.map((todo, index) => {
                    if (
                      searchString &&
                      !todo.title
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                    )
                      return null;
                    return (
                      <Draggable
                        key={todo.$id}
                        draggableId={todo.$id}
                        index={index}
                      >
                        {(provided) => (
                          <TodoCard
                            todo={todo}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}

                  {provided.placeholder}

                  <div className="flex items-center justify-end p-2">
                    <button className="text-primary hover:text-primary">
                      <PlusCircleIcon
                        onClick={handleAddTodo}
                        className="h-10 w-10"
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
