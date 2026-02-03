import LiviUtilsPlugin from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

// Suppress: settings are a placeholder and eslint is being fucking stupid
export interface settings_t { // eslint-disable-line @typescript-eslint/no-empty-object-type
}

export const DEFAULT_SETTINGS: settings_t = {
}


export class LiviUtilsSettingsTab extends PluginSettingTab {
  plugin: LiviUtilsPlugin;

  constructor(app: App, plugin: LiviUtilsPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const {containerEl} = this;

    containerEl.empty();

    new Setting(containerEl).setName("Meta").setHeading();
    containerEl.createEl("p", {
      text: "Running into issues? Open an issue on "
    }).createEl("a", {
      text: "GitHub.",
      href: "https://github.com/LunarWatcher/obsidian-utils"
    });
    containerEl.createEl("p", {
      text: "Trans rights are human rights 🏳️‍⚧️ 🏳️‍🌈"
    })
  }
}
