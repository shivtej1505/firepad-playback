// TODO:
// 1. Enable eslint

import React from 'react';
import { Component } from 'react';
import './styles.css';

// TODO:
// 1. Make a readonly editor
// 2. Attach firebase to it
// 3. Write playback logic

export class Editor extends Component {
    constructor(props) {
        super(props);
        this.apiKey = props.apiKey;
        this.databaseURL = props.databaseURL;
        this.slug = props.slug;
    }

    componentDidMount() {
        let firebaseConfig = {
            apiKey: this.apiKey,
            databaseURL: this.databaseURL
        };
        this.initFirepad(firebaseConfig);
    }

    render() {
        return(
            <textarea id={'editor'} rows="25" name="code"></textarea>
        )
    }

    initAceEditor(config){
        // Create ACE
        let editor = ace.edit("editor");
        editor.setTheme("ace/theme/textmate");

        let editor_config = Object.assign({
            maxLines: 100,
            minLines: 20,
            showLineNumbers: true,
            displayIndentGuides: true,
            enableBasicAutocompletion: true,
            fontSize: "16px",
            fontFamily: "monospace"
        }, (config.aceConfig || {}));
        editor.setOptions(editor_config);
        this.editor = editor;
        this.editor.setReadOnly(true);
        return editor;
    }

    initFirepad(config, options = {}){
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        // Get Firebase Database reference.
        let firepadRef = this.getFirebaseRef(config);
        //this.editor = CodeMirror(document.getElementById('firepad'), { lineWrapping: true });
        this.editor = this.initAceEditor(config);

        // Create Firepad.
        let firepad = Firepad.fromACE(firepadRef, this.editor, options);
        return firepad;
    }

    getFirebaseRef(config){
        let ref = firebase.database().ref();
        let hash = this.slug;
        if(config && config.root_key){
            ref = ref.child(config.root_key);
        }
        ref = ref.child(hash);
        return ref;
    }
}
