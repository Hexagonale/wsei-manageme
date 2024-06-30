import { styled } from 'styled-components';
import { Header } from '.';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;

	> .content {
		padding: 16px;
		box-sizing: border-box;
		height: 100%;
		overflow-y: auto;
	}
`;

interface Props {
	children: React.ReactNode;
}

export const ViewWithHeader: React.FC<Props> = ({ children }) => {
	return (
		<Wrapper>
			<Header />
			<div className="content">{children}</div>
		</Wrapper>
	);
};
