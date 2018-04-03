import React from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

class ChatsPublic extends React.Component {
	componentDidMount() {
		this.props.getPublicSessions();
	}

	render() {
		const {publicSessions} = this.props;
		return (<div>
			<List>
				{
					publicSessions.map((s, index) => {
						return (
							<ListItem
								key={index}
								primaryText={s.sessionName}
								leftAvatar={<Avatar src={`/api/getFile?id=${s.message.avatar}`} />}
								rightIcon={<CommunicationChatBubble />}
							/>);
					})
				}
			</List>
		</div>);
	}
}

export default ChatsPublic;
