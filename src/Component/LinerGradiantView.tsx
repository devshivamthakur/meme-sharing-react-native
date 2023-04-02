import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface LinerGradiantViewProps {
    children: ReactNode;
    style?:object
}

const LinerGradiantView = ({ children,style }: LinerGradiantViewProps) => {
    return (
        <LinearGradient
            style={[styles.LinearGradient,style]}
            start={{x: 0, y: 1}} end={{x: 1, y: 1}}
            colors={['#ec9bcf', '#f1b9b7', '#f1b9b7', '#d6cced']}
        >
            {children}
        </LinearGradient>
    );
};

export default LinerGradiantView;

const styles = StyleSheet.create({
    LinearGradient: {
        flex: 1,
    },
});