import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "@/components/ui/base-node";
import { NodeAppendix } from "@/components/ui/node-appendix";
import {
  NodeTooltip,
  NodeTooltipContent,
  NodeTooltipTrigger,
} from "@/components/ui/tooltip-node";
import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import { FaLock } from "react-icons/fa";

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
      isLocked: boolean;
    };
  }) => {
    const pathName = usePathname();

    const Node = () => {
      return (
        <BaseNode
          className={cn(
            "max-w-[200px] min-h-[100px] w-[200px]",
            data.isLocked && " cursor-default hover:ring-0"
          )}
        >
          <BaseNodeHeader className="border-b">
            <BaseNodeHeaderTitle className="text-sm text-center font-semibold">
              Path {data.index}
            </BaseNodeHeaderTitle>
          </BaseNodeHeader>
          <BaseNodeContent className="text-wrap text-center">
            <NodeTooltipTrigger>{data.label}</NodeTooltipTrigger>
          </BaseNodeContent>
        </BaseNode>
      );
    };

    return (
      <NodeTooltip>
        {data.index !== 1 && <Handle type="target" position={Position.Left} />}
        <NodeTooltipContent
          className="bg-card/50 text-center text-xs text-foreground max-w-[180px]"
          position={Position.Bottom}
        >
          {data.description}
        </NodeTooltipContent>
        {data.isLocked && (
          <NodeAppendix className="flex justify-center w-full bg-transparent border-0 cursor-default">
            <div className="w-[50%] items-center justify-center gap-1  rounded-md flex bg-white p-2">
              <FaLock className="w-3 h-3" />
              Locked
            </div>
          </NodeAppendix>
        )}
        {data.isLocked ? (
          <Node />
        ) : (
          <Link
            href={
              data.index < 5 ? `${pathName}/${data.id}` : `/quiz/${data.id}`
            }
          >
            <Node />
          </Link>
        )}

        {data.index !== 5 && <Handle type="source" position={Position.Right} />}
      </NodeTooltip>
    );
  }
);

SimpleNode.displayName = "SimpleNode";
