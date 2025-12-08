"use client";
import { Metadata as CMetadata } from "@/lib/openai/type";
import {
  ReactFlow,
  Background,
  useNodesState,
  FitViewOptions,
  useEdgesState,
  Edge,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import { SimpleNode } from "./node";
import "@xyflow/react/dist/style.css";
// import { useIsMobile } from "@/hooks/use-mobile";
import { useContext, useEffect, useRef } from "react";
import { CourseContentContext } from "../_providers/course-content-provider";

// function Flow({props}: {props: re}) {
//   // you can access the internal state here
//   const reactFlowInstance = useReactFlow();

//   return <ReactFlow {...props} />;
// }

// // wrapping with ReactFlowProvider is done outside of the component
// function FlowWithProvider(props) {
//   return (
//     <ReactFlowProvider>
//       <Flow {...props} />
//     </ReactFlowProvider>
//   );
// }

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

  const [nodes, ,] = useNodesState(initialnodes);
  const [edges, ,] = useEdgesState(defaultEdges);
  const fitViewOptions: FitViewOptions = {
    padding: 0.4,
  };

  // const containerRef = useRef<HTMLDivElement>(null);
  // const { fitView } = useReactFlow();

  // useEffect(() => {
  //   if (!containerRef.current) return;

  //   const observer = new ResizeObserver(() => {
  //     fitView({ padding: 0.2 });
  //   });

  //   observer.observe(containerRef.current);
  //   return () => observer.disconnect();
  // }, [fitView]);

  return (
    <div className="h-full w-full">
      <ReactFlow
        defaultNodes={nodes}
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
        minZoom={0.8}
        maxZoom={5}
      >
        <Background />
        {/* <MiniMap /> */}
      </ReactFlow>
    </div>
  );
}
