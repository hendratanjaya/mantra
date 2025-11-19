"use client";
import { Metadata as CMetadata } from "@/lib/openai/type";
import {
  ReactFlow,
  Background,
  useNodesState,
  FitViewOptions,
  useEdgesState,
  Edge,
} from "@xyflow/react";
import { SimpleNode } from "./node";
import "@xyflow/react/dist/style.css";
// import { useIsMobile } from "@/hooks/use-mobile";
import { useContext } from "react";
import { CourseContentContext } from "../_providers/course-content-provider";

export default function CourseContentFlow() {
  //const isMobile = useIsMobile()
  const courseContent = useContext(CourseContentContext);

  const initialnodes = courseContent.map((content, i) => {
    const metadata = content.metadata;
    const parsedContent = JSON.parse(metadata) as CMetadata;
    let y = (i % 2) * 500; // your alternating pattern
    if (i === courseContent.length - 1) y = 205; // drop the last node lower
    return {
      id: String(i + 1),
      data: {
        id: content.id,
        label: parsedContent.title,
        description: parsedContent.description,
        difficulty: parsedContent.difficulty,
        timeSpent: content.time_spent,
        index: i + 1,
      },
      position: { x: i * 350, y },
      type: "customBaseNode",
    };
  });

  const defaultEdges: Edge[] = [
    { id: "e1-2", source: "1", target: "2", type: "smoothstep" },
    { id: "e2-3", source: "2", target: "3", type: "smoothstep" },
    { id: "e3-4", source: "3", target: "4", type: "smoothstep" },
    { id: "e4-5", source: "4", target: "5", type: "smoothstep" },
  ];

  const nodeTypes = {
    customBaseNode: SimpleNode,
  };

  const [node, ,] = useNodesState(initialnodes);
  const [edges, ,] = useEdgesState(defaultEdges);
  const fitViewOptions: FitViewOptions = {
    padding: 0.4,
  };

  return (
    <div className="h-full w-full">
      <ReactFlow
        defaultNodes={node}
        //edges={edges}
        defaultEdges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={fitViewOptions}
        edgesFocusable={false}
        nodesDraggable={false}
        nodesConnectable={false}
        // nodesFocusable={false}
        draggable={false}
        panOnDrag={false}
        elementsSelectable={true}
        // Optional if you also want to lock zooming
        zoomOnDoubleClick={false}
        minZoom={1}
        maxZoom={5}
      >
        <Background />
        {/* <MiniMap /> */}
      </ReactFlow>
    </div>
  );
}
