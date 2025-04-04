"use client";
import React from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  Code,
  Bold,
  Italic,
  Strikethrough,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Highlighter,
  Upload,
  List,
  ListOrdered
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { ToggleButton } from "./ToggleButton";

interface ToolBarProps {
  editor: Editor | null;
}

export function ToolBar({ editor }: ToolBarProps) {
  if (!editor) return null;
  

  // Função para lidar com os headings
  const handleHeading = (level: 1 | 2 | 3) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  return (
    <div className="border rounded-md p-1.5 mb-1 bg-slate-50 space-x-1 sticky top-10 z-50">
      <ToggleButton
        size="sm"
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() => handleHeading(1)}
        variant={editor.isActive("heading", { level: 1 }) ? "outline" : "default"}
      >
        <Heading1 className="size-4" />
      </ToggleButton>
      
      <ToggleButton
        size="sm"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() => handleHeading(2)}
        variant={editor.isActive("heading", { level: 2 }) ? "outline" : "default"}
      >
        <Heading2 className="size-4" />
      </ToggleButton>
      
      <ToggleButton
        size="sm"
        pressed={editor.isActive("heading", { level: 3 })}
        onPressedChange={() => handleHeading(3)}
        variant={editor.isActive("heading", { level: 3 }) ? "outline" : "default"}
      >
        <Heading3 className="size-4" />
      </ToggleButton>
      
      <ToggleButton
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "outline" : "default"}
      >
        <Bold className="size-4" />
      </ToggleButton>
      
      <ToggleButton
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "outline" : "default"}
      >
        <Italic className="size-4" />
      </ToggleButton>
      
      <ToggleButton
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        variant={editor.isActive("strike") ? "outline" : "default"}
      >
        <Strikethrough className="size-4" />
      </ToggleButton>
      
      <ToggleButton
        size="sm"
        pressed={editor.isActive({ textAlign: "left" })}
        onPressedChange={() => editor.chain().focus().setTextAlign("left").run()}
        variant={editor.isActive({ textAlign: "left" }) ? "outline" : "default"}
      >
        <AlignLeft className="size-4" />
      </ToggleButton>
      
      <ToggleButton
        size="sm"
        pressed={editor.isActive({ textAlign: "center" })}
        onPressedChange={() => editor.chain().focus().setTextAlign("center").run()}
        variant={editor.isActive({ textAlign: "center" }) ? "outline" : "default"}
      >
        <AlignCenter className="size-4" />
      </ToggleButton>
      
      <ToggleButton
        size="sm"
        pressed={editor.isActive({ textAlign: "right" })}
        onPressedChange={() => editor.chain().focus().setTextAlign("right").run()}
        variant={editor.isActive({ textAlign: "right" }) ? "outline" : "default"}
      >
        <AlignRight className="size-4" />
      </ToggleButton>
      
      <ToggleButton
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        variant={editor.isActive("bulletList") ? "outline" : "default"}
      >
        <List className="size-4" />
      </ToggleButton>
      
      <ToggleButton
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        variant={editor.isActive("orderedList") ? "outline" : "default"}
      >
        <ListOrdered className="size-4" />
      </ToggleButton>
      
      <ToggleButton
        size="sm"
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
        variant={editor.isActive("codeBlock") ? "outline" : "default"}
      >
        <Code className="size-4" />
      </ToggleButton>
      
      <ToggleButton
        size="sm"
        pressed={editor.isActive("highlight")}
        onPressedChange={() => editor.chain().focus().toggleHighlight().run()}
        variant={editor.isActive("highlight") ? "outline" : "default"}
      >
        <Highlighter className="size-4" />
      </ToggleButton>
      
      <ToggleButton
        size="sm"
        pressed={editor.isActive("image")}
        onPressedChange={() => {
          const url = window.prompt("URL");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        variant={editor.isActive("image") ? "outline" : "default"}
      >
        <Upload className="size-4" />
      </ToggleButton>
    </div>
  );
}