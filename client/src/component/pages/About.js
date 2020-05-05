import React from 'react';
import TextNinjaTool from '../textNinja tool';
import {Container, Grid} from "@material-ui/core";
import Tools from '../textNinja tool/tools'

function About( ){
    return (
        <Container maxWidth='xl'>
        <Grid container className={'content'}>
            <h3 className='title'>About Us</h3>
            <Grid item className='inner-content'>
                <TextNinjaTool
                    outputClassName={'inner-content'}
                >
                    The TextNinja app was built in order to help children’s to Improv their reading abilities in an efficient and convenient way. The main features are:
                        *ul
                        *li Automatic row and word highlighting, this feature help Prevents skipping lines and words, making it easier to read. */li
                        *li Automatic word parsing by. */li
                        *li text-to-speech - On a click of a button, you can hear a recording of the word. */li
                        *li The users can login locally or via Facebook / Google authentication, track their own progress and practice the words they have difficulty with. */li
                        *li Simple & easy to use - the app is simple and easy to use, the UI is built with Material design for a better UX. */li
                        */ul
                </TextNinjaTool>

            </Grid>
            <Grid item className='wrap-settings'>
                <Tools
                    settingsOptions = {{
                        fontSizeOption: true,
                        syllablesOption: true,
                        markWordOption: true,
                        markLineOption: true,
                    }}
                    volumeOption={true}
                />
            </Grid>
        </Grid>
        </Container>
    );
}

export default About;