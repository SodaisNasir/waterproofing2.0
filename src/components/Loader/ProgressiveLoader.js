import React from 'react';
import { ProgressDialog } from 'react-native-simple-dialogs';
import Colors from '../Colors';

const ProgressiveLoader = ({ loading }) => {
    return (
        <ProgressDialog
            message="Please, wait..."
            activityIndicatorColor={Colors.black}
            activityIndicatorSize={'large'}
            dialogStyle={{ backgroundColor: 'white', borderRadius: 5 }}
            visible={loading}
            messageStyle={{
                fontSize: 18,
            }}
        />
    );
};

export default ProgressiveLoader;