import classNames from 'classnames';
import React from 'react';

function menuRenderer ({
	focusedOption,
	instancePrefix,
	labelKey,
	onFocus,
	onSelect,
	onSelectDisabled,
	optionClassName,
	optionComponent,
	optionRenderer,
	options,
	valueArray,
	valueKey,
	onOptionRef
}) {
	let Option = optionComponent;

	let currentGroupId;
	let newGroupStart = false;
	return options.map((option, i) => {
		newGroupStart = option.groupId !== undefined
			&& option.groupId !== currentGroupId
			&& typeof option.groupTitle === 'string';
		currentGroupId = option.groupId;

		let isSelected = valueArray && valueArray.indexOf(option) > -1;
		let isFocused = option === focusedOption;
		let optionClass = classNames(optionClassName, {
			'Select-option': true,
			'is-selected': isSelected,
			'is-focused': isFocused,
			'is-disabled': option.disabled,
			'is-inside-group': currentGroupId !== undefined,
		});

		const body = (
			<Option
				className={optionClass}
				instancePrefix={instancePrefix}
				isDisabled={option.disabled}
				isFocused={isFocused}
				isSelected={isSelected}
				key={`option-${i}-${option[valueKey]}`}
				onFocus={onFocus}
				onSelect={onSelect}
				onSelectDisabled={onSelectDisabled}
				option={option}
				optionIndex={i}
				ref={ref => { onOptionRef(ref, isFocused); }}
			>
				{optionRenderer(option, i)}
			</Option>
		);

		if (newGroupStart) {
			return (
				<div>
					<b className="Select-option-group-label">{option.groupTitle}</b>
					{body}
				</div>
			)
		} else {
			return body;
		}
	});
}

module.exports = menuRenderer;
