import React, { Component } from 'react';
import './Game.css';
import PlayerSubmissionForm from './PlayerSubmissionForm';
import FinalPoem from './FinalPoem';
import RecentSubmission from './RecentSubmission';

class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      submissions: [],
      recentSubmission: '',
      final: false,
    };
  }

  onSubmission = (line) => {
    this.setState({ recentSubmission: line });
    this.setState({ submissions: [...this.state.submissions, line] });
  }
  
  view = () => {
    let recent = null;
    
    if (this.state.submissions.length > 0) {
      recent = <RecentSubmission line={this.state.recentSubmission}/>
    }
    
    if (this.state.final) {
      return <FinalPoem lines={this.state.submissions}/>
    } else {
      return (
        <React.Fragment>
          { recent }
          <PlayerSubmissionForm
            playerNumber={this.state.submissions.length + 1}
            onSubmit={this.onSubmission}
            fields={FIELDS}
          />
          <div className="FinalPoem__reveal-btn-container">
            <input
              type="button"
              value="We are finished: Reveal the Poem"
              className="FinalPoem__reveal-btn"
              onClick={() => this.setState({ final: true })}
            />
          </div>
        </React.Fragment>
      );
    }
  }
  
  render() {
    const exampleFormat = FIELDS.map((field) => {
      if (field.key) {
        return field.placeholder;
      } else {
        return field;
      }
    }).join(" ");

    return (
      <div className="Game">
        <h2>Game</h2>

        <p>Each player should take turns filling out and submitting the form below. Each turn should be done individually and <em>in secret!</em> Take inspiration from the revealed recent submission. When all players are finished, click the final button on the bottom to reveal the entire poem.</p>

        <p>Please follow the following format for your poetry submission:</p>
        <p className="Game__format-example">
          { exampleFormat }
        </p>
        { this.view() }        

      </div>
    );
  }
}

const FIELDS = [
  "The",
  {
    key: 'adj1',
    placeholder: 'adjective',
  },
  {
    key: 'noun1',
    placeholder: 'noun',
  },
  {
    key: 'adv',
    placeholder: 'adverb',
  },
  {
    key: 'verb',
    placeholder: 'verb',
  },
  "the",
  {
    key: 'adj2',
    placeholder: 'adjective',
  },
  {
    key: 'noun2',
    placeholder: 'noun',
  },
  ".",
];

export default Game;
