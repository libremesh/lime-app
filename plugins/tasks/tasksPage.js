import { h, Component } from 'preact';

import style from './style';

import { bindActionCreators } from 'redux';
import { connect } from 'preact-redux';

import { getTasks, setTasks } from './tasksActions';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.saveTasks = this.saveTasks.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  componentWillMount() {
    this.props.getTasks();
  }

  saveTasks(tasks) {
    this.props.setTasks(this.state.value);
  }

  render(state) {
    return (
      <div class="container" style={{paddingTop:'100px'}}>
        <h4><span translate="yes">Notes of</span> {this.props.hostname}</h4>
        <textarea onChange={this.handleChange} class='tasks'>{this.props.tasks}</textarea>
        <button translate='yes' onClick={this.saveTasks}>Save notes</button>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    tasks: state.tasks.tasks,
    hostname: state.meta.selectedHost
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTasks : bindActionCreators(getTasks, dispatch),
    setTasks : bindActionCreators(setTasks, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
