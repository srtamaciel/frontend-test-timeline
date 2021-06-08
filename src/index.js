import React from "react";
import ReactDOM from "react-dom";
import RGL, {WidthProvider} from "react-grid-layout";

import "./index.scss";

const ReactGridLayout = WidthProvider(RGL);

//Crea un id nuevo sumando 1
let idCounter = 0;

const getId = (num) => {
  idCounter++;
  return `Clip ${num} ${idCounter.toString()}`;
};

class App extends React.PureComponent {
  //Propiedades paquete react-grid-layout
  static defaultProps = {
    isDraggable: true,
    isResizable: true,
    items: 5,
    rowHeight: 30,
    preventCollision: false,
    cols: 12,
  };

  // Layout = timeline
  state = {
    layout: [],
    showMessage: false,
    seeTimeline: true,
  };

  render() {
    //Añadir el clip con el número que se le pase como argumento a la función, siempre que se pulse el botón añadirá el mismo clip , con diferentes Ids pero el mismo nombre
    const addNewItem = (numb) => {
      const {layout} = this.state;
      const newItem = {x: 0, y: 0, w: 3, h: 2, i: getId(numb)};

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

    //Detalles del mensaje export
    const unitiesOfTimeline = this.state.layout.map((clip, index) => {
      return (
        <div key={index}>
          {clip.i.slice(0, 6)} in the position X: {clip.x} Y: {clip.y}. It takes{" "}
          {clip.w} units of the timeline
        </div>
      );
    });
    // Mensaje entero botón export
    const exportButton = () => {
      this.setState({showMessage: true});
      return (
        <div>
          In this timeline we have {this.state.layout.length} clips:
          {unitiesOfTimeline} Your timeline have a total of
          {this.state.layout.reduce((acc, unities) => {
            return acc + unities.w;
          }, 0)}
           units.
        </div>
      );
    };
    

    //Printeado del timeline, sólo se muestra si la propiedad seeTimeline de app es true
    const timeline = () => {
      this.setState({seeTimeline: true});
      return this.state.layout.map((item) => (
        <div key={item.i} data-grid={item}>
          <span>{item.i.slice(0, 6)}</span>
        </div>
      ));
    };

    return (
      //Componente de React que permite agrupar lista de hijos sin agregar nodos
      //Renderiza todo lo visible en la pantalla
      <React.Fragment>
        <div className="button">
          <button onClick={() => addNewItem(1)}>Add clip 1</button>
          <button onClick={() => addNewItem(2)}>Add clip 2</button>
          <button onClick={() => addNewItem(3)}>Add clip 3</button>
        </div>
        <div className="timeline-title">
          <h2>Timeline</h2>
        </div>

        {/* Componenete del paquete react-grid-layout que crea el grid que posteriormente será draggable y resizable */}
        <ReactGridLayout
          resizeHandles={["e"]}
          {...this.props}
          onLayoutChange={(layout) => this.setState({layout})}
          style={{visibility: this.state.seeTimeline ? "visible" : "hidden"}}
        >
          {this.state.layout.length
            ? timeline()
            : this.setState({seeTimeline: false})}
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
