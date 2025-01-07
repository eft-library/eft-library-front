"use client";
import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";
import type { Quest } from "../../quest/data/questTypes";

export default function RoadMapNode(props: any) {
  //   const onChange = useCallback((evt) => {
  //     console.log(evt.target.value);
  //   }, []);

  const onClickTitle = useCallback((data: Quest) => {
    // 퀘스트 상세 페이지 새 창으로 띄우기
    console.log(data);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center rounded-lg w-[200px] h-[90px] p-2 bg-Background border-solid border-2 border-LimeGreen">
      <div className="w-full flex justify-end">
        <input
          type="checkbox"
          className="w-5 h-5 border border-white cursor-pointer"
        />
      </div>
      <div className="flex items-center justify-center w-full">
        <span
          className="text-center font-bold cursor-pointer text-white hover:text-Beige"
          onClick={() => onClickTitle(props.data)}
        >
          {/* {props.data.title_kr
            .substring(0, props.data.title_kr.indexOf("("))
            .trim()}
          <br />
          {props.data.title_kr
            .substring(props.data.title_kr.indexOf("("))
            .trim()} */}
          {props.data.label}
        </span>
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
