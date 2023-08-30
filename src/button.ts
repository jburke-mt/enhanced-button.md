import { MarkdownPostProcessorContext } from 'obsidian';

// declare a button with ```enhancedbutton```
export const buttonCodeBlock = 'enhancedbutton';

interface IButtonSettings {
	text: string;
	script: string;
	type: 'button';
}

type IButtonSettingsConstructor = {
	[key: string]: string;
};

class ButtonSettings implements IButtonSettings {
	text: string;
	script: string;
	type: 'button';

	constructor(source: string) {
		// TODO: filter out unknown keys, or should it error
		const lines = source.split('\n').reduce((prev, curr) => {
			const [key, val] = curr.split('=').map((token) => token.trim());
			prev[key] = val;
			return prev;
		}, {} as IButtonSettingsConstructor);
		// TODO: check for required params
		Object.assign(this, lines);
	}
}

export const buttonCodeBlockProcessor = (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
	const settings = new ButtonSettings(source);
	const button = el.createEl('button', { text: settings.text, type: settings.type });

	button.onClickEvent(() => {
		buttonHandler();
	});
};

const buttonHandler = () => {
	// TODO: grab a script
	console.log('button clicked!');
};
