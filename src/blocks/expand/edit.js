//  Import CSS.
import './styles/editor.scss';

import classnames from 'classnames';
import { ImageUploadPlaceholder, DesignPanelBody } from '../../components';

const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	RichText,
} = wp.editor;

const { Fragment } = wp.element;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { RangeControl, SelectControl } = wp.components;

const edit = props => {
	const { isSelected, className, setAttributes, attributes } = props;

	const {
		heading,
		tagline,
		des,
		moreDes,
		fullDescription,
		moreLabel,
		lessLabel,
		mediaID,
		mediaURL,
		headingColor,
		taglineColor,
		desColor,
		design = 'basic',
		shapes,
		contentAlign,
		backgroundColor,
		borderRadius = 12,
		shadow = 3,
	} = attributes;

	const mainClasses = classnames( [ className, 'ahg-card' ], {
		[ `ahg--shadow-${ shadow }` ]: shadow !== 3,
	} );

	const mainStyles = {
		borderRadius:
            design !== 'plain' && borderRadius !== 12 ? borderRadius : undefined,
		backgroundColor: design !== 'plain' ? backgroundColor : undefined,
	};

	const imageClasses = classnames( [
		'ahg-card__image-container',
		`ahg-card--image-${ shapes }`,
	] );

	const shape = [
		{ value: 'square', label: __( 'Square' ) },
		{ value: 'circle', label: __( 'Circle' ) },
	];

	const onChangeAlignment = newAlignment => {
		setAttributes( {
			contentAlign: newAlignment === undefined ? 'none' : newAlignment,
		} );
	};

	const onChangeMoreDes = text => {
		setAttributes( { moreDes: text, fullDescription: `${ des } ${ text }` } );
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
					<SelectControl
						label={ __( 'Image Shape' ) }
						value={ shapes }
						options={ shape.map( ( { value, label } ) => ( {
							value: value,
							label: label,
						} ) ) }
						onChange={ newShape => {
							setAttributes( { shapes: newShape } );
						} }
					/>
				</DesignPanelBody>
				<PanelColorSettings
					title={ __( 'Title Colors' ) }
					colorSettings={ [
						{
							value: headingColor,
							onChange: colorValue =>
								setAttributes( { headingColor: colorValue } ),
							label: __( 'Heading Color' ),
						},
						{
							value: taglineColor,
							onChange: colorValue =>
								setAttributes( { taglineColor: colorValue } ),
							label: __( 'Tagline Color' ),
						},
						{
							value: desColor,
							onChange: colorValue => setAttributes( { desColor: colorValue } ),
							label: __( 'Description Color' ),
						},
					] }
				/>
			</InspectorControls>
			<div className={ mainClasses } style={ mainStyles } aria-expanded="false">
				{ isSelected ? (
					<Fragment>
						<ImageUploadPlaceholder
							className={ imageClasses }
							imageID={ mediaID }
							imageURL={ mediaURL }
							onRemove={ () => setAttributes( { mediaURL: '', mediaID: '' } ) }
							onChange={ ( { url, id } ) =>
								setAttributes( { mediaURL: url, mediaID: id } )
							}
						/>
						<RichText
							tagName="h4"
							placeholder={ __( 'Title' ) }
							className="ahg-card__title"
							onChange={ text => setAttributes( { heading: text } ) }
							style={ {
								color: headingColor,
								textAlign: contentAlign,
							} }
							value={ heading }
							keepPlaceholderOnFocus
						/>
						<RichText
							tagName="p"
							value={ tagline }
							className="ahg-card__tagline"
							onChange={ text => setAttributes( { tagline: text } ) }
							style={ {
								color: taglineColor,
								textAlign: contentAlign,
							} }
							placeholder={ __( 'Subtitle for this block' ) }
							keepPlaceholderOnFocus
						/>
						<RichText
							value={ des }
							className="ahg-card__less-des"
							onChange={ text => setAttributes( { des: text } ) }
							formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
							style={ {
								color: desColor,
								textAlign: contentAlign,
							} }
							placeholder={ __(
								'Short description that can be expanded to show more details or links.'
							) }
							keepPlaceholderOnFocus
						/>
						<a>
							<RichText
								tagName="div"
								value={ moreLabel }
								onChange={ text => setAttributes( { moreLabel: text } ) }
								formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
								className="ahg-expand__more-toggle-des"
								style={ { textAlign: contentAlign } }
								placeholder={ __( 'View more button' ) }
								keepPlaceholderOnFocus
							/>
						</a>
						<RichText
							value={ moreDes }
							onChange={ onChangeMoreDes }
							style={ {
								color: desColor,
								textAlign: contentAlign,
							} }
							className="ahg-expand__more-des"
							placeholder={ __(
								'Longer description that will be expanded and show more details or links.'
							) }
							keepPlaceholderOnFocus
						/>
						<a>
							<RichText
								tagName="div"
								value={ lessLabel }
								onChange={ text => setAttributes( { lessLabel: text } ) }
								formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
								className="ahg-expand__less-toggle-text"
								style={ { textAlign: contentAlign } }
								placeholder={ __( 'View less button' ) }
								keepPlaceholderOnFocus
							/>
						</a>
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
