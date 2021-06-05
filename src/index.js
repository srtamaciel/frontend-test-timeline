import React from "react";
import ReactDOM from "react-dom";
import {v4 as uuid} from "uuid";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

import "./index.css";

// This method is needed for rendering clones of draggables
const getRenderItem = (items, className) => (provided, snapshot, rubric) => {
  const item = items[rubric.source.index];
  return (
    <React.Fragment>
      <li
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        style={provided.draggableProps.style}
        className={snapshot.isDragging ? "dragging" : ""}
      >
        {item.label}
      </li>
    </React.Fragment>
  );
};

const Copyable = (props) => {
  return (
    <Droppable
      renderClone={getRenderItem(props.items, props.className)}
      droppableId={props.droppableId}
      isDropDisabled={true}
    >
      {(provided, snapshot) => (
        <ul ref={provided.innerRef} className={props.className}>
          {props.items.map((item, index) => {
            const shouldRenderClone = item.id === snapshot.draggingFromThisWith;
            return (
              <React.Fragment key={item.id}>
                {shouldRenderClone ? (
                  <li className="react-beatiful-dnd-copy">{item.label}</li>
                ) : (
                  <Draggable draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <React.Fragment>
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={snapshot.isDragging ? "dragging" : ""}
                        >
                          {item.label}
                        </li>
                      </React.Fragment>
                    )}
                  </Draggable>
                )}
              </React.Fragment>
            );
          })}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

const Clips = (props) => {
  return <Copyable droppableId="CLIPS" className="clips" items={props.items} />;
};


const Timeline = (props) => {
  console.log(props)
  return (
    <Droppable droppableId="TIMELINE">
      {(provided) => (
        <div className="container-timeline">
          <ul id="timeline" ref={provided.innerRef} className="timeline">
            {props.items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <li
                    id="clip-box"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                  >
                    {item.label}
                    {console.log(document.getElementById('timeline').getBoundingClientRect())}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        </div>
      )}
    </Droppable>
  );
};



const COLLECTION = [
  {id: uuid(), label: "Clip 1"},
  {id: uuid(), label: "Clip 2"},
  {id: uuid(), label: "Clip 3"},
];

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

const copy = (source, destination, droppableSource, droppableDestination) => {
  const item = source[droppableSource.index];
  destination.splice(droppableDestination.index, 0, {...item, id: uuid()});
  return destination;
  
};


const App = () => {
  const [timelineItems, setTimelineItems] = React.useState([]);
  const onDragEnd = React.useCallback(
    (result) => {
      console.log(result);
      const {source, destination} = result;

      if (!destination) {
        return;
      }

      switch (source.droppableId) {
        case destination.droppableId:
          setTimelineItems((state) =>
            reorder(state, source.index, destination.index)
          );
          break;
        case "CLIPS":
          setTimelineItems((state) =>
            copy(COLLECTION, state, source, destination)
          );
          break;
        default:
          break;
      }
    },
    [setTimelineItems]
  );
  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <h2>Clips</h2>
        <Clips items={COLLECTION} />
        <h2>Time line</h2>
        <Timeline items={timelineItems} />
      </DragDropContext>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
