import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "@/components/ui/base-node";
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
        <Link href={`${pathName}/${data.id}`}>
          <BaseNode className="max-w-[200px] min-h-[100px] w-[200px]">
            <BaseNodeHeader className="border-b">
              <BaseNodeHeaderTitle className="text-sm text-center font-semibold">
                Path {data.index}
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
