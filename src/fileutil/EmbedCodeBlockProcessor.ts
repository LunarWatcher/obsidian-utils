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
    let dest = this.app.metadataCache.getFirstLinkpathDest(
      source, ctx.sourcePath
    );

    if (!dest) {
      let elem = createEl("p");
      elem.innerText = `Error: File not found: ${source}`;
      elem.classList += "callout";
      elem.setAttribute("data-callout", "error")
      el.appendChild(elem);
      return;
    }

    if (ctx.sourcePath == dest.path) {
      let elem = createEl("p");
      elem.innerText = `Cannot recursively include self`;
      elem.classList += "callout";
      elem.setAttribute("data-callout", "error")
      el.appendChild(elem);
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
