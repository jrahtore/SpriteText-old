/**
 * @module SpriteTextGui.
 * @description Adds SpriteText settings folder into {@link https://github.com/anhr/dat.gui|dat.gui}.
 * @see {@link https://github.com/anhr/SpriteText|SpriteText}
 *
 * @author Andrej Hristoliubov. {@link https://anhr.github.io/AboutMe/|AboutMe}
 *
 * @copyright 2011 Data Arts Team, Google Creative Lab
 *
 * @license under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
*/

//import * as THREE from 'https://threejs.org/build/three.module.js';
//import * as THREE from '../../three.js/dev/build/three.module.js';//https://github.com/anhr/three.js;
//import { THREE } from '../../commonNodeJS/master/three.js';//https://github.com/anhr/commonNodeJS
//import * as THREE from 'https://raw.githack.com/anhr/three.js/dev/build/three.module.js';

import { dat } from '../../commonNodeJS/master/dat/dat.module.js';//https://github.com/anhr/commonNodeJS
//import { dat } from 'https://raw.githack.com/anhr/commonNodeJS/master/dat/dat.module.js';

import { ScaleControllers } from '../../commonNodeJS/master/ScaleController.js';//https://github.com/anhr/commonNodeJS
//import { ScaleControllers } from 'https://raw.githack.com/anhr/commonNodeJS/master/ScaleController.js';

import Cookie from '../../commonNodeJS/master/cookieNodeJS/cookie.js';//https://github.com/anhr/commonNodeJS/tree/master/cookieNodeJS
//import Cookie from 'https://raw.githack.com/anhr/commonNodeJS/master/cookieNodeJS/cookie.js';

//import { SpriteText } from './SpriteText.js';
//import { SpriteText } from 'https://raw.githack.com/anhr/SpriteText/master/SpriteText.js';

/**
 * Adds SpriteText settings folder into dat.gui.
 * @param {SpriteText} SpriteText A sprite based text component module.
 * @param {GUI} gui see {@link https://github.com/anhr/dat.gui|dat.gui} for details
 * @param {THREE.Group|THREE.Scene|THREE.Sprite} group group or scene of SpriteText and of all child groups of SpriteText for which these settings will have an effect.
 * Or Sprite returned from {@link https://raw.githack.com/anhr/SpriteText/master/jsdoc/module-SpriteText..html|new SpriteText(...)}.
 * @param {object} [guiParams] Followed parameters is allowed. Default is no parameters
 * @param {Function} [guiParams.getLanguageCode] Your custom getLanguageCode() function.
 * <pre>
 * returns the "primary language" subtag of the language version of the browser.
 * Examples: "en" - English language, "ru" Russian.
 * See the {@link https://tools.ietf.org/html/rfc4646#section-2.1|rfc4646 2.1 Syntax} for details.
 * Default returns the 'en' is English language.
 * You can import { getLanguageCode } from '../../commonNodeJS/master/lang.js';
 * </pre>
 * @param {object} [guiParams.lang] Object with localized language values
 * @example Using of guiParams.lang:
guiParams = {

	getLanguageCode: function() { return 'az'; },
	lang: { textHeight: 'm??tn boyu', languageCode: 'az' },

}
 * @param {GUI} [guiParams.parentFolder] parent folder, returned by {@link https://github.com/dataarts/dat.gui/blob/master/API.md#GUI+addFolder|gui.addFolder(name)}
 * @param {string} [guiParams.options] See SpriteText options. Default is group.userData.optionsSpriteText or no options
 * @param {string} [guiParams.spriteFolder] sprite folder name. Default is lang.spriteText
 * @param {Cookie} [guiParams.cookie] Your custom cookie function for saving and loading of the SpriteText settings. Default cookie is not saving settings.
 * @param {string} [guiParams.cookieName] Name of the cookie. Default is guiParams.spriteFolder.
 * @returns {GUI} sprite folder
 * @example Using of the SpriteTextGui:
 *
<script>

	import * as THREE from 'https://threejs.org/build/three.module.js';
	//import * as THREE from '../../three.js/dev/build/three.module.js';
	//import * as THREE from 'https://raw.githack.com/anhr/three.js/dev/build/three.module.js';

	import { dat } from 'https://raw.githack.com/anhr/commonNodeJS/master/dat/dat.module.js';
	//import { dat } from '../../commonNodeJS/master/dat.module.js';

	import { SpriteText } from 'https://raw.githack.com/anhr/SpriteText/master/SpriteText.js';
	//import { SpriteText } from '../SpriteText.js';

	import { SpriteTextGui } from 'https://raw.githack.com/anhr/SpriteText/master/SpriteTextGui.js';
	//import { SpriteTextGui } from '../SpriteTextGui.js';

	SpriteText.setTHREE( THREE );

	// create scene etc
	...

	scene.add( new SpriteText( 'Default SpriteText' ) );
	var gui = new dat.GUI();

	//Settings for all SpriteText added to scene and child groups
	SpriteTextGui( gui, scene, {

		getLanguageCode: getLanguageCode,
		settings: { zoomMultiplier: 1.5, },
		options: {

			textHeight: 0.1,
			sizeAttenuation: false,

		}

	} );

</script>
*
 */
export function SpriteTextGui( SpriteText, gui, group, guiParams ) {

	const THREE = SpriteText.getTHREE();

	guiParams = guiParams || {};
	const options = guiParams.options || group.userData.optionsSpriteText || {};
	if ( THREE.Color.NAMES[options.fontColor] ) {

		const color = new THREE.Color( options.fontColor );
		options.fontColor = 'rgba(' + color.r * 255 + ',' + color.g * 255 + ',' + color.b * 255 + ',1)'

	}
	const optionsDefault = JSON.parse( JSON.stringify( options ) );
	Object.freeze( optionsDefault );

	//Localization

	const lang = {

		spriteText: 'Sprite Text',
		spriteTextTitle: 'Settings for text that always faces towards the camera.',

		text: 'Text',
		textTitle: 'The text to be displayed on the sprite.',

		textHeight: 'Height',
		textHeightTitle: 'Text Height.',

		fontFace: 'Font Face',

		fontFaces: 'Font Faces',
		fontFaceTitle: 'Choose text font.',

		bold: 'Bold',

		italic: 'Italic',

		rotation: 'Rotation',
		rotationTitle: 'Sprite rotation',

		fontProperties: 'Font Properties',
		fontPropertiesTitle: 'Other font properties. The font property uses the same syntax as the CSS font property.',

		fontStyle: 'Font Style',
		fontStyleTitle: 'Text style being used when drawing text. Read only.',

		displayRect: 'Border',
		displayRectTitle: 'Display a border around the text.',
		borderColor: 'Border Color',
		backgroundColor: 'Background Color',
		borderRadius: 'Border Radius',
		borderThickness: 'Border Thickness',

		fontColor: 'Font Color',

		anchor: 'Anchor',
		anchorTitle: 'The text anchor point.',

		sizeAttenuation: 'Size Attenuation',
		sizeAttenuationTitle: 'Whether the size of the sprite is attenuated by the camera depth. (Perspective camera only.)',

		defaultButton: 'Default',
		defaultTitle: 'Restore default Sprite Text settings.',

	};

	const _languageCode = guiParams.getLanguageCode === undefined ? 'en'//Default language is English
		: guiParams.getLanguageCode();
	switch ( _languageCode ) {

		case 'ru'://Russian language

			lang.spriteText = '?????????????????? ????????????';//'Sprite Text'
			lang.spriteTextTitle = '?????????????????? ?????? ????????????, ?????????????? ???????????? ?????????????? ?? ????????????.';

			lang.text = '??????????';
			lang.textTitle = '??????????, ?????????????? ?????????? ?????????????????? ?? ??????????????.';

			lang.textHeight = '????????????';
			lang.textHeightTitle = '???????????? ????????????.';

			lang.fontFace = '?????? ????????????';

			lang.fontFaces = '?????????? ??????????????';
			lang.fontFaceTitle = '???????????????? ???????????? ????????????.';

			lang.bold = '????????????';

			lang.italic = '??????????????????';

			lang.rotation = '????????????????';
			lang.rotationTitle = '???????????????? ???????????????????? ??????????????';

			lang.fontProperties = '??????????????????????????';
			lang.fontPropertiesTitle = '???????????????????????????? ???????????????? ????????????. ???????????????? ???????????? ???????????????????? ?????? ???? ??????????????????, ?????? ?? ???????????????? ???????????? CSS.';

			lang.fontStyle = '?????????? ????????????';
			lang.fontStyleTitle = '?????????? ????????????, ???????????????????????? ?????? ?????????????????? ????????????. ???? ??????????????????????????.';

			lang.displayRect = '??????????';
			lang.displayRectTitle = '???????????????????? ?????????? ???????????? ????????????.';
			lang.borderColor = '???????? ??????????';
			lang.backgroundColor = '???????? ????????';
			lang.borderRadius = '???????????????????? ??????????';
			lang.borderThickness = '?????????????? ??????????';

			lang.fontColor = '???????? ????????????';

			lang.anchor = '??????????';
			lang.anchorTitle = '?????????? ???????????????? ????????????.';

			lang.sizeAttenuation = '????????????';
			lang.sizeAttenuationTitle = '?????????? ???? ???????????? ?????????????? ???????????????? ???? ???????????????????? ???? ????????????. (???????????? ?????????????????????????? ????????????.)';

			lang.defaultButton = '????????????????????????';
			lang.defaultTitle = '???????????????????????? ?????????????????? ???????????????????? ?????????????? ???? ??????????????????.';
			break;
		default://Custom language
			if ( ( guiParams.lang === undefined ) || ( guiParams.lang.languageCode != _languageCode ) )
				break;

			Object.keys( guiParams.lang ).forEach( function ( key ) {

				if ( lang[key] === undefined )
					return;
				lang[key] = guiParams.lang[key];

			} );

	}

	guiParams.spriteFolder = guiParams.spriteFolder || lang.spriteText;
	const cookieName = guiParams.cookieName || guiParams.spriteFolder,
		cookie = guiParams.cookie || new Cookie.defaultCookie(),
		optionsGroup = options.group;
	cookie.getObject( cookieName, options, options );
	options.group = optionsGroup;
	if ( group instanceof THREE.Sprite !== true ) {

		if ( group.userData.optionsSpriteText === undefined )
			group.userData.optionsSpriteText = options;
		else if ( guiParams.options !== undefined ) console.warn( 'SpriteTextGui: duplicate group.userData.optionsSpriteText' );

	}

	//updateSpriteText function is repeatedly called during restore settings to default values.
	//See fSpriteText.userData.restore() function for details.
	//I have set to false before restoring and set to true again and called function once after restoring for resolving of problem.
	var boUpdateSpriteText = true;
	function updateSpriteText( noSave ) {

		if ( !boUpdateSpriteText )
			return;
		SpriteText.updateSpriteTextGroup( group );
		if ( group.userData.update )
			group.userData.update();// options );

		if ( controllerFont !== undefined )
			controllerFont.setValue( options.font );

		if ( !noSave )
			cookie.setObject( cookieName, options );

	}

	if ( !guiParams.hasOwnProperty( 'parentFolder' ) )
		guiParams.parentFolder = gui;

	//Sprite folder
	const fSpriteText = guiParams.parentFolder.addFolder( guiParams.spriteFolder );
	dat.folderNameAndTitle( fSpriteText, guiParams.spriteFolder, lang.spriteTextTitle );

	//Sprite text height
	const textHeight = 'textHeight';
	if ( options.hasOwnProperty( textHeight ) && ( options[textHeight] !== undefined ) ) {

		ScaleControllers( fSpriteText, options, textHeight, function () { updateSpriteText(); }, {

			text: lang.textHeight, textTitle: lang.textHeightTitle,
			getLanguageCode: guiParams.getLanguageCode,
			settings: guiParams.settings,

		} );

	}

	//font  face
	if ( options.fontFace !== undefined ) {

		dat.controllerNameAndTitle(
			fSpriteText.add( options, 'fontFace' ).onChange( function ( value ) {

				updateSpriteText();

			} ), lang.fontFace );

	}

	//font faces
	if ( options.fontFaces !== undefined ) {

		dat.controllerNameAndTitle(
			fSpriteText.add( options, 'fontFace', options.fontFaces ).onChange( function ( value ) {

				updateSpriteText();

			} ), lang.fontFaces, lang.fontFaceTitle );

	}

	//bold
	if ( options.hasOwnProperty( 'bold' ) ) {

		dat.controllerNameAndTitle(
			fSpriteText.add( options, 'bold' ).onChange( function ( value ) {

				updateSpriteText();

			} ), lang.bold );

	}

	//italic
	if ( options.hasOwnProperty( 'italic' ) ) {

		dat.controllerNameAndTitle(
			fSpriteText.add( options, 'italic' ).onChange( function ( value ) {

				updateSpriteText();

			} ), lang.italic );

	}

	//rotation
	const rotation = 'rotation';
	if ( options.hasOwnProperty( rotation ) ) {

		var min = 0,
			max = Math.PI * 2;
		dat.controllerNameAndTitle(
			fSpriteText.add( options, rotation, min, max, ( max - min ) / 360 ).onChange( function ( value ) {

				updateSpriteText();

			} ), lang.rotation, lang.rotationTitle );

	}

	//font properties
	if ( options.hasOwnProperty( 'fontProperties' ) ) {

		dat.controllerNameAndTitle(
			fSpriteText.add( options, 'fontProperties' ).onChange( function ( value ) {

				updateSpriteText();

			} ), lang.fontProperties, lang.fontPropertiesTitle );

	}

	//font style
	if ( options.hasOwnProperty( 'font' ) ) {

		var controllerFont = fSpriteText.add( options, 'font' );
		controllerFont.__input.readOnly = true;
		dat.controllerNameAndTitle( controllerFont, lang.fontStyle, lang.fontStyleTitle );

	}

	//text rectangle
	if ( options.hasOwnProperty( 'rect' ) ) {

		if ( options.rect.displayRect === undefined ) options.rect.displayRect = false;
		dat.controllerNameAndTitle( fSpriteText.add( options.rect, 'displayRect' ).onChange( function ( value ) {

			updateSpriteText();
			fRect.domElement.style.display = options.rect.displayRect ? 'block' : 'none';

		} ), lang.displayRect, lang.displayRectTitle );
		const fRect = fSpriteText.addFolder( lang.displayRect );//'Border'
		fRect.domElement.style.display = options.rect.displayRect ? 'block' : 'none';

		//border thickness
		const borderThickness = 'borderThickness';
		if ( options.rect.hasOwnProperty( borderThickness ) ) {

			dat.controllerNameAndTitle(
				fRect.add( options.rect, borderThickness, 1, options.rect.borderThickness * 30, 1 ).onChange( function ( value ) {

					updateSpriteText();

				} ), lang.borderThickness );

		}

		//border ??olor
		const borderColor = 'borderColor';
		if ( options.rect.hasOwnProperty( borderColor ) ) {

			dat.controllerNameAndTitle( fRect.addColor( options.rect, borderColor ).onChange( function ( value ) {

				updateSpriteText();

			} ), lang.borderColor );

		}

		//background color
		const backgroundColor = 'backgroundColor';
		if ( options.rect.hasOwnProperty( backgroundColor ) ) {

			dat.controllerNameAndTitle( fRect.addColor( options.rect, backgroundColor ).onChange( function ( value ) {

				updateSpriteText();

			} ), lang.backgroundColor );

		}

		//border radius
		const borderRadius = 'borderRadius';
		if ( options.rect.hasOwnProperty( borderRadius ) ) {

			dat.controllerNameAndTitle(
				fRect.add( options.rect, borderRadius, 0, 100, 1 ).onChange( function ( value ) {

					updateSpriteText();

				} ), lang.borderRadius );

		}

	}

	//font ??olor
	if ( options.hasOwnProperty( 'fontColor' ) ) {

		dat.controllerNameAndTitle( fSpriteText.addColor( options, 'fontColor' ).onChange( function ( value ) {

			updateSpriteText();

		} ), lang.fontColor );

	}

	//anchor. https://threejs.org/docs/index.html#api/en/objects/Sprite.center
	if ( options.hasOwnProperty( 'center' ) ) {

		options.center = SpriteText.getCenter( options.center );

		//anchor folder
		const fAnchor = fSpriteText.addFolder( 'center' );
		dat.folderNameAndTitle( fAnchor, lang.anchor, lang.anchorTitle );

		//anchor x
		fAnchor.add( options.center, 'x', 0, 1, 0.1 ).onChange( function ( value ) {

			updateSpriteText();

		} );

		//anchor y
		fAnchor.add( options.center, 'y', 0, 1, 0.1 ).onChange( function ( value ) {

			updateSpriteText();

		} );

	}

	//size attenuation. Whether the size of the sprite is attenuated by the camera depth. (Perspective camera only.) Default is false.
	//See https://threejs.org/docs/index.html#api/en/materials/SpriteMaterial.sizeAttenuation
	const sizeAttenuation = 'sizeAttenuation';
	if ( options.hasOwnProperty( sizeAttenuation ) && ( options[sizeAttenuation] !== undefined ) ) {

		dat.controllerNameAndTitle( fSpriteText.add( options, sizeAttenuation ).onChange( function ( value ) {

			updateSpriteText();

		} ), lang.sizeAttenuation, lang.sizeAttenuationTitle );

	}

	//default button
	fSpriteText.userData = {
		restore: function ( value ) {

			boUpdateSpriteText = false;
			function setValues( folder, key, optionsDefault ) {

				folder.__controllers.forEach( function ( controller ) {

					if ( controller.property !== key ) {

						if ( typeof optionsDefault[key] !== "object" )
							return;
						Object.keys( optionsDefault[key] ).forEach( function ( optionKey ) {

							if ( controller.property !== optionKey )
								return;
							controller.setValue( optionsDefault[key][optionKey] );

						} );
						return;

					}
					controller.setValue( optionsDefault[key] );

				} );

			}

			Object.keys( optionsDefault ).forEach( function ( key ) {

				setValues( fSpriteText, key, optionsDefault );
				if ( typeof optionsDefault[key] === "object" ) {

					Object.keys( optionsDefault[key] ).forEach( function ( keyObject ) {

						Object.keys( fSpriteText.__folders ).forEach( function ( keyFolder ) {

							setValues( fSpriteText.__folders[keyFolder], keyObject, optionsDefault[key] );

						} );

					} );

				}

				Object.keys( fSpriteText.__folders ).forEach( function ( keyFolder ) {

					if ( keyFolder !== key )
						return;
					Object.keys( optionsDefault[keyFolder] ).forEach( function ( key ) {

						setValues( fSpriteText.__folders[keyFolder], key, optionsDefault[keyFolder] );

					} );

				} );

			} );

			boUpdateSpriteText = true;
			updateSpriteText();

		}
	}
	const defaultParams = { defaultF: fSpriteText.userData.restore, };
	if ( optionsDefault === undefined ) console.error( 'SpriteTextGui: optionsDefault = ' + optionsDefault );
	dat.controllerNameAndTitle( fSpriteText.add( defaultParams, 'defaultF' ), lang.defaultButton, lang.defaultTitle );

	updateSpriteText( true );

	return fSpriteText;

};
