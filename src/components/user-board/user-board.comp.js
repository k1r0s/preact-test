import { h, Component } from 'preact';
import style from './user-board.comp.css';
import board from '../../services/Board.repo';
import mdl from 'material-design-lite/material';
import { ListItem, Button, Icon, TextField } from 'preact-mdl';
import timeAgo from '../../utils/timeAgo'
const boardInstance = board();

function CommentItem({ edit, data, canEdit }) {

	const toLocaleTime = (timestamp) => {
		const t = new Date(timestamp).toLocaleTimeString().split(":");
		t.pop();
		return t.join(":");
	}

	const getImagePath = (female) => {
		return !female ? 'assets/profile_male_0.jpg' : 'assets/profile_female_0.jpg';
	}

	return (
		<div class={style.commentItem}>
			<div image-container>
				<img src={getImagePath(data.author.female)}/>
			</div>
			<div content>
				<p>{data.author.name}</p>
				<div comment-item-content>{data.content}</div>
				{canEdit && <Button onClick={edit.bind(null, data)}><Icon icon="edit" /></Button>}
			</div>
			<div comment-date>
				<span>{toLocaleTime(data.timestamp)}</span>
			</div>
		</div>
	)
}

function NewComment({ cancel, isEdit, change, text, submit }) {
	return (
		<div class={style.commentForm} new-comment>
			<TextField
				id="newCommentText"
				placeholder="Type a comment.. "
				onChange={change}
				value={text}
				type="text"
			/>
			<Button onClick={submit}><Icon primary>{isEdit ? "create" : "send"}</Icon></Button>
			{isEdit && <Button onClick={cancel.bind(null, null)}><Icon primary>cancel</Icon></Button>}
		</div>
	)
}

export default class UserBoard extends Component {

	static isLessThan5Min = (comment) => comment.timestamp + 300000 > Date.now();
	static sortComments = (a, b) => b.timestamp - a.timestamp;

	state = {
		newCommentText: "",
		comments: [],
		edit: false
 	}

	componentDidMount = () => {
		boardInstance.readComments(this.props.session.id).then(comments => {
			this.setState(state => {
				state.comments = comments;
				return state;
			});
		})
	}

	handleSubmitChange = event => {
		const key = event.target.getAttribute("id");
		const value = event.target.value;

		this.setState(function (old) {
			old[key] = value;
			return old;
		});
	}

	checkPermission = (comment) => {
		return comment.author.id === this.props.session.id && UserBoard.isLessThan5Min(comment)
	}

	handleCommentEdition = ({ data }) => {
		this.setState((old) => {
			old.newCommentText = "";
			data.author = this.props.session;

			if(old.edit) {
				old.comments = old.comments.map((comment) => {
					if(comment.id === data.id) {
						comment.content = data.content;
					}
					return comment;
				})
				old.edit = false
			} else {
				old.comments.push(data);
			}
			return old;
		});
	}

	handleSubmit = (comment) => {
		if (this.state.edit) {
			boardInstance.updateComment(comment, this.state.newCommentText)
			.then(this.handleCommentEdition)
		} else {
			boardInstance.createComment(this.props.session.id, this.state.newCommentText)
			.then(this.handleCommentEdition)
		}
	}

	setEditMode = (comment) => {
		if(!comment) {
			return this.setState((old) => {
				old.newCommentText = "";
				old.edit = false;
				return old;
			})
		}

		if(!UserBoard.isLessThan5Min(comment)) {
			alert("You cannot edit comments older than 5 min")
			return this.forceUpdate();
		}

		this.handleSubmit = this.handleSubmit.bind(this, comment);
		this.setState((old) => {
			old.newCommentText = comment.content;
			old.edit = true;
			return old;
		})
	}

	render() {
		return (
			<div class={style.def} user-board>
				<div board-header class="soft-wrap">
					<span session-name>{this.props.session.name}</span>
					<span session-status>ONLINE</span>
					<span update-btn onClick={this.componentDidMount}><Icon white icon="refresh"></Icon></span>
				</div>
				<div class="soft-wrap">
					<p comment-list-outline>{new Date().toDateString()}</p>
					{this.state.comments.sort(UserBoard.sortComments).map((comment) => (
						<CommentItem
							edit={this.setEditMode}
							data={comment}
							canEdit={this.checkPermission(comment)}
						/>
					))}
					<NewComment
						isEdit={this.state.edit}
						cancel={this.setEditMode}
						change={this.handleSubmitChange}
						text={this.state.newCommentText}
						submit={this.handleSubmit}
					/>
				</div>
			</div>
		);
	}
}
