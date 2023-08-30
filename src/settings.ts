import MyPlugin from 'main';
import { App, PluginSettingTab, Setting } from 'obsidian';

export interface IPluginSettings {
	scriptFolder: string;
}

export const DEFAULT_PLUGIN_SETTINGS: IPluginSettings = {
	scriptFolder: '',
};

export class ButtonPluginSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
	}

	display() {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Script Folder')
			.setDesc('Location of scripts to be called by buttons')
			.addText((text) =>
				text
					.setPlaceholder('Your script folder here')
					.setValue(this.plugin.settings.scriptFolder)
					.onChange(async (value) => {
						this.plugin.settings.scriptFolder = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
