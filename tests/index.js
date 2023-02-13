import { AudioEmbed as AudioEmbedDll, icons } from '../src';
import AudioEmbed from '../src/audioembed';

import ckeditor from './../theme/icons/ckeditor.svg';

describe( 'CKEditor5 AudioEmbed DLL', () => {
	it( 'exports AudioEmbed', () => {
		expect( AudioEmbedDll ).to.equal( AudioEmbed );
	} );

	describe( 'icons', () => {
		it( 'exports the "ckeditor" icon', () => {
			expect( icons.ckeditor ).to.equal( ckeditor );
		} );
	} );
} );
