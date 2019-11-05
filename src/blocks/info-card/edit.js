//  Import CSS.
import './styles/editor.scss';

import classnames from 'classnames';
import { DesignPanelBody } from '../../components';

const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	RichText,
	URLInput,
} = wp.editor;

const { Fragment } = wp.element;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { RangeControl } = wp.components;

const edit = props => {
	const { isSelected, className, setAttributes, attributes } = props;

	const {
		heading,
		des,
		headingColor,
		desColor,
		buttonURL,
		buttonText,
		buttonTextColor,
		design = 'basic',
		contentAlign,
		backgroundColor,
		borderRadius = 12,
		shadow = 3,
	} = attributes;

	const mainClasses = classnames( [ className, 'ahg-info-card' ], {
		[ `ahg--shadow-${ shadow }` ]: shadow !== 3,
	} );

	const mainStyles = {
		borderRadius:
            design !== 'plain' && borderRadius !== 12 ? borderRadius : undefined,
		backgroundColor: design !== 'plain' ? backgroundColor : undefined,
	};

	const onChangeAlignment = newAlignment => {
		setAttributes( {
			contentAlign: newAlignment === undefined ? 'none' : newAlignment,
		} );
	};

	return (
		<Fragment>
			<BlockControls>
				<AlignmentToolbar value={ contentAlign } onChange={ onChangeAlignment } />
			</BlockControls>
			<InspectorControls>
				<DesignPanelBody>
					<RangeControl
						label={ __( 'Border Radius' ) }
						value={ borderRadius }
						onChange={ borderRadius => setAttributes( { borderRadius } ) }
						min={ 0 }
						max={ 50 }
					/>
					<RangeControl
						label={ __( 'Shadow / Outline' ) }
						value={ shadow }
						onChange={ shadow => setAttributes( { shadow } ) }
						min={ 0 }
						max={ 9 }
					/>

				</DesignPanelBody>
				<PanelColorSettings
					title={ __( 'Card Colors' ) }
					colorSettings={ [
						{
							value: headingColor,
							onChange: colorValue =>
								setAttributes( { headingColor: colorValue } ),
							label: __( 'Heading Color' ),
						},
						{
							value: desColor,
							onChange: colorValue => setAttributes( { desColor: colorValue } ),
							label: __( 'Description Color' ),
						},
						{
							value: buttonTextColor,
							onChange: colorValue => setAttributes( { buttonTextColor: colorValue } ),
							label: __( 'Link Text Color' ),
						},
						{
							value: backgroundColor,
							onChange: colorValue => setAttributes( { backgroundColor: colorValue } ),
							label: __( 'Background Color ' ),
						},
					] }
				/>
			</InspectorControls>
			<div className={ mainClasses } style={ mainStyles } aria-expanded="false">
				{ isSelected ? (
					<Fragment>
						<RichText
							tagName="h4"
							placeholder={ __( 'Title' ) }
							className="ahg-info-card__title"
							onChange={ text => setAttributes( { heading: text } ) }
							style={ {
								color: headingColor,
								textAlign: contentAlign,
							} }
							value={ heading }
							keepPlaceholderOnFocus
						/>
						<RichText
							value={ des }
							className="ahg-info-card__des"
							onChange={ text => setAttributes( { des: text } ) }
							formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
							style={ {
								color: desColor,
							} }
							placeholder={ __(
								'Short description for info card'
							) }
							keepPlaceholderOnFocus
						/>
						<a>
							{
								// Should be tagName="span", but div for now because of issue
								// @see https://github.com/WordPress/gutenberg/issues/7311
							}
							<RichText
								tagName="div"
								className={ 'ahg-info-card__url-text' }
								placeholder={ __( 'Button text' ) }
								value={ buttonText }
								onChange={ text => setAttributes( { buttonText: text } ) }
								formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
								keepPlaceholderOnFocus
								style={ { color: buttonTextColor } }
							/>
						</a>
						<URLInput
							className="ahg-info-card__url"
							value={ buttonURL }
							onChange={ url => setAttributes( { buttonURL: url } ) }
						    autoFocus={ false } // eslint-disable-line
						/>
					</Fragment>
				) : (
					<div className="static-staff-member">
						<p>Title: { heading }</p>
					</div>
				) }
			</div>
		</Fragment>
	);
};

export default edit;
