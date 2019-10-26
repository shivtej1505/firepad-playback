import React from 'react';
import { render } from 'react-dom';
import { Editor } from '../../src/index';

const App = () => (
    <Editor apiKey={'AIzaSyCyPMAYoKPcPcPoofpweeXgakiUFOSE6ao'} databaseURL={'https://firepad-playback.firebaseio.com/'} slug={'demo'}/>
);

render(<App />, document.getElementById("root"));