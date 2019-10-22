/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BaseControl, Button } from '@wordpress/components';
import { withInstanceId, withState } from '@wordpress/compose';
import './editor.scss';
/**
 * External dependencies
 */
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { omit } from 'lodash';
import IconSearchPopover from '../icon-search-popover';

/**
 * Check whether the string value is a valid icon.
 *
 * @param {string} value The string value to check.
 *
 * @return {boolean} True if the value is a valid icon.
 */
export const isValidIconValue = value => {
	const iconArray = getIconArray( value );
	if ( ! iconArray ) {
		return false;
	}

	const prefix = value.match( /^\w*/ )[ 0 ];
	if ( ! [ 'fab', 'far', 'fas' ].includes( prefix ) ) {
		return false;
	}

	const icons = {
		fab, far, fas,
	};
	const matches = Object.values( icons[ prefix ] ).filter( icon => icon.iconName === iconArray[ 1 ] );
	return matches.length > 0;
};

export const getIconArray = value => {
	if ( typeof value !== 'string' ) {
		return null;
	}
	if ( ! value.match( /\w*-/ ) ) {
		return null;
	}
	return [
		value.match( /\w*/ ), // Prefix.
		// value.match( /\w*/ )[ 0 ], // Prefix.
		value.match( /\w+-(.*)$/ )[ 1 ], // Icon name.
	];
};

const IconControl = withInstanceId( withState( {
	openPopover: false,
	clickedOnButton: false,
} )( props => {
	const {
		instanceId,
		openPopover,
		clickedOnButton,
		setState,
	} = props;
	console.log('what value?',props.value);
	const selectedIcon = getIconArray( props.value );
	const isValidIcon = isValidIconValue( props.value );

	return (
		<BaseControl
			className={ `ahg-icon-control ahg-icon-control-${ instanceId }` }
			{ ...omit( props, [ 'onChange', 'value' ] ) }
		>
			<div className="ahg-icon-control__wrapper">
				<div className="ahg-icon-control__button-wrapper">
					<Button
						// className="ahg-icon-control__button components-button is-button is-default"
						isDefault
						className="ahg-icon-control__icon-button"
						onClick={ () => {
							if ( ! clickedOnButton ) {
								setState( { openPopover: true } );
							} else {
								// If the popup closed because this button was clicked (while the popup was open) ensure the popup is closed.
								// This is needed or else the popup will always open when spam clicking the button.
								setState( {
									openPopover: false,
									clickedOnButton: false,
								} );
							}
						} }
					>
						{ isValidIcon && <FontAwesomeIcon icon={ selectedIcon } /> }
						{ ! isValidIcon && <FontAwesomeIcon icon={ [ 'far', 'smile' ] } style={ { opacity: 0.3 } } /> }
					</Button>
					{ openPopover &&
						<IconSearchPopover
							onClickOutside={ event => {
								// This statement checks whether the close was triggered by clicking on the button that opens this.
								// This is needed or else the popup will always open when spam clicking the button.
								if ( event.target ) {
									if ( event.target.closest( `.ahg-icon-control-${ instanceId }` ) ) {
										setState( { clickedOnButton: true } );
										return;
									}
								}
								setState( {
									openPopover: false,
									clickedOnButton: false,
								} );
							} }
							onClose={ () => setState( { openPopover: false } ) }
							onChange={ props.onChange }
						/>
					}
				</div>
				<Button
					onClick={ () => {
						props.onChange( '' );
						props.onClose();
					} }
					isSmall
					isDefault
					className="components-range-control__reset"
				>
					{ __( 'Reset' ) }
				</Button>
			</div>
		</BaseControl>
	);
} ) );

IconControl.defaultProps = {
	label: __( 'Icon' ),
	value: '',
	onChange: () => {},
	onClose: () => {},
};

export default IconControl;
