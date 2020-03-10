import React, {Component, Fragment} from "react";

const TextNinjaHOC = (WrappedComponent)=>{
    class TextNinjaPreferences extends Component{
        state ={
            muted: true,
            chapterToSyllables: true,
            markWord: true,
            markLine: true,
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


        render() {
            return(
                <Fragment>
                    <WrappedComponent
                        {...this.props}
                        fontSize = {this.state.fontSize}
                    />
                </Fragment>
            )
        }
    }
};

export default TextNinjaHOC;