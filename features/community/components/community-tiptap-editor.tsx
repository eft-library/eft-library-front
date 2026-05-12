"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentType,
  type DragEvent,
} from "react";
import { Extension, Node, mergeAttributes, type CommandProps, type RawCommands } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import ImageResize from "tiptap-extension-resize-image";
import { common, createLowlight } from "lowlight";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading2,
  Heading3,
  Highlighter,
  ImagePlus,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  Redo2,
  Table as TableIcon,
  Trash2,
  Underline as UnderlineIcon,
  Undo2,
  Video,
} from "lucide-react";

type CommunityTiptapEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onUploadImage: (file: File) => Promise<string>;
  disabled?: boolean;
  isUploading?: boolean;
  onUploadStateChange?: (isUploading: boolean) => void;
  onError?: (message: string) => void;
};

const lowlight = createLowlight(common);

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    iframe: {
      setIframe: (options: {
        src: string;
        title?: string;
        width?: string;
        height?: string;
      }) => ReturnType;
    };
  }
}

const Iframe = Node.create({
  name: "iframe",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      title: { default: "Embedded content" },
      width: { default: "800" },
      height: { default: "450" },
      frameborder: { default: "0" },
      allow: { default: "autoplay; clipboard-write; web-share; encrypted-media; picture-in-picture" },
      allowfullscreen: { default: true },
    };
  },

  parseHTML() {
    return [{ tag: "iframe" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["iframe", mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      setIframe:
        (options) =>
        ({ commands }: CommandProps) =>
          commands.insertContent({
            type: this.name,
            attrs: {
              src: options.src,
              title: options.title ?? "Embedded content",
              width: options.width ?? "800",
              height: options.height ?? "450",
              frameborder: "0",
              allow: "autoplay; clipboard-write; web-share; encrypted-media; picture-in-picture",
              allowfullscreen: true,
            },
          }),
    } satisfies Partial<RawCommands>;
  },
});

function getEmbedInfoFromText(input: string) {
  const text = input.trim();
  const iframeMatch = text.match(/<iframe\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/i);

  if (iframeMatch?.[1]) {
    return {
      src: iframeMatch[1],
      title: text.match(/\btitle=["']([^"']+)["']/i)?.[1] ?? "Embedded content",
    };
  }

  const chzzkClipMatch = text.match(/https?:\/\/(?:www\.)?chzzk\.naver\.com\/clips?\/([A-Za-z0-9_-]+)/i);
  if (chzzkClipMatch?.[1]) {
    return {
      src: `https://chzzk.naver.com/embed/clip/${chzzkClipMatch[1]}`,
      title: "CHZZK Player",
    };
  }

  const chzzkVideoMatch = text.match(/https?:\/\/(?:www\.)?chzzk\.naver\.com\/video\/([A-Za-z0-9_-]+)/i);
  if (chzzkVideoMatch?.[1]) {
    return {
      src: `https://chzzk.naver.com/embed/video/${chzzkVideoMatch[1]}`,
      title: "CHZZK Player",
    };
  }

  const youtubeMatch = text.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtube\.com\/shorts\/|youtu\.be\/)([\w-]{11})/i,
  );
  if (youtubeMatch?.[1]) {
    return {
      src: `https://www.youtube.com/embed/${youtubeMatch[1]}`,
      title: "YouTube video player",
    };
  }

  return null;
}

const AutoEmbedPaste = Extension.create({
  name: "autoEmbedPaste",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("auto-embed-paste"),
        props: {
          handlePaste: (_view, event) => {
            const plainText = event.clipboardData?.getData("text/plain") ?? "";
            const htmlText = event.clipboardData?.getData("text/html") ?? "";
            const embedInfo = getEmbedInfoFromText(htmlText) ?? getEmbedInfoFromText(plainText);

            if (!embedInfo) {
              return false;
            }

            event.preventDefault();
            this.editor.chain().focus().setIframe(embedInfo).run();
            return true;
          },
        },
      }),
    ];
  },
});

export function CommunityTiptapEditor({
  value,
  onChange,
  onUploadImage,
  disabled = false,
  isUploading = false,
  onUploadStateChange,
  onError,
}: CommunityTiptapEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const latestExternalValue = useRef(value);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Image.configure({
        allowBase64: false,
        inline: false,
      }),
      ImageResize,
      Iframe,
      AutoEmbedPaste,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlockLowlight.configure({ lowlight }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    editable: !disabled,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "community-editor-content rich-html-content min-h-[520px] max-w-none rounded-b-lg bg-gray-50 p-4 text-sm outline-none dark:bg-[#1f232b]",
      },
    },
    onUpdate: ({ editor }) => {
      const nextHtml = editor.getHTML();
      latestExternalValue.current = nextHtml;
      onChange(nextHtml);
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [disabled, editor]);

  useEffect(() => {
    if (!editor || value === latestExternalValue.current || value === editor.getHTML()) {
      return;
    }

    latestExternalValue.current = value;
    editor.commands.setContent(value, { emitUpdate: false });
  }, [editor, value]);

  const insertUploadedImages = useCallback(
    async (files: File[]) => {
      if (!editor || disabled) {
        return;
      }

      const images = files.filter((file) => file.type.startsWith("image/"));
      if (!images.length) {
        return;
      }

      onUploadStateChange?.(true);
      try {
        for (const file of images) {
          const imageUrl = await onUploadImage(file);
          editor.chain().focus().setImage({ src: imageUrl }).run();
        }
      } catch {
        onError?.("이미지 업로드에 실패했습니다.");
      } finally {
        onUploadStateChange?.(false);
      }
    },
    [disabled, editor, onError, onUploadImage, onUploadStateChange],
  );

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    await insertUploadedImages(Array.from(event.target.files ?? []));
    event.target.value = "";
  };

  const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
    const hasImage = Array.from(event.dataTransfer.files).some((file) =>
      file.type.startsWith("image/"),
    );

    if (!hasImage) {
      return;
    }

    event.preventDefault();
    await insertUploadedImages(Array.from(event.dataTransfer.files));
  };

  if (!isMounted || !editor) {
    return (
      <div className="min-h-[580px] animate-pulse rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-[#1f232b]" />
    );
  }

  return (
    <div
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-[#252932]"
      onDrop={handleDrop}
    >
      <CommunityEditorToolbar
        editor={editor}
        disabled={disabled}
        isUploading={isUploading}
        onImageClick={() => fileInputRef.current?.click()}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="sr-only"
      />
      <EditorContent editor={editor} />
    </div>
  );
}

function CommunityEditorToolbar({
  editor,
  disabled,
  isUploading,
  onImageClick,
}: {
  editor: Editor;
  disabled: boolean;
  isUploading: boolean;
  onImageClick: () => void;
}) {
  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("링크 URL", previousUrl ?? "https://");

    if (url === null) {
      return;
    }

    if (!url.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  const insertEmbed = () => {
    const input = window.prompt("CHZZK/YouTube 주소 또는 iframe HTML");
    const embedInfo = input ? getEmbedInfoFromText(input) : null;

    if (!embedInfo) {
      return;
    }

    editor.chain().focus().setIframe(embedInfo).run();
  };

  const controls = [
    { label: "문단", icon: Pilcrow, active: editor.isActive("paragraph"), action: () => editor.chain().focus().setParagraph().run() },
    { label: "제목 2", icon: Heading2, active: editor.isActive("heading", { level: 2 }), action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: "제목 3", icon: Heading3, active: editor.isActive("heading", { level: 3 }), action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { label: "굵게", icon: Bold, active: editor.isActive("bold"), action: () => editor.chain().focus().toggleBold().run() },
    { label: "기울임", icon: Italic, active: editor.isActive("italic"), action: () => editor.chain().focus().toggleItalic().run() },
    { label: "밑줄", icon: UnderlineIcon, active: editor.isActive("underline"), action: () => editor.chain().focus().toggleUnderline().run() },
    { label: "강조", icon: Highlighter, active: editor.isActive("highlight"), action: () => editor.chain().focus().toggleHighlight({ color: "#fde68a" }).run() },
    { label: "글머리", icon: List, active: editor.isActive("bulletList"), action: () => editor.chain().focus().toggleBulletList().run() },
    { label: "번호", icon: ListOrdered, active: editor.isActive("orderedList"), action: () => editor.chain().focus().toggleOrderedList().run() },
    { label: "인용", icon: Quote, active: editor.isActive("blockquote"), action: () => editor.chain().focus().toggleBlockquote().run() },
    { label: "코드", icon: Code, active: editor.isActive("codeBlock"), action: () => editor.chain().focus().toggleCodeBlock().run() },
    { label: "왼쪽", icon: AlignLeft, active: editor.isActive({ textAlign: "left" }), action: () => editor.chain().focus().setTextAlign("left").run() },
    { label: "가운데", icon: AlignCenter, active: editor.isActive({ textAlign: "center" }), action: () => editor.chain().focus().setTextAlign("center").run() },
    { label: "오른쪽", icon: AlignRight, active: editor.isActive({ textAlign: "right" }), action: () => editor.chain().focus().setTextAlign("right").run() },
  ];

  return (
    <div className="border-b border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-[#252932]">
      <div className="flex flex-wrap gap-1.5">
        <IconButton label="실행 취소" disabled={disabled || !editor.can().undo()} onClick={() => editor.chain().focus().undo().run()} icon={Undo2} />
        <IconButton label="다시 실행" disabled={disabled || !editor.can().redo()} onClick={() => editor.chain().focus().redo().run()} icon={Redo2} />
        <ToolbarDivider />
        {controls.map((control) => (
          <IconButton
            key={control.label}
            label={control.label}
            icon={control.icon}
            active={control.active}
            disabled={disabled}
            onClick={control.action}
          />
        ))}
        <ToolbarDivider />
        <IconButton label="링크" disabled={disabled} active={editor.isActive("link")} onClick={setLink} icon={LinkIcon} />
        <IconButton label="영상" disabled={disabled} active={editor.isActive("iframe")} onClick={insertEmbed} icon={Video} />
        <IconButton label={isUploading ? "이미지 업로드 중" : "이미지"} disabled={disabled || isUploading} onClick={onImageClick} icon={ImagePlus} />
        <IconButton label="표" disabled={disabled} active={editor.isActive("table")} onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} icon={TableIcon} />
        <IconButton label="표 삭제" disabled={disabled || !editor.isActive("table")} onClick={() => editor.chain().focus().deleteTable().run()} icon={Trash2} />
      </div>
      <TableTools editor={editor} disabled={disabled || !editor.isActive("table")} />
    </div>
  );
}

function TableTools({ editor, disabled }: { editor: Editor; disabled: boolean }) {
  const tools = [
    { label: "행 위", action: () => editor.chain().focus().addRowBefore().run() },
    { label: "행 아래", action: () => editor.chain().focus().addRowAfter().run() },
    { label: "행 삭제", action: () => editor.chain().focus().deleteRow().run() },
    { label: "열 왼쪽", action: () => editor.chain().focus().addColumnBefore().run() },
    { label: "열 오른쪽", action: () => editor.chain().focus().addColumnAfter().run() },
    { label: "열 삭제", action: () => editor.chain().focus().deleteColumn().run() },
  ];

  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {tools.map((tool) => (
        <button
          key={tool.label}
          type="button"
          disabled={disabled}
          onClick={tool.action}
          className="h-8 rounded-md border border-gray-200 px-2.5 text-xs font-bold text-gray-600 hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-300"
        >
          {tool.label}
        </button>
      ))}
    </div>
  );
}

function IconButton({
  label,
  icon: Icon,
  onClick,
  active = false,
  disabled = false,
}: {
  label: string;
  icon: ComponentType<{ className?: string }>;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-md border text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "border-orange-500 bg-orange-500 text-white"
          : "border-gray-200 bg-gray-50 text-gray-700 hover:border-orange-300 hover:text-orange-600 dark:border-gray-700 dark:bg-[#1f232b] dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-300"
      }`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function ToolbarDivider() {
  return <div className="mx-1 h-9 w-px bg-gray-200 dark:bg-gray-700" />;
}
