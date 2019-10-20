//  Import CSS.
import './styles/style.scss';

import classnames from 'classnames';

const { RichText } = wp.editor;

const save = props => {
	const { className, attributes } = props;

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
	return (
		<div className={ mainClasses } style={ mainStyles } aria-expanded="false">
			{ mediaURL && (
				<div
					className={ imageClasses }
					style={ {
						backgroundImage: `url(${ mediaURL })`,
						textAlign: contentAlign,
					} }
					data-src={ mediaURL }
				/>
			) }
			{ ! RichText.isEmpty( heading ) && (
				<RichText.Content
					tagName="h4"
					className="ahg-card__title"
					style={ { color: headingColor, textAlign: contentAlign } }
					value={ heading }
				/>
			) }
			{ ! RichText.isEmpty( tagline ) && (
				<RichText.Content
					tagName="p"
					className="ahg-card__tagline"
					style={ { color: taglineColor, textAlign: contentAlign } }
					value={ tagline }
				/>
			) }
			<div
				className="ahg-card__less-des"
				style={ { color: desColor, textAlign: contentAlign } }
			>
				{ ! RichText.isEmpty( des ) && <RichText.Content value={ des } /> }
			</div>
			<div
				className="ahg-card__more-des"
				style={ { color: desColor, textAlign: contentAlign, display: 'none' } }
			>
				{ ! RichText.isEmpty( moreDes ) && (
					<RichText.Content value={ fullDescription } />
				) }
			</div>
			{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
			<a
				className="ahg-card__toggle"
				href="#"
				style={ { textAlign: contentAlign } }
			>
				<div style={ { textAlign: contentAlign } }>
					<RichText.Content
						className="ahg-card__more-toggle-des"
						tagName="span"
						value={ moreLabel }
					/>
				</div>
				<RichText.Content
					className="ahg-card__less-toggle-des"
					tagName="span"
					value={ lessLabel }
					style={ { display: 'none', textAlign: contentAlign } }
				/>
			</a>
		</div>
	);
};

export default save;
