import { Button } from '@/components/Button';
import { FormInput } from '@/components/FormInput';
import { SectionTitle } from '@/components/SectionTitle';
import { useTheme } from '@/constants/useTheme';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, updateUser } from '../../../store/userSlice';

interface FormData {
    name: string;
    email: string;
    phone: string;
    website: string;
    companyName: string;
    street: string;
    city: string;
    zipcode: string;
}

interface FormErrors {
    name?: string;
    email?: string;
}

export default function EditUser() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { colors } = useTheme();
    const user = useSelector((state: RootState) =>
        state.users.users.find(u => u.id === parseInt(id))
    );

    const [formData, setFormData] = useState<FormData>({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        website: user?.website || '',
        companyName: user?.company.name || '',
        street: user?.address.street || '',
        city: user?.address.city || '',
        zipcode: user?.address.zipcode || ''
    });
    const [errors, setErrors] = useState<FormErrors>({});

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

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        const email = formData.email.trim();
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Invalid email';
        }

        const hasErrors = Object.keys(newErrors).length > 0;
        if (hasErrors) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }

        setErrors(newErrors);
        return !hasErrors;
    };

    const handleUpdate = () => {
        if (!validateForm()) return;

        dispatch(updateUser({
            ...user,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            website: formData.website,
            company: {
                ...user.company,
                name: formData.companyName
            },
            address: {
                ...user.address,
                street: formData.street,
                city: formData.city,
                zipcode: formData.zipcode
            }
        }));

        Alert.alert('Success', 'User updated successfully');
        router.back();
    };

    return (

        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { backgroundColor: colors.card }]}>

                <Text style={[styles.title, { color: colors.text }]}>{user.name}</Text>
            </View>

            <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
                <SectionTitle title="Personal Information" />

                <FormInput
                    label="Name"
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                    error={errors.name}
                    required
                />
                <FormInput
                    label="Email"
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={errors.email}
                    required
                />

                <FormInput
                    label="Phone"
                    value={formData.phone}
                    onChangeText={(text) => setFormData({ ...formData, phone: text })}
                    keyboardType="phone-pad"
                />

                <FormInput
                    label="Website"
                    value={formData.website}
                    onChangeText={(text) => setFormData({ ...formData, website: text })}
                    autoCapitalize="none"
                />

                <SectionTitle title="Company" />

                <FormInput
                    label="Company Name"

                    value={formData.companyName}
                    onChangeText={(text) => setFormData({ ...formData, companyName: text })}
                />

                <SectionTitle title="Address" />

                <FormInput
                    label="Street"
                    value={formData.street}
                    onChangeText={(text) => setFormData({ ...formData, street: text })}
                />

                <FormInput
                    label="City"
                    value={formData.city}
                    onChangeText={(text) => setFormData({ ...formData, city: text })}
                />

                <FormInput
                    label="Zipcode"
                    value={formData.zipcode}
                    onChangeText={(text) => setFormData({ ...formData, zipcode: text })}
                />

                <View style={styles.buttonContainer}>
                    <Button
                        title="Update User"
                        onPress={handleUpdate}
                        style={styles.button}
                    />
                    <Button
                        title="Cancel"
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


    header: {
        padding: 20,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    form: {
        flex: 1,
        padding: 20,
    },
    buttonContainer: {
        gap: 12,

        marginTop: 24,
        marginBottom: 40,
    },

    button: {
        width: '100%',
    },
    errorText: {
        fontSize: 16,
    },
});