import React, { Component } from "react";
import Header from "./components/Header";
import Note from "./components/Note";

class App extends Component {
	state = { currentNote: "", currentNoteIndex: null, notes: [] };

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const savedNotes = window.localStorage.getItem("notes");

		if (savedNotes) {
			this.setState({ notes: JSON.parse(savedNotes) });
		}
	}

	componentDidUpdate() {
		window.localStorage.setItem("notes", JSON.stringify(this.state.notes));
		this.noteInput.focus();
	}

	currentNoteChanged = e => {
		this.setState({ currentNote: e.target.value });
	};

	deleteNote = index => {
		let notes = [...this.state.notes];
		notes = notes.filter((n, i) => index !== i);
		this.setState({ notes, currentNote: "" });
	};

	editNote = index => {
		const notes = [...this.state.notes];
		const note = notes.filter((n, i) => index === i)[0];
		this.setState({ currentNote: note, currentNoteIndex: index });
	};

	moveNote = (index, direction) => {
		const notes = [...this.state.notes];
		let newIndex = Math.min(Math.max(index + direction, 0), notes.length - 1);
		const note = notes.splice(index, 1);
		notes.splice(newIndex, 0, note);
		this.setState({ currentNote: "", currentNoteIndex: null, notes });
	};

	saveNote = () => {
		let notes = [...this.state.notes];
		const index = this.state.currentNoteIndex;

		if (index === null) {
			notes.push(this.state.currentNote);
		} else {
			notes[index] = this.state.currentNote;
		}
		this.setState({ notes, currentNote: "", currentNoteIndex: null });
	};

	renderNotes() {
		return this.state.notes.map((n, index) => (
			<Note
				deleteNote={this.deleteNote}
				editNote={this.editNote}
				index={index}
				key={index}
				moveNote={this.moveNote}
				note={n}
			/>
		));
	}

	render() {
		const buttonText = this.state.currentNoteIndex === null ? "Add" : "Save";
		const InputField = (
			<div className="input-group mb-3">
				<input
					aria-describedby="basic-addon2"
					aria-label="New note"
					className="form-control"
					onChange={this.currentNoteChanged}
					placeholder="New note"
					ref={input => {
						this.noteInput = input;
					}}
					type="text"
					value={this.state.currentNote}
				/>
				<div className="input-group-append">
					<button
						className="btn btn-outline-secondary"
						type="button"
						onClick={this.saveNote}
					>
						{buttonText}
					</button>
				</div>
			</div>
		);

		return (
			<div>
				<Header />
				<div className="row">
					<div className="col">{InputField}</div>
				</div>
				{this.renderNotes()}
			</div>
		);
	}
}

export default App;
