//  Import CSS.
import './styles/editor.scss';

import classnames from 'classnames';
import { DesignPanelBody } from '../../components';

const {
	InspectorControls,
	InnerBlocks,
} = wp.editor;

const { Fragment } = wp.element;
const { __ } = wp.i18n; // Import __() from wp.i18n
const { RangeControl } = wp.components;

const edit = props => {
	const { isSelected, className, setAttributes, attributes } = props;

	const { columnNumber } = attributes;

	const mainClasses = classnames( [ className, 'ahg-info-card-set' ] );

	return (
		<Fragment>
			<InspectorControls>
				<DesignPanelBody>
					<RangeControl
						label={ __( 'Number of Columns' ) }
						value={ columnNumber }
						onChange={ number => setAttributes( { columnNumber: number } ) }
						min={ 1 }
						max={ 4 }
					/>
				</DesignPanelBody>
			</InspectorControls>
			<div className={ mainClasses }>
				{ isSelected ? (
					<div className="cardset-selected">
						<h4>Info Card Set</h4>
						<InnerBlocks
							allowedBlocks={ [ 'cgb/info-card-ahg' ] }
						/>
					</div>
				) : (
					<div className="cardset-static">
						<h4>Info Card Set</h4>
						<InnerBlocks
							allowedBlocks={ [ 'cgb/info-card-ahg' ] }
						/>
					</div>
				) }
			</div>
		</Fragment>
	);
};

export default edit;
