import { Badge } from "@/components/ui/badge";
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "@/components/ui/base-node";
import { NodeAppendix } from "@/components/ui/node-appendix";
import { Separator } from "@/components/ui/separator";
import {
  NodeTooltip,
  NodeTooltipContent,
  NodeTooltipTrigger,
} from "@/components/ui/tooltip-node";
import { Handle, Position } from "@xyflow/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";

export const SimpleNode = memo(
  ({
    data,
  }: {
    data: {
      id: string;
      timeSpent: number;
      index: number;
      label: string;
      description: string;
      difficulty: string;
    };
  }) => {
    const pathName = usePathname();
    return (
      <NodeTooltip>
        {data.index !== 1 && <Handle type="target" position={Position.Left} />}
        <NodeTooltipContent
          className="bg-card/50 text-center text-xs text-foreground max-w-[180px]"
          position={Position.Bottom}
        >
          {data.description}
        </NodeTooltipContent>
        <NodeAppendix className="border-none bg-transparent">
          <Badge className="bg-card text-foreground">{data.difficulty}</Badge>
        </NodeAppendix>
        <Link href={`${pathName}/${data.id}`}>
          <BaseNode className="max-w-[200px] min-h-[100px] w-[200px]">
            <BaseNodeHeader className="border-b">
              <BaseNodeHeaderTitle className="text-sm text-center font-semibold">
                Path {data.index}
                <small className="block font-normal">
                  time spent: {(data.timeSpent / 60).toFixed(2)} minutes
                </small>
              </BaseNodeHeaderTitle>
            </BaseNodeHeader>
            <BaseNodeContent className="text-wrap text-center">
              <NodeTooltipTrigger>{data.label}</NodeTooltipTrigger>
            </BaseNodeContent>
          </BaseNode>
        </Link>
        {data.index !== 5 && <Handle type="source" position={Position.Right} />}
      </NodeTooltip>
    );
  }
);

SimpleNode.displayName = "SimpleNode";
