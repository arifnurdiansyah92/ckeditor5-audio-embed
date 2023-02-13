import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import HtmlEmbed from '@ckeditor/ckeditor5-html-embed/src/htmlembed';
import HtmlEmbedEditing from '@ckeditor/ckeditor5-html-embed/src/htmlembedediting';

export default class AudioEmbed extends Plugin {
	static get requires() {
		return [HtmlEmbed, HtmlEmbedEditing];
	}

	static get pluginName() {
		return 'AudioEmbed';
	}

	init() {
		this.editor.commands.add('insertLink', {
			execute: (url) => {
				// Check if the URL is valid and ends with an audio file extension
				const audioExtensions = ['mp3', 'wav', 'ogg'];
				const regex = new RegExp(
					`(${audioExtensions.join('|')})$`,
					'i'
				);
				if (!url || !regex.test(url)) {
					// If the URL is not valid, display an error message
					const errorMessage = 'Invalid audio URL';
					alert(errorMessage)
					return;
				}

				const headerHtml = `<audio controls>
				<source src="${url}">
				Your browser does not support the audio element.
			  </audio>`;

				this.editor.execute('htmlEmbed', headerHtml);
			},
		});
		// Create a button component for the "insertLink" command
		this.editor.ui.componentFactory.add('insertLink', () => {
			const view = new ButtonView();
			view.set({
				label: 'Insert Link',
				icon: `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M15 23l-9.309-6h-5.691v-10h5.691l9.309-6v22zm-9-15.009v8.018l8 5.157v-18.332l-8 5.157zm14.228-4.219c2.327 1.989 3.772 4.942 3.772 8.229 0 3.288-1.445 6.241-3.77 8.229l-.708-.708c2.136-1.791 3.478-4.501 3.478-7.522s-1.342-5.731-3.478-7.522l.706-.706zm-2.929 2.929c1.521 1.257 2.476 3.167 2.476 5.299 0 2.132-.955 4.042-2.476 5.299l-.706-.706c1.331-1.063 2.182-2.729 2.182-4.591 0-1.863-.851-3.529-2.184-4.593l.708-.708zm-12.299 1.299h-4v8h4v-8z"/></svg>`,
				tooltip: true,
			});
			view.on('execute', () => {
				const text = prompt('Enter Audio Link:');
				this.editor.execute('insertLink', text);
			});
			return view;
		});

		// Add the "insertLink" button to the toolbar
		this.editor.ui.componentFactory.add('audioEmbed', () => {
			const dropdown = this.editor.ui.view.toolbar.element;
			const button = this.editor.ui.componentFactory.create('insertLink');
			dropdown.append(button.render());
			return button;
		});
	}
}
