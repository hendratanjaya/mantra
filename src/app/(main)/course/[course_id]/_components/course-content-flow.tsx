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
import { useIsMobile } from "@/hooks/use-mobile";
import { QuizIdContext } from "../_providers/quiz-providers";

export default function CourseContentFlow() {
  const { contentList } = useContext(CourseContentContext)!;
  const quizIdContext = useContext(QuizIdContext);
  const isMobile = useIsMobile();

  const initialnodes = contentList.map((content, i) => {
    const metadata = content.metadata;
    const parsedContent = JSON.parse(metadata) as CMetadata;
    const y = (i % 2) * 500; // your alternating pattern
    // if (i === contentList.length - 1) y = 205; // drop the last node lower and add extra space for quiz
    return {
      id: String(i + 1),
      data: {
        id: content.id,
        label: content.title,
        description: i > 0 ? parsedContent.description : `Introduction`,
        difficulty: i > 0 ? parsedContent.difficulty : "-",
        index: i + 1,
        isLocked: !content?.content,
      },
      position: { x: i * 350, y },
      type: "customBaseNode",
    };
  });

  const lastIndex = contentList.length + 1;
  initialnodes.push({
    id: String(lastIndex),
    data: {
      id: quizIdContext || "#",
      label: "Final Quiz",
      description: "Unlock this after finishing every path",
      difficulty: "-",
      index: lastIndex,
      isLocked: !quizIdContext,
    },
    position: { x: (lastIndex - 1) * 350, y: 205 },
    type: "customBaseNode",
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

  return (
    <div className="h-full w-full">
      <ReactFlow
        defaultNodes={nodes}
        //edges={edges}
        defaultEdges={edges}
        nodeTypes={nodeTypes}
        fitView={!isMobile}
        fitViewOptions={fitViewOptions}
        edgesFocusable={false}
        nodesDraggable={false}
        nodesConnectable={false}
        // nodesFocusable={false}
        draggable={false}
        panOnDrag={true}
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
