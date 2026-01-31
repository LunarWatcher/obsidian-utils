import LiviUtilsPlugin from "main";
import { App, MarkdownPostProcessorContext } from "obsidian";

export default class EmbedCodeBlockProcessor {
  app: App;
  constructor(app: App, plugin: LiviUtilsPlugin) {
    this.app = app
    plugin.registerMarkdownCodeBlockProcessor(
      "inline-canvas",
      this.processCodeBlock.bind(this)
    );
  }

  async processCodeBlock(
    source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext
  ) {

    if (source == ctx.sourcePath) {
      el.appendText("Cannot recursively render self");
      return;
    }

    let dest = this.app.metadataCache.getFirstLinkpathDest(
      source, ctx.sourcePath
    );
    if (!dest) {
      el.appendText("File not found");
      return;
    }
    let leaf = this.app.workspace.getLeaf(true);
    leaf.detach();
    await leaf.openFile(
      dest,
    );
    // console.log(dest);
    // console.log(leaf);
    // leaf.view.containerEl.remove();

    leaf.view.containerEl.classList.add("livi-utils-file-embed");
    el.appendChild(leaf.view.containerEl);
  }
};
