import React from 'react';

import { Button } from '@/components/Button';
import { UserAvatar } from '@/components/UserAvatar';
import { useTheme } from '@/constants/useTheme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, deleteUser, RootState } from '../../store/userSlice';

interface DetailSectionProps {
    label: string;
    value: string;
    colors: any;
}

const DetailSection: React.FC<DetailSectionProps> = ({ label, value, colors }) => (
    <View style={[styles.detailSection, { backgroundColor: colors.card }]}>

        <Text style={[styles.detailLabel, { color: colors.textTertiary }]}>{label}</Text>
        <Text style={[styles.detailValue, { color: colors.text }]}>{value}</Text>
    </View>
);

export default function UserDetails() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const dispatch = useDispatch<AppDispatch>();

    const { colors } = useTheme();
    const user = useSelector((state: RootState) =>
        state.users.users.find(u => u.id === parseInt(id))
    );

    if (!user) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.centerContainer}>
                    <Text style={[styles.errorText, { color: colors.textSecondary }]}>
                        User not found
                    </Text>
                </View>
            </View>
        );
    }

    const handleEdit = () => {
        router.push(`/user/edit/${id}`);
    };

    const handleDelete = () => {
        Alert.alert(
            'Delete User',

            'Are you sure you want to delete this user?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        dispatch(deleteUser(user.id));
                        router.back();
                    },
                },
            ]
        );
    };

    // Kthen adresën si string të bashkuar nga pjesët që ekzistojnë dhe nuk janë bosh
    const formatAddress = (address: {
        street?: string;
        city?: string;
        zipcode?: string;
    }): string => {
        const parts = [address.street, address.city, address.zipcode].filter(part => part && part.trim() !== '');
        return parts.join(', ');
    };


    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={[styles.avatarContainer, { backgroundColor: colors.card }]}>
                    <UserAvatar name={user.name} size={100} />
                    <Text style={[styles.userName, { color: colors.text }]}>{user.name}</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <DetailSection label="Email" value={user.email} colors={colors} />
                    <DetailSection label="Phone" value={user.phone} colors={colors} />


                    <DetailSection label="Website" value={user.website} colors={colors} />

                    <DetailSection label="Company" value={user.company.name} colors={colors} />
                    <DetailSection
                        label="Address"
                        value={formatAddress(user.address)}
                        colors={colors}
                    />
                </View>

                <View style={styles.actionButtons}>
                    <Button title="Edit User" onPress={handleEdit} style={styles.button} />
                    <Button
                        title="Delete User"
                        variant="danger"
                        onPress={handleDelete}
                        style={styles.button}

                    />


                    <Button
                        title="Go Back"
                        variant="outline"
                        onPress={() => router.back()}
                        style={styles.button}
                    />

                </View>

            </ScrollView>

        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    avatarContainer: {

        alignItems: 'center',
        padding: 40,
        paddingTop: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,

        shadowRadius: 8,
        elevation: 2,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 16,
    },
    detailsContainer: {
        marginTop: 16,
        gap: 3,
    },
    detailSection: {
        padding: 20,
    },
    detailLabel: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 1.2,

        marginBottom: 8,
    },

    detailValue: {
        fontSize: 16,
        lineHeight: 24,
    },


    actionButtons: {
        padding: 20,
        gap: 12,
        marginTop: 8,
    },
    button: {
        width: '100%',
    },
    errorText: {
        fontSize: 16,
    },


});