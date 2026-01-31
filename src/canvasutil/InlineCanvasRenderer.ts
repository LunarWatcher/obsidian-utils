import {
  ViewUpdate,
  PluginValue,
  EditorView,
  ViewPlugin,
} from '@codemirror/view';

class InlineCanvasRenderer implements PluginValue {
  view: EditorView;

  constructor(view: EditorView) {
    this.view = view;
  }

  update(update: ViewUpdate) {
    // ...
  }

  destroy() {
    // ...
  }
}

export const inlineCanvasRenderer = ViewPlugin.fromClass(InlineCanvasRenderer);
