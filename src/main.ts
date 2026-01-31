import {Plugin} from 'obsidian';
import {DEFAULT_SETTINGS, settings_t, LiviUtilsSettingsTab} from 'settings';

export default class LiviUtilsPlugin extends Plugin {
  settings: settings_t;

  async onload() {
    await this.loadSettings();
    await this.initRibbon();

    this.addSettingTab(new LiviUtilsSettingsTab(this.app, this));
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
