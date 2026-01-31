import { inlineCanvasRenderer } from 'canvasutil/InlineCanvasRenderer';
import {Plugin, MarkdownPostProcessorContext} from 'obsidian';
import {DEFAULT_SETTINGS, settings_t, LiviUtilsSettingsTab} from 'settings';

export default class LiviUtilsPlugin extends Plugin {
  settings: settings_t;

  async onload() {
    await this.loadSettings();
    await this.initRibbon();

    this.addSettingTab(new LiviUtilsSettingsTab(this.app, this));

    this.registerMarkdownCodeBlockProcessor(
      "inline-canvas",
      async (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
        let sourceFile = source;

        if (sourceFile == ctx.sourcePath) {
          el.appendText("Cannot recursively render self");
          return;
        }

        let dest = this.app.metadataCache.getFirstLinkpathDest(
          sourceFile, ctx.sourcePath
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
        console.log(dest);
        console.log(leaf);
        // leaf.view.containerEl.remove();

        leaf.view.containerEl.classList.add("livi-utils-file-embed");
        el.appendChild(leaf.view.containerEl);
      }
    );
  }

  onunload() {

  }

  async initRibbon() {

  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData() as Partial<settings_t>);
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
