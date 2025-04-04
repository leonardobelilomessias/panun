"use client";
import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import CodeBlock from "@tiptap/extension-code-block";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import History from "@tiptap/extension-history";
import { ToolBar } from "./ToolBAr";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps): JSX.Element {
  // Em vez de usar StarterKit, vamos registrar cada extensão individualmente
  const editor = useEditor({
    extensions: [
      // Extensões essenciais
      Document,
      Paragraph,
      Text,
      History,
      
      // Formatação básica
      Bold,
      Italic,
      Strike,
      
      // Importante: Heading separado
      Heading.configure({
        HTMLAttributes: {
          class: 'rich-text',
        },
        levels: [1, 2, 3],
      }),
      
      // Alinhamento
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      
      // Outras extensões
      Highlight,
      CodeBlock,
      BulletList,
      OrderedList,
      ListItem,
      
      // Imagem
      Image.configure({
        allowBase64: true,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Debugging
  useEffect(() => {
    if (editor) {
      console.log("Editor inicializado com sucesso!", content);
      console.log("Extensões disponíveis:", editor.extensionManager.extensions.map(ext => ext.name));
    }
  }, [editor]);

  return (
    <div >
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}