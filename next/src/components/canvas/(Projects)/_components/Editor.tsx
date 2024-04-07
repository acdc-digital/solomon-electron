// Editor Component
// /Users/matthewsimon/Documents/github/solomon-electron/solomon-electron/next/src/components/canvas/(Projects)/_components/Editor.tsx

'use client';

import {
  BlockNoteEditor,
  PartialBlock
} from "@blocknote/core";
import {
  BlockNoteView, 
  SideMenuController, 
  useCreateBlockNote
} from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/core/style.css";

interface BlockNoteViewProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
};

export const Editor = ({
    onChange,
    initialContent,
    editable,
    }: BlockNoteViewProps) => {

        const editor = useCreateBlockNote({
            editable,
            initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
            useEditorChange: (editor: { topLevelBlocks: any; }) => {
                onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
            },
        })

    return (
        <div className="align-center">
            <BlockNoteView 
            editor={editor}
            formattingToolbar={true}
            sideMenu={true}
            editable={true}
            >
            </BlockNoteView>
        </div>
    )
}