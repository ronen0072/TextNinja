import React, {Component, Fragment} from "react";

const TextNinjaHOC = (WrappedComponent)=>{
    return class TextNinjaHOC extends Component{
        state ={
            muted: true
        };
        componentDidMount() {
            document.getElementById('sound').muted  = (sessionStorage.sound === 'true');
            this.setState({
                ...this.state,
                muted: (sessionStorage.sound === 'true'),
            });
        }

        mutedFun = ()=>{
            console.log('muted: ',sessionStorage.sound);
            console.log('state.muted: ',this.state.muted);
            sessionStorage.setItem('sound', !this.state.muted);
            document.getElementById('sound').muted = !this.state.muted;
            this.setState({
                ...this.state,
                muted: !this.state.muted
            });
        };

        playFun = (src)=>{
            console.log('play muted: ',document.getElementById('sound').muted);
            console.log('sessionStorage.sound : ',sessionStorage.sound);
            if (this.state.src !== src) {
                this.setState({
                    ...this.state,
                    src: src
                });
            } else {
                if(src && src !== '') {
                    document.getElementById('sound').currentTime = 0;
                    document.getElementById('sound').play();
                }
            }
        };

        //volume = (volume)=>{
        //     setState({
        //         ...state,
        //         volume: volume
        //     });
        //     sessionStorage.setItem('volume', state.muted);
        // };

        render() {
            return(
                <Fragment>
                    <WrappedComponent {...this.props} playFun = {this.playFun} mutedFun = {this.mutedFun}/>
                    <audio
                        id="sound"
                        src = {this.state.src}
                        autoPlay>
                        Your browser does not support the <code>audio</code> element.
                    </audio>
                </Fragment>
            )
        }
    }
};

export default TextNinjaHOC;