import React, { Component } from "react";

class Note extends Component {
	state = { index: null };

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.setState({ index: this.props.index });
	}

	render() {
		const UpButton = (
			<button
				className="btn"
				onClick={() => {
					this.props.moveNote(this.props.index, -1);
				}}
			>
				<i className="fas fa-arrow-circle-up" />
			</button>
		);

		const DownButton = (
			<button
				className="btn"
				onClick={() => {
					this.props.moveNote(this.props.index, 1);
				}}
			>
				<i className="fas fa-arrow-circle-down" />
			</button>
		);

		const EditButton = (
			<button
				className="btn"
				onClick={() => {
					this.props.editNote(this.props.index);
				}}
			>
				<i className="fas fa-edit" />
			</button>
		);

		const TrashButton = (
			<button
				className="btn"
				onClick={() => {
					this.props.deleteNote(this.props.index);
				}}
			>
				<i className="fas fa-trash-alt" />
			</button>
		);

		return (
			<div className="row border-top border-bottom mb-1">
				<div className="h100 	col">
					<span className="align-bottom">{this.props.note}</span>
				</div>
				<div className="col text-right">
					{UpButton}
					{DownButton}
					{EditButton}
					{TrashButton}
				</div>
			</div>
		);
	}
}

export default Note;
