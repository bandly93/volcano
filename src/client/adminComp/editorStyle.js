import React,{Component} from 'react';

// Custom overrides for "code" style.
export const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

export function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}
// Media
const styles = {
    media: {
        width:'100%',
        whiteSpace:'initial'
    }
}
const Audio = (props) => {
    return <audio controls src={props.src} style={styles.media} />;
};

const Image = (props) => {
    return <img src={props.src} style={styles.media} />;
};

const Video = (props) => {
    return <video controls src={props.src} style={styles.media} />;
};
const YouTube = (props) => {
    return(
        <iframe width="560" height="315" 
            src={props.src} 
            frameBorder="0" gesture="media" allow="encrypted-media" 
            allowFullScreen>
        </iframe>
    )
}
const Media = (props) => {
    const entity = props.contentState.getEntity(
      props.block.getEntityAt(0)
);
const {src} = entity.getData();
const type = entity.getType();

let media;
    if (type === 'audio') {
      media = <Audio src={src} />;
    } else if (type === 'image') {
      media = <Image src={src} />;
    } else if (type === 'video') {
      media = <Video src={src} />;
    } else if (type == 'youtube') {
      media = <YouTube src={src} />;
    }
    return media;
};
export function mediaBlockRenderer(block) {
    if(block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false,
        };
    }
    return null;
}








