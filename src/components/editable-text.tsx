import React, { useState, useEffect, useRef } from 'react';
import { Input, Space, InputRef, Typography } from 'antd';
import { CheckOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';
import { TextAreaRef } from 'antd/es/input/TextArea';

interface Props {
	value: string;
	save: (value: string) => Promise<boolean>;
	textArea?: boolean;
	fontSize?: string;
	fontWeight?: string;
}

interface WrapperProps {
	fontSize: string;
	fontWeight: string;
}

const TextWrapper = styled.div<WrapperProps>`
	border-radius: 8px;
	padding: 8px;
	transition: 100ms ease-in-out;

	> div > div > span {
		box-sizing: border-box;
		font-size: ${({ fontSize }) => fontSize};
		font-weight: ${({ fontWeight }) => fontWeight};
		white-space: pre;
	}

	&:hover {
		background: var(--bg-editable-text);
	}
`;

const InputWrapper = styled.div<WrapperProps>`
	display: flex;
	align-items: center;
	gap: 10px;
	font-size: ${({ fontSize }) => fontSize};

	> input,
	> textarea {
		flex: 1;
		// 8px - 1 for outline
		padding: 7px;
		box-sizing: border-box;
		font-size: 1em;
		font-weight: ${({ fontWeight }) => fontWeight};
	}

	> div {
		> span {
			padding: 8px;
			font-size: 0.8em;

			background: var(--bg-editable-text);
			border-radius: 4px;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: 100ms ease-in-out;

			&:hover {
				cursor: pointer;
				box-shadow: 2px 2px 16px rgba(0, 0, 0, 0.1);
				transform: scale(1.1);
			}
		}
	}
`;

export const EditableText: React.FC<Props> = ({
	value,
	save,
	textArea = false,
	fontSize = '16px',
	fontWeight = '400',
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [text, setText] = useState(value);
	const [loading, setLoading] = useState(false);

	const inputRef = useRef<InputRef | null>(null);
	const textAreaRef = useRef<TextAreaRef | null>(null);
	useEffect(() => {
		if (!isEditing) {
			return;
		}

		if (inputRef.current) {
			inputRef.current.focus();
		} else if (textAreaRef.current) {
			textAreaRef.current.focus();
			textAreaRef.current.resizableTextArea?.textArea.setSelectionRange(text.length, text.length);
		}
	}, [isEditing]);

	const startEditing = () => {
		if (loading) {
			return;
		}

		setIsEditing(true);
		setText(value);
	};

	const _save = async (e: React.MouseEvent) => {
		e.stopPropagation();

		if (loading) {
			return;
		}

		setLoading(true);
		const success = await save(text);
		setLoading(false);

		if (success) {
			setIsEditing(false);
		}
	};

	// const handleBlur = async (e: React.FocusEvent) => {
	// 	await new Promise((resolve) => setTimeout(resolve, 100));
	// 	console.log(e.relatedTarget);

	// 	if (e.relatedTarget?.classList.contains('action')) {
	// 		return;
	// 	}

	// 	cancel();
	// };

	const cancel = () => {
		if (loading) {
			return;
		}

		setIsEditing(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			cancel();
		}
	};

	const wrapperProps: WrapperProps = {
		fontSize,
		fontWeight,
	};

	if (isEditing) {
		return (
			<InputWrapper {...wrapperProps}>
				{textArea ? (
					<Input.TextArea
						ref={textAreaRef}
						value={text}
						onChange={(e) => setText(e.target.value)}
						onKeyDown={handleKeyDown}
						autoSize
						// onBlur={handleBlur}
					/>
				) : (
					<Input
						ref={inputRef}
						value={text}
						onChange={(e) => setText(e.target.value)}
						onKeyDown={handleKeyDown}
						// onBlur={handleBlur}
					/>
				)}
				<div className="action" onClick={_save}>
					<Typography.Text>{loading ? <LoadingOutlined /> : <CheckOutlined />}</Typography.Text>
				</div>
				<div className="action" onClick={cancel}>
					<Typography.Text>
						<CloseOutlined />
					</Typography.Text>
				</div>
			</InputWrapper>
		);
	}

	return (
		<TextWrapper {...wrapperProps} onClick={startEditing}>
			<Space>
				<Typography.Text>{value}</Typography.Text>
			</Space>
		</TextWrapper>
	);
};
