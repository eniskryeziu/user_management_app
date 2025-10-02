import { useTheme } from '@/constants/useTheme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    variant = 'primary',
    style,
    ...props
}) => {
    const { colors } = useTheme();

    const getButtonStyle = () => {
        switch (variant) {
            case 'primary':
                return { backgroundColor: colors.primary };
            case 'secondary':
                return { backgroundColor: colors.secondary };
            case 'danger':
                return { backgroundColor: colors.error };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderColor: colors.primary,
                };
            default:
                return { backgroundColor: colors.primary };
        }
    };

    const getTextStyle = () => {
        if (variant === 'outline') {
            return { color: colors.primary };
        }
        return { color: '#fff' };
    };

    return (
        <TouchableOpacity
            style={[styles.button, getButtonStyle(), style]}
            activeOpacity={0.7}
            {...props}
        >
            <Text style={[styles.buttonText, getTextStyle()]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});