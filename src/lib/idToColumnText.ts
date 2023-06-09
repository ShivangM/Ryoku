const idToColumnText = (id: TypedColumn) => {
  switch (id) {
    case 'todo':
      return 'To Do';
    case 'inprogress':
      return 'In Progress';
    case 'done':
      return 'Done';
  }
};

export default idToColumnText;
