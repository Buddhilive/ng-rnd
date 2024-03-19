import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { bind } from "@angular/core/src/render3";
import * as go from "gojs";

const $go = go.GraphObject.make;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  @ViewChild("myDiagramDiv") myDiagramDiv: ElementRef<HTMLDivElement>;
  @ViewChild("saveButton") saveButton: ElementRef<HTMLButtonElement>;
  @ViewChild("mySavedModel") mySavedModel: ElementRef<HTMLTextAreaElement>;
  @ViewChild("myPaletteDiv") myPaletteDiv: ElementRef<HTMLDivElement>;

  myDiagram: go.Diagram;

  ngOnInit(): void {
    console.log(go);
    // colors are almost entirely defined up here to allow for easier theming
    var yellow = "#FFB400";

    var green = "#7FB800";
    var blue = "#00A6ED";
    var red = "#D73909";
    var white = "#DCE9F9";

    var blueShadow = "#407090";
    var greenShadow = "#406050";
    var yellowShadow = "#804040";
    var redShadow = "#705020";
    var whiteShadow = "#404050";

    var selectColor = "dodgerBlue";
    var undesiredEventTextColor = "whitesmoke";

    var lineColor = "#0D2C54";
    var commentLineColor = "darkgreen";

    var darkModeBackgroundColor = "#06162a";
    var lightModeBackgroundColor = "#FFFFFF";

    var bigfont = "bold 13pt Helvetica, Arial, sans-serif";
    var smallfont = "bold 11pt Helvetica, Arial, sans-serif";

    this.textStyle(bigfont);

    this.myDiagram = new go.Diagram(this.myDiagramDiv.nativeElement, {
      // have mouse wheel events zoom in and out instead of scroll up and down
      "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
      initialAutoScale: go.Diagram.Uniform,
      "linkingTool.direction": go.LinkingTool.ForwardsOnly,
      layout: $go(go.LayeredDigraphLayout, {
        isInitial: false,
        isOngoing: false,
        layerSpacing: 100,
        alignOption: go.LayeredDigraphLayout.AlignAll,
      }),
      "undoManager.isEnabled": true,
    });

    // when the document is modified, add a "*" to the title and enable the "Save" button
    this.myDiagram.addDiagramListener("Modified", (e) => {
      if (this.saveButton.nativeElement)
        this.saveButton.nativeElement.disabled = !this.myDiagram.isModified;
      var idx = document.title.indexOf("*");
      if (this.myDiagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.slice(0, idx);
      }
    });

    const defaultAdornment = $go(
      go.Adornment,
      "Spot",
      $go(
        go.Panel,
        "Auto",
        $go(go.Shape, {
          fill: null,
          stroke: selectColor,
          strokeWidth: 3,
        }),
        $go(go.Placeholder)
      ),
      // the button to create a "next" node, at the top-right corner
      $go(
        "Button",
        {
          alignment: new go.Spot(1, 0, -5, 5),
          click: this.addNodeAndLink,
        }, // this function is defined below
        new go.Binding("visible", "", (a) => !a.diagram.isReadOnly).ofObject(),
        $go(go.Shape, "PlusLine", { desiredSize: new go.Size(6, 6) })
      )
    );

    this.myDiagram.nodeTemplate = // define the Node template
      $go(
        go.Node,
        "Auto",
        {
          selectionAdornmentTemplate: defaultAdornment,
          isShadowed: true,
          shadowBlur: 2,
          shadowColor: yellowShadow,
          shadowOffset: new go.Point(4, 6),
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        $go(go.Shape, "Rectangle", {
          fill: yellow,
          stroke: "rgba(0, 0, 0, 0)",
          portId: "",
          fromLinkable: true,
          toLinkable: true,
          cursor: "pointer",
          toEndSegmentLength: 50,
          fromEndSegmentLength: 40,
        }),
        $go(
          go.TextBlock,
          "Page",
          {
            margin: 10,
            font: bigfont,
            editable: true,
          },
          new go.Binding("text", "text").makeTwoWay()
        )
      );

    this.myDiagram.nodeTemplateMap.add(
      "Source",
      $go(
        go.Node,
        "Auto",
        {
          isShadowed: true,
          shadowBlur: 2,
          shadowColor: blueShadow,
          shadowOffset: new go.Point(4, 6),
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        $go(
          go.Shape,
          "RoundedRectangle",
          {
            name: "SHAPE",
            fill: blue,
            stroke: "rgba(0, 0, 0, 0)",
            portId: "",
            fromLinkable: true,
            cursor: "pointer",
            fromEndSegmentLength: 40,
          },
          new go.Binding("fill", "color")
        ),
        $go(
          go.TextBlock,
          "Source",
          this.textStyle(bigfont).textAlign,
          new go.Binding("text", "text").makeTwoWay()
        )
      )
    );

    this.myDiagram.nodeTemplateMap.add(
      "DesiredEvent",
      $go(
        go.Node,
        "Auto",
        {
          isShadowed: true,
          shadowBlur: 2,
          shadowColor: greenShadow,
          shadowOffset: new go.Point(4, 6),
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        $go(
          go.Shape,
          "RoundedRectangle",
          {
            fill: green,
            stroke: null,
            portId: "",
            toLinkable: true,
            toEndSegmentLength: 50,
          },
          new go.Binding("fill", "color")
        ),
        $go(
          go.TextBlock,
          "Success!",
          this.textStyle(bigfont).textAlign,
          new go.Binding("text", "text").makeTwoWay()
        )
      )
    );

    const UndesiredEventAdornmentModify = $go(
      go.Adornment,
      "Spot",
      $go(
        go.Panel,
        "Auto",
        $go(go.Shape, {
          fill: null,
          stroke: selectColor,
          strokeWidth: 4,
        }),
        $go(go.Placeholder)
      ),
      // the button to create a new reason, at the bottom-left corner
      $go(
        "Button",
        {
          alignment: new go.Spot(1, 1, -5, -5),
          click: this.addReason,
        }, // this function is defined below
        new go.Binding(
          "visible",
          "",
          (a) => !a.diagram.isReadOnly
        ).ofObject(),
        $go(go.Shape, "TriangleDown", {
          desiredSize: new go.Size(10, 10),
        })
      ),
      //the button to remove the most recent reason, above the "create" button
      $go(
        "Button",
        {
          alignment: new go.Spot(1, 1, -5, -22),
          click: this.removeReason,
        }, //this function is also defined below
        new go.Binding(
          "visible",
          "",
          (a) => !a.diagram.isReadOnly
        ).ofObject(),
        $go(go.Shape, "TriangleUp", { desiredSize: new go.Size(10, 10) })
      )
    );

    const reasonTemplate = $go(
      go.Panel,
      "Horizontal",
      $go(go.TextBlock, "•", {
        margin: 4,
        stroke: undesiredEventTextColor,
        font: smallfont,
      }),
      $go(
        go.TextBlock,
        "Reason",
        {
          margin: 4,
          maxSize: new go.Size(200, NaN),
          wrap: go.TextBlock.WrapFit,
          stroke: undesiredEventTextColor,
          editable: true,
          font: smallfont,
        },
        new go.Binding("text", "text").makeTwoWay()
      )
    );

    this.myDiagram.nodeTemplateMap.add(
      "UndesiredEvent",
      $go(
        go.Node,
        "Auto",
        {
          isShadowed: true,
          shadowBlur: 2,
          shadowColor: redShadow,
          shadowOffset: new go.Point(4, 6),
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        { selectionAdornmentTemplate: UndesiredEventAdornmentModify },
        $go(go.Shape, "RoundedRectangle", {
          fill: red,
          stroke: null,
          portId: "",
          toLinkable: true,
          toEndSegmentLength: 50,
        }),
        $go(
          go.Panel,
          "Vertical",
          { defaultAlignment: go.Spot.Top },

          $go(
            go.TextBlock,
            "Drop",
            this.textStyle(bigfont).textAlign,
            {
              stroke: undesiredEventTextColor,
              minSize: new go.Size(80, NaN),
            },
            new go.Binding("text", "text").makeTwoWay()
          ),

          $go(
            go.Panel,
            "Vertical",
            {
              defaultAlignment: go.Spot.TopLeft,
              itemTemplate: reasonTemplate,
            },
            new go.Binding("itemArray", "reasonsList").makeTwoWay()
          )
        )
      )
    );

    this.myDiagram.nodeTemplateMap.add(
      "Comment",
      $go(
        go.Node,
        "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        $go(go.Shape, "Rectangle", {
          portId: "",
          fill: white,
          stroke: null,
          fromLinkable: true,
        }),
        $go(
          go.TextBlock,
          "A comment",
          {
            margin: 10,
            maxSize: new go.Size(200, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true,
            font: smallfont,
          },
          new go.Binding("text", "text").makeTwoWay()
        )
        // no ports, because no links are allowed to connect with a comment
      )
    );

    // replace the default Link template in the linkTemplateMap
    this.myDiagram.linkTemplate = $go(
      go.Link, // the whole link panel
      {
        curve: go.Link.Bezier,
        toShortLength: 5,
        fromSpot: go.Spot.Right,
        toSpot: go.Spot.Left,
      },
      $go(
        go.Shape, // the link shape
        { stroke: lineColor, strokeWidth: 2.5 }
      ),
      $go(
        go.Shape, // the arrowhead
        {
          toArrow: "Kite",
          fill: lineColor,
          stroke: lineColor,
          scale: 1.5,
        }
      )
    );

    // comments will have different links
    this.myDiagram.linkTemplateMap.add(
      "Comment",
      $go(
        go.Link,
        {
          fromSpot: go.Spot.Center,
          toSpot: go.Spot.Center,
        },
        $go(go.Shape, { strokeWidth: 1.5, stroke: "darkgreen" })
      )
    );

    // when a new link is created, determine what template to use
    this.myDiagram.addDiagramListener("LinkDrawn", (e) => {
      var link = e.subject;
      if (link.fromNode.category === "Comment") {
        link.category = "Comment";
      }
    });

    const palette = new go.Palette(
      this.myPaletteDiv.nativeElement, // create a new Palette in the HTML DIV element
      {
        // share the template map with the Palette
        nodeTemplateMap: this.myDiagram.nodeTemplateMap,
        autoScale: go.Diagram.Uniform, // everything always fits in viewport
      }
    );

    palette.model.nodeDataArray = [
      { category: "Source" },
      {}, // default node
      { category: "DesiredEvent" },
      { category: "UndesiredEvent", reasonsList: [{}] },
      { category: "Comment" },
    ];

    // read in the JSON-format data from the "mySavedModel" element
    this.load();
    this.layout();

  }

  private textStyle(bigfont) {
    return {
      margin: 10,
      wrap: go.TextBlock.WrapFit,
      textAlign: "center",
      editable: true,
      font: bigfont,
    };
  }

  // clicking the button of a default node inserts a new node to the right of the selected node,
  // and adds a link to that new node
  private addNodeAndLink(e, obj) {
    var adorn = obj.part;
    if (adorn === null) return;
    e.handled = true;
    var diagram = adorn.diagram;
    diagram.startTransaction("Add State");
    // get the node data for which the user clicked the button
    var fromNode = adorn.adornedPart;
    var fromData = fromNode.data;
    // create a new "State" data object, positioned off to the right of the adorned Node
    var toData: any = { text: "new" };
    var p = fromNode.location;
    toData.loc = p.x + 200 + " " + p.y; // the "loc" property is a string, not a Point object
    // add the new node data to the model
    var model = diagram.model;
    model.addNodeData(toData);
    // create a link data from the old node data to the new node data
    var linkdata = {};
    linkdata[model.linkFromKeyProperty] = model.getKeyForNodeData(fromData);
    linkdata[model.linkToKeyProperty] = model.getKeyForNodeData(toData);
    // and add the link data to the model
    model.addLinkData(linkdata);
    // select the new Node
    var newnode = diagram.findNodeForData(toData);
    diagram.select(newnode);
    diagram.commitTransaction("Add State");
  }

  // clicking the add button on an UndesiredEvent node inserts a new text object into the panel
  private addReason(e, obj) {
    var adorn = obj.part;
    if (adorn === null) return;
    e.handled = true;
    var arr = adorn.adornedPart.data.reasonsList;
    this.myDiagram.startTransaction("add reason");
    this.myDiagram.model.addArrayItem(arr, {});
    this.myDiagram.commitTransaction("add reason");
  }

  // clicking the remove button will remove the most recent text object added to the panel
  private removeReason(e, obj) {
    var adorn = obj.part;
    if (adorn === null) return;
    e.handled = true;
    var arr = adorn.adornedPart.data.reasonsList;
    this.myDiagram.startTransaction("remove reason");
    this.myDiagram.model.removeArrayItem(arr, arr.length - 1);
    this.myDiagram.commitTransaction("remove reason");
  }

  private layout() {
    this.myDiagram.layoutDiagram(true);
  }

  // Show the diagram's model in JSON format
  save() {
    this.mySavedModel.nativeElement.value =
    this.myDiagram.model.toJson();
    this.myDiagram.isModified = false;
  }

  private load() {
    this.myDiagram.model = go.Model.fromJson(
      this.mySavedModel.nativeElement.value
    );
  }
}
