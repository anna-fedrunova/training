let Buttons = React.createClass({
    getInitialState(){
        return{
            isPaused: false
        }
    },
    startTimer(){
        this.props.onTimerStart();
        this.setState({
           isPaused: !this.state.isPaused
        });
    },
    pauseTimer(){
        this.props.onTimerPause();
        this.setState({
            isPaused: !this.state.isPaused
        });
    },
    resetTimer(){
        this.props.onTimerReset();
    },
    render() {
        if (!this.state.isPaused){
            return(
                <div className='btn-container'>
                    <input className="start-btn" type="button" value="Start" onClick={this.startTimer}/>
                    <input className="reset-btn" type="button" value="Reset" onClick={this.resetTimer}/>
                </div>
            );
        } else return (
            <div className='btn-container'>
                <input className="pause-btn" type="button" value="Pause" onClick={this.pauseTimer}/>
                <input className="reset-btn" type="button" value="Reset" onClick={this.resetTimer}/>
            </div>
            );


   }
});
let Timer = React.createClass({
    getInitialState() {
        return {
            seconds: 0,
            mins: 0
        }
    },
    handleStart() {
        this.timer = setInterval(this.tick, 1000)
    },
    handlePause() {
        clearInterval(this.timer)
    },
    handleReset() {
        this.setState({
            seconds: 0,
            mins: 0
        });
    },
    tick(){
        if(this.state.seconds<59){
            this.setState({
                seconds: this.state.seconds + 1
            })
        } else if (this.state.seconds === 59) {
            this.setState({
                seconds: 0,
                mins: this.state.mins + 1
            })
        }

    },
    render() {
        let time;
        if(this.state.seconds === 0 && this.state.mins ===0) {
            time = `00:00`;
        } else if(this.state.seconds<10 && this.state.mins<10){
            time = `0${this.state.mins}:0${this.state.seconds}`;
        } else if (this.state.seconds >= 10 && this.state.mins >= 10) {
            time = `${this.state.mins}:${this.state.seconds}`;
        }else if (this.state.seconds>= 10 && this.state.mins < 10) {
            time = `0${this.state.mins}:${this.state.seconds}`;
        }else if (this.state.seconds < 10 && this.state.mins >=10) {
            time = `${this.state.mins}:0${this.state.seconds}`;
        }
        return (
            <div className="timer-container">
            <h1> {time}</h1>
            <Buttons onTimerStart={this.handleStart}
                     onTimerPause={this.handlePause}
                     onTimerReset={this.handleReset}
            />
            </div>
        );
    },

});
ReactDOM.render(
    <Timer />,
    document.querySelector('#mount-point'));