import { message } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import React from 'react';

const MessageContext = React.createContext<MessageInstance>({} as MessageInstance);

interface Props {
	children: React.ReactNode;
}

export const MessageProvider: React.FC<Props> = ({ children }) => {
	const [messageApi, contextHolder] = message.useMessage();

	return (
		<MessageContext.Provider value={messageApi}>
			{contextHolder}
			{children}
		</MessageContext.Provider>
	);
};

export const useMessage = () => React.useContext(MessageContext);
