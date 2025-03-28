"use client";
import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import { ALL_COLOR } from "@/lib/consts/colorConsts";

export default function QuestNode(props: any) {
  const onClickTitle = useCallback((urlMapping: string) => {
    window.open(`/quest/detail/${urlMapping}`, "_blank");
  }, []);

  return (
    <div
      className="flex flex-col items-center rounded-lg min-w-[220px] min-h-[90px] shadow-NeutralGray shadow-md"
      style={{ backgroundColor: props.data.node_color }}
    >
      <div
        className="w-full h-full  border-solid border-4 rounded-lg"
        style={{
          borderColor: props.data.isCheck ? ALL_COLOR.LimeGreen : ALL_COLOR.Red,
        }}
      >
        <div className="w-full flex justify-end pr-1 pt-1">
          <input
            type="checkbox"
            className="w-6 h-6 border border-white cursor-pointer"
            onChange={(e) => props.data.onChange(props.data, e.target.checked)}
            checked={props.data.isCheck}
          />
        </div>
        <div className="flex items-center justify-center h-full w-full p-3">
          <div className="flex items-center justify-center w-full">
            <span
              className="text-center font-black cursor-pointer text-white hover:text-Beige text-base"
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
        <div className="w-full flex justify-end p-1">
          {props.data.iskappa && (
            <span className="text-Red font-bold text-[13px]">Kappa</span>
          )}
        </div>
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
