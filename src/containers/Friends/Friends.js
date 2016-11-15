import React, {Component, PropTypes} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {connect} from 'react-redux';

import {UI_SCROLL_UPDATE_HEIGHT} from '../../constants/ui';
import {FRIENDS_FETCH_COUNT} from '../../constants/friends';

import {usersFetchFriends} from '../../actions/users';

import ScrollableFetchable from '../../components/ScrollableFetchable/ScrollableFetchable';
import EssencesList from '../../components/EssencesList/EssencesList';

class Albums extends Component {
	static propTypes = {
		users: PropTypes.object.isRequired,
		items: PropTypes.array,
		fetching: PropTypes.bool,
		error: PropTypes.number,
		offset: PropTypes.number,
		count: PropTypes.number,
		userId: PropTypes.number.isRequired,
		fetch: PropTypes.func.isRequired
	};

	render() {
		return (
			<ScrollableFetchable fetch={this.fetch} updateHeight={UI_SCROLL_UPDATE_HEIGHT} >
				{this.props.items ? <EssencesList
					userId={this.props.userId}
					essences={this.getEssences()}
					pageSize={FRIENDS_FETCH_COUNT}
					getItemProps={this.getItemProps}
				/> : <div></div>}
			</ScrollableFetchable>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return shallowCompare(this, nextProps, nextState);
	}

	componentDidUpdate(oldProps) {
		if (this.props.userId !== oldProps.userId) {
			this.fetch(true);
		}
	}

	getEssences() {
		if (!this.props.items) {
			return [];
		}

		return this.props.items.map(id => this.props.users[id]);
	}

	fetch = isOnInitialize => {
		if (this.props.fetching || (this.props.count && this.props.offset >= this.props.count)) {
			return;
		}

		this.props.fetch({
			offset: isOnInitialize ? 0 : this.props.offset,
			count: FRIENDS_FETCH_COUNT,
			userId: this.props.userId
		});
	};

	getItemProps = (key, item) => {
		const id = item.id;

		return {
			key,
			name: `${item.first_name} ${item.last_name}`,
			photo: item.photo_100,
			url: `/${id}`,
			links: [{
				to: `/${id}/friends`,
				blank: false,
				name: 'Друзья'
			}, {
				to: `/${id}/albums`,
				blank: false,
				name: 'Альбомы'
			}, {
				to: `//vk.com/id${id}`,
				blank: true,
				name: 'Профиль в VK'
			}]
		};
	}
}

const mapStateToProps = ({users, entities}, ownProps) => {
	const userId = Number(ownProps.params.userId);
	const entityId = `${userId}-friends`;

	return ({
		users: users,
		...entities[entityId],
		userId: userId
	});
};

const mapDispatchToProps = dispatch => ({
	fetch: params => dispatch(usersFetchFriends(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
