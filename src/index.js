import React from "react";
import ReactDOM from "react-dom";
import RGL, {WidthProvider} from "react-grid-layout";

import "./index.css";

const ReactGridLayout = WidthProvider(RGL);

let idCounter = 0;

const getId = () => {
  idCounter++;
  return `Clip ${idCounter.toString()}`;
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
    return (
      <React.Fragment>
        <div className="button">
          <button onClick={this.addNewItem}>Add clip</button>
        </div>
        <div className="timeline-title">
          <h2>Timeline</h2>
        </div>
        <ReactGridLayout
        className="react-layout"
          {...this.props}
          onLayoutChange={(layout) => this.setState({layout})}
        >
        
          {this.state.layout.map((item) => (
            <div
              key={item.i}
              data-grid={item}
            >
              <span>{item.i}</span>
            </div>
          ))}
        </ReactGridLayout>
        <div className="button">
          <button onClick={this.export}>Export</button>
        </div>
        {this.state.showMessage && (
          <div className="export-info">
            <p>{this.export()}</p>
          </div>
        )}
      </React.Fragment>
    );
  }

  addNewItem = () => {
    const {layout} = this.state;
    const newItem = {x: 0, y: 0, w: 3, h: 2, i: getId()};

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

  export = () => {
    const unitiesOfTimeline = this.state.layout.map((clip) => {
      return clip;
    });
    this.setState({showMessage: true});

    console.log(
      `In this timeline we have ${
        this.state.layout.length
      } clips, each of them have ${unitiesOfTimeline.map(
        (clip) => clip.y
      )} axis Y position and axis X ${unitiesOfTimeline.map(
        (clip) => clip.x
      )}. It takes ${unitiesOfTimeline.map(
        (clip) => clip.w
      )} unities of the timeline, a total of ${this.state.layout.reduce(
        (acc, unities) => {
          return acc + unities.w;
        },
        0
      )} unities. `
    );

    return `In this timeline we have ${
      this.state.layout.length
    } clips, each of them have ${unitiesOfTimeline.map(
      (clip) => clip.y
    )} axis Y position and axis X ${unitiesOfTimeline.map(
      (clip) => clip.x
    )}. It takes ${unitiesOfTimeline.map(
      (clip) => clip.w
    )} unities of the timeline, a total of ${this.state.layout.reduce(
      (acc, unities) => {
        return acc + unities.w;
      },
      0
    )} unities. `;
  };
}

/* if (require.main === module) {
  require(".../test-hook.jsx")(module.exports);
} */

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
