import { h, Component } from 'preact';

export class Box extends Component {
  render() {
    return (
      <div style={{marginBottom:'10px'}}>
        <div style={{background:'#90d504',padding:'10px',color:'#fff'}}>
          <b>{this.props.title}</b>
        </div>
        <div style={{border:'1px solid #ccc',padding:'10px'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}