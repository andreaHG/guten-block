//  Import CSS.
import './styles/style.scss';

const {
	InnerBlocks,
} = wp.editor;

const save = props => {
	const { attributes } = props;
	const { columnNumber } = attributes;

	return (
		<div className={ 'interactive-cardset' + ' columns-' + columnNumber }>
			<InnerBlocks.Content />
		</div>
	);
};

export default save;
