import { useTheme } from '@/constants/useTheme';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

interface UserAvatarProps {
    name: string;
    size?: number;
    style?: ViewStyle;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ name, size = 50, style }) => {
    const { colors } = useTheme();
    //const initial = name.charAt(0).toUpperCase();
    const initials = name.split(" ").map(word => word.charAt(0)).join("").toUpperCase();
    const avatarSize = { width: size, height: size, borderRadius: size / 2 };
    const fontSize = size / 3.9;

    return (
        <View style={[styles.avatar, avatarSize, { backgroundColor: colors.primary }, style]}>
            <Text style={[styles.avatarText, { fontSize }]}>{initials}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});