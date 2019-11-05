//  Import CSS.
import './styles/style.scss';

import classnames from 'classnames';

const { RichText } = wp.editor;

const save = props => {
	const { className, attributes } = props;

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

	return (
		<div className={ mainClasses } style={ mainStyles } aria-expanded="false">
			{ ! RichText.isEmpty( heading ) && (
				<RichText.Content
					tagName="h4"
					className="ahg-info-card__title"
					style={ { color: headingColor, textAlign: contentAlign } }
					value={ heading }
				/>
			) }
			<div className="ahg-info-card__des" style={ { color: desColor } }>
				{ ! RichText.isEmpty( des ) && <RichText.Content value={ des } /> }
			</div>
			<div>
				<a href={ buttonURL } className="ahg-info-card__url">
					{ ! RichText.isEmpty( buttonText ) && (
						<RichText.Content
							tagName="span"
							className="ahg-info-card__url-text"
							style={ { color: buttonTextColor } }
							value={ buttonText }
						/>
					) }
				</a>
			</div>
		</div>
	);
};

export default save;
