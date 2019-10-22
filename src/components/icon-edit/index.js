import classnames from 'classnames';
import SvgIcon from '../SVGIcon';
import './style.scss';

const IconEdit = props => {
	const {
		className = '',
		align = 'center',
		size = 'large',
		color,
		icon = null,
	} = props;

	const style = {
		color: color,
	};

	const mainClasses = classnames(
		[
			className,
			'ahg-cardicon',
			`ahg-cardicon--align-${ align }`,
			`ahg-cardicon--size-${ size }`,
		],
		{
			'ahg-cardicon--has-icon': icon,
		}
	);

	return (
		<div className={ mainClasses } style={ style }>
			{ icon && (
				<SvgIcon
					value={ icon }
					style={ {
						color: color,
					} }
				/>
			) }
		</div>
	);
};

IconEdit.Content = props => {
	const {
		className = '',
		align = 'center',
		size = 'large',
		icon = null,
		color,
	} = props;

	const style = {
		color: color,
	};

	const mainClasses = classnames(
		[
			className,
			'ahg-cardicon',
			`ahg-cardicon--align-${ align }`,
			`ahg-cardicon--size-${ size }`,
		],
		{
			'ahg-cardicon--has-icon': icon,
		}
	);

	return (
		<div className={ mainClasses } style={ style }>
			{ icon && (
				<SvgIcon.Content
					value={ icon }
					style={ {
						color: color,
					} }
				/>
			) }
		</div>
	);
};

export default IconEdit;
