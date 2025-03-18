"use client";
import { Handle, Position } from "@xyflow/react";
import Image from "next/image";
import { formatImage } from "@/lib/func/formatImage";

export default function NpcNode(props: any) {
  return (
    <div
      className="flex flex-col items-center rounded-lg min-w-[220px] min-h-[200px] shadow-NeutralGray shadow-md rounded-lg"
      style={{
        backgroundColor: props.data.node_color,
      }}
    >
      <div className="w-full h-full">
        <div className="w-full flex justify-end pr-1 pt-1"></div>
        <div className="flex-col items-center justify-center h-full w-full p-3">
          <div className="flex items-center justify-center w-full mb-4">
            <Image
              src={formatImage(props.data.image)}
              width={120}
              height={120}
              placeholder="blur"
              blurDataURL={
                "data:image/jpeg;base64," +
                "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              }
              alt={props.data.title_kr
                .substring(props.data.title_kr.indexOf("("))
                .trim()}
            />
          </div>
          <div className="flex items-center justify-center w-full">
            <span className="text-center font-black cursor-pointer text-white text-xl">
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
        <div className="w-full flex justify-end p-1"></div>
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
