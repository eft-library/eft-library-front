"use client";
import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import type { Quest } from "../../quest/data/questTypes";
import { ALL_COLOR } from "@/lib/consts/colorConsts";

export default function RoadmapNode(props: any) {
  const onClickTitle = useCallback((urlMapping: string) => {
    window.open(`/quest/detail/${urlMapping}`, "_blank");
  }, []);

  return (
    <div
      className="flex flex-col items-center rounded-lg min-w-[220px] min-h-[90px] p-2 bg-Background border-solid border-2 gap-2"
      style={{
        borderColor: props.data.isCheck
          ? ALL_COLOR.QUEST_RELATED_ONE
          : ALL_COLOR.RED,
      }}
    >
      <div className="w-full flex justify-end">
        <input
          type="checkbox"
          className="w-5 h-5 border border-white cursor-pointer"
          onChange={(e) => props.data.onChange(props.data, e.target.checked)}
          checked={props.data.isCheck}
        />
      </div>
      <div className="flex items-center justify-center h-full w-full">
        <div className="flex items-center justify-center w-full">
          <span
            className="text-center font-bold cursor-pointer text-white hover:text-Beige text-base"
            onClick={() => onClickTitle(props.data.urlMapping)}
          >
            {props.data.title_kr
              .substring(0, props.data.title_kr.indexOf("("))
              .trim()}
            <br />
            {props.data.title_kr
              .substring(props.data.title_kr.indexOf("("))
              .trim()}
          </span>
        </div>
      </div>
      <div className="w-full flex justify-end">
        {props.data.iskappa && (
          <span className="text-Red font-bold text-xs">Kappa</span>
        )}
      </div>

      {["top", "bottom"].includes(props.sourcePosition) ? (
        <>
          <Handle
            type="target"
            position={Position.Top}
            isConnectable={props.isConnectable}
          />
          <Handle
            type="source"
            position={Position.Bottom}
            id="b"
            isConnectable={props.isConnectable}
          />
        </>
      ) : (
        <>
          <Handle
            type="target"
            position={Position.Left}
            isConnectable={props.isConnectable}
          />
          <Handle
            type="source"
            position={Position.Right}
            isConnectable={props.isConnectable}
          />
        </>
      )}
    </div>
  );
}
