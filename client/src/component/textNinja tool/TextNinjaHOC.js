import React, {Component, Fragment} from "react";

const TextNinjaHOC = (WrappedComponent)=>{
    return class TextNinjaHOC extends Component{
        state ={
            muted: true,
            chapterToSyllables: true,
            markWord: true,
            markLine: true,
        };
        componentDidMount() {
            document.getElementById('sound').muted  = (sessionStorage.sound === 'true');
            this.setState({
                ...this.state,
                muted: sessionStorage.sound? (sessionStorage.sound === 'true') : true,
                chapterToSyllables: sessionStorage.chapterToSyllables? (sessionStorage.chapterToSyllables === 'true') : true,
                markWord: sessionStorage.markWord? (sessionStorage.markWord === 'true') : true,
                markLine: sessionStorage.markLine? (sessionStorage.markLine === 'true') : true,
                fontSize: sessionStorage.fontSize? sessionStorage.fontSize : 16,
            });
        }

        mutedFun = ()=>{
            // console.log('muted: ',sessionStorage.sound);
            // console.log('state.muted: ',this.state.muted);
            sessionStorage.setItem('sound', !this.state.muted);
            document.getElementById('sound').muted = !this.state.muted;
            this.setState({
                ...this.state,
                muted: !this.state.muted
            });
        };

        playFun = (src)=>{
            // console.log('play muted: ',document.getElementById('sound').muted);
            // console.log('sessionStorage.sound : ',sessionStorage.sound);
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

        toggleChapterToSyllables = ()=>{
            console.log('chapterToSyllables: ',sessionStorage.chapterToSyllables);
            console.log('state.chapterToSyllables: ',this.state.chapterToSyllables);
            sessionStorage.setItem('chapterToSyllables', !this.state.chapterToSyllables);
            this.setState({
                ...this.state,
                chapterToSyllables: !this.state.chapterToSyllables
            });
        };
        toggleMarkWord = ()=>{
            console.log('markWord: ',sessionStorage.markWord);
            console.log('state.markWord: ',this.state.markWord);
            sessionStorage.setItem('markWord', !this.state.markWord);
            this.setState({
                ...this.state,
                markWord: !this.state.markWord
            });
        };
        setFontSize = (e)=>{
            console.log('fontSize: ',e.target.value);
            sessionStorage.setItem('fontSize', e.target.value);
            this.setState({
                ...this.state,
                fontSize: e.target.value
            });
        };
        toggleMarkLine = ()=>{
            console.log('markLine: ',sessionStorage.markLine);
            console.log('state.markLine: ',this.state.markLine);
            sessionStorage.setItem('markLine', !this.state.markLine);
            this.setState({
                ...this.state,
                markLine: !this.state.markLine
            });
        };
        markLineEvent = (event, outputBackground)=>{
            let background;
            if(this.state.markLine){
                let lineHeight = parseInt(this.state.fontSize)+4;

                //let  lineShift = window.innerWidth > 960 ? lineHeight + 2 : lineHeight + 2;
                let shift = 0;
                if(!outputBackground) {
                    shift = window.innerWidth > 960 ? 120 - lineHeight : 440 - lineHeight;
                }
                let y = event.clientY - ((event.clientY - (shift - this.state.fontSize)+8) % (lineHeight + 2));// - lineShift;


                // if(outputBackground === '.inner-content') {
                //     shift = 176;
                // }
                // if(outputBackground === '#wikiInfo') {
                //     shift = 184;
                // }
                let backgroundColor = sessionStorage.lineColor;

                background = {
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% '+ lineHeight+'px',
                    backgroundImage: 'radial-gradient('+backgroundColor+' , '+backgroundColor+')',
                    backgroundPosition: '0 ' + ((y -shift)+2) +'px' //
                };
                //console.log('background: ', background);

            }
            return background;
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
                    <WrappedComponent
                        {...this.props}
                        playFun = {this.playFun}
                        mutedFun = {this.mutedFun}
                        toggleChapterToSyllables = {this.toggleChapterToSyllables}
                        chapterToSyllables={this.state.chapterToSyllables}
                        toggleMarkWord = {this.toggleMarkWord}
                        markWord = {this.state.markWord}
                        toggleMarkLine = {this.toggleMarkLine}
                        markLineEvent = {this.markLineEvent}
                        setFontSize = {this.setFontSize}
                        fontSize = {this.state.fontSize}
                    />
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