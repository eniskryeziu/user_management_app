import { useTheme } from '@/constants/useTheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SectionTitleProps {
    title: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
    },
});