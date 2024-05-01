import { useState, useEffect } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $insertNodes } from "lexical";

interface Props {
  initialHtml?: string;
  onHtmlChanged: (html: string) => void;
  isEdit?: boolean;
}

const HtmlPlugin = ({ initialHtml, onHtmlChanged, isEdit }: Props) => {
  const [editor] = useLexicalComposerContext();

  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    console.log('initialHtml', initialHtml)
    console.log('isFirstRender', isFirstRender)
    if (!initialHtml || !isFirstRender) return;

    if(isEdit && !initialHtml) {
      setIsFirstRender(true);
    } else if(isEdit && initialHtml) {
      setIsFirstRender(false);
    } else {
      setIsFirstRender(false);
    }


    editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(initialHtml, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      $insertNodes(nodes);
    });
  }, [initialHtml]);

  return (
    <OnChangePlugin
      onChange={(editorState) => {
        editorState.read(() => {
          onHtmlChanged($generateHtmlFromNodes(editor));
        });
      }}
    />
  );
};

export default HtmlPlugin;
