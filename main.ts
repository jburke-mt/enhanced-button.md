import { Plugin } from 'obsidian';
import { buttonCodeBlock, buttonCodeBlockProcessor } from 'src/button';
import { ButtonPluginSettingTab, DEFAULT_PLUGIN_SETTINGS, IPluginSettings } from 'src/settings';

export default class MyPlugin extends Plugin {
	settings: IPluginSettings;

	async onload(): Promise<void> {
		await this.loadSettings();

		this.addSettingTab(new ButtonPluginSettingTab(this.app, this));

		this.registerMarkdownCodeBlockProcessor(buttonCodeBlock, buttonCodeBlockProcessor);
	}

	onunload(): void {}

	async loadSettings(): Promise<void> {
		this.settings = Object.assign({}, DEFAULT_PLUGIN_SETTINGS, await this.loadData());
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}
}
