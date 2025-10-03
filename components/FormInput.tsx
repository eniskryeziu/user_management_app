import { useTheme } from '@/constants/useTheme';
import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface FormInputProps extends TextInputProps {
    label: string;
    error?: string;
    required?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
    label, error,
    required = false,
    style,
    ...props
}) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: colors.text }]}>
                {label} {required && <Text style={styles.required}>*</Text>}
            </Text>
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: colors.inputBackground,
                        borderColor: error ? colors.error : colors.border,
                        color: colors.text,
                    },
                    style,
                ]}
                placeholderTextColor={colors.placeholder}
                {...props}
            />
            {error && <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    required: {
        color: '#ef4444',
    },
    input: {
        padding: 15,
        borderRadius: 12,
        fontSize: 16,
        borderWidth: 1,
    },
    errorText: {
        fontSize: 14,
        marginTop: 4,
    },
});