import { useTheme } from '@/constants/useTheme';
import { User } from '@/store/userSlice';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UserAvatar } from './UserAvatar';

interface UserCardProps {
    user: User;
    onPress: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onPress }) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <UserAvatar name={user.name} size={56} />
            <View style={styles.userInfo}>
                <Text style={[styles.userName, { color: colors.text }]} numberOfLines={1}>
                    {user.name}
                </Text>
                <Text style={[styles.userEmail, { color: colors.textTertiary }]} numberOfLines={1}>
                    {user.email}
                </Text>
                <Text style={[styles.userCompany, { color: colors.secondary }]} numberOfLines={1}>
                    {user.company.name}
                </Text>
            </View>
            <View style={styles.chevron}>
                <Text style={[styles.chevronText, { color: colors.textTertiary }]}>›</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 6,
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    userInfo: {
        marginLeft: 16,
        flex: 1,
    },
    userName: {
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        marginBottom: 2,
    },
    userCompany: {
        fontSize: 13,
    },
    chevron: {
        marginLeft: 8,
    },
    chevronText: {
        fontSize: 28,
        fontWeight: '300',
    },
});