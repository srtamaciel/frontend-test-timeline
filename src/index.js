import React from "react";
import ReactDOM from "react-dom";
import RGL, {WidthProvider} from "react-grid-layout";

import "./index.css";

const ReactGridLayout = WidthProvider(RGL);

let idCounter = 0;

const getId = (num) => {
  idCounter++;
  return `Clip ${num} ${idCounter.toString()}`;
};

class App extends React.PureComponent {
  static defaultProps = {
    isDraggable: true,
    isResizable: true,
    items: 5,
    rowHeight: 30,
    preventCollision: false,
    cols: 12,
  };

  state = {
    layout: [
      /*   { x: 0, y: 0, w: 3, h: 3, i: getId() },
      { x: 0, y: 1, w: 3, h: 3, i: getId() },
      { x: 0, y: 2, w: 3, h: 3, i: getId() }  */
    ],
    showMessage: false,
  };

  render() {

  const addNewItem1 = () => {
    const {layout} = this.state;
    const newItem = {x: 0, y: 0, w: 3, h: 2, i: getId(1)};

    if (layout.some((item) => item.x === 0 && item.y === 0)) {
      this.setState({
        layout: layout
          .map((item) => {
            if (item.x === 0) {
              return {y: item.y++, ...item};
            }
            return item;
          })
          .concat([newItem]),
      });
    } else {
      this.setState({layout: layout.concat([newItem])});
    }
  };

  const addNewItem2 = () => {
    const {layout} = this.state;
    const newItem = {x: 0, y: 0, w: 3, h: 2, i: getId(2)};

    if (layout.some((item) => item.x === 0 && item.y === 0)) {
      this.setState({
        layout: layout
          .map((item) => {
            if (item.x === 0) {
              return {y: item.y++, ...item};
            }
            return item;
          })
          .concat([newItem]),
      });
    } else {
      this.setState({layout: layout.concat([newItem])});
    }
  };

  const addNewItem3 = () => {
    const {layout} = this.state;
    const newItem = {x: 0, y: 0, w: 3, h: 2, i: getId(3)};

    if (layout.some((item) => item.x === 0 && item.y === 0)) {
      this.setState({
        layout: layout
          .map((item) => {
            if (item.x === 0) {
              return {y: item.y++, ...item};
            }
            return item;
          })
          .concat([newItem]),
      });
    } else {
      this.setState({layout: layout.concat([newItem])});
    }
  };

  const unitiesOfTimeline = this.state.layout.map((clip, index) => {
    return(
       <div key={index}>{clip.i.slice(0, 6)} in the position X: {clip.x} Y: {clip.y}. It takes {clip.w} units of the timeline</div>
    )
  });
  
  const exportButton = () => {
    this.setState({showMessage: true});

    return <div>In this timeline we have {
      this.state.layout.length
    } clips: {unitiesOfTimeline} Your timeline have a total of {this.state.layout.reduce(
      (acc, unities) => {
        return acc + unities.w;
      },
      0
    )} units.
  </div>
  }

    return (
      <React.Fragment>
        <div className="button">
          <button onClick={addNewItem1}>Add clip 1</button>
          <button onClick={addNewItem2}>Add clip 2</button>
          <button onClick={addNewItem3}>Add clip 3</button>
        </div>
        <div className="timeline-title">
          <h2>Timeline</h2>
        </div>
        
        <ReactGridLayout
        resizeHandles={['e']}
          {...this.props}
          onLayoutChange={(layout) => this.setState({layout})}
        >
        
          {this.state.layout.map((item) => (
            <div
              key={item.i}
              data-grid={item}
            >
              <span>{item.i.slice(0, 6)}</span>
            </div>
          ))}
        </ReactGridLayout>
        <div className="button">
          <button onClick={exportButton}>Export</button>
        </div>
        {this.state.showMessage && (
          <div className="export-info">
            <div>{exportButton()}</div>
          </div>
        )}
      </React.Fragment>
    );
  }

}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
