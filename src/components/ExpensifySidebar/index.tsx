import React, {useState, useEffect} from 'react';
import {View, Text, Animated, TouchableOpacity} from 'react-native';
import styles from '../../styles/styles';
import themeColors from '../../styles/themes/default';
import variables from '../../styles/variables';

const sidebarWidth = 375;
const collapsedWidth = 76;

const ExpensifySidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isPeeking, setIsPeeking] = useState(false);

    // Animation values would be implemented with Reanimated
    // For now using basic state for demonstration

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <View style={[
            styles.flex1,
            isCollapsed ? styles.collapsedSidebar : styles.expandedSidebar
        ]}>
            <TouchableOpacity onPress={toggleSidebar}>
                <Text>Toggle Sidebar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ExpensifyScroll