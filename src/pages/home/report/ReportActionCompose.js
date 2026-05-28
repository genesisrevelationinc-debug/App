import React from 'react';
import {View, TextInput} from 'react-native';

const Composer = ({...props}) => {
    const composerRef = React.useRef();
    const [isComposerFullSize, setIsComposerFullSize] = React.useState(false);
    
    return (
        <View>
            <TextInput
                ref={composerRef}
                style={{...styles.textInput, 
                    minHeight: 50,
                    maxHeight: isComposerFullSize ? 1000 : 100  // This ensures expanded composer has enough space
                }}
                {...props}
            />
        </View>
    );
};

export default React.memo(Composer);