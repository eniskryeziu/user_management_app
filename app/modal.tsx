import { Button } from '@/components/Button';
import { FormInput } from '@/components/FormInput';
import { SectionTitle } from '@/components/SectionTitle';
import { useTheme } from '@/constants/useTheme';
import { addUser, AppDispatch, User } from '@/store/userSlice';
import * as Haptics from 'expo-haptics';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

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

export default function ModalScreen() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    website: '',
    companyName: '',
    street: '',
    city: '',
    zipcode: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { colors, isDark } = useTheme();

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


    // Nëse ka të paktën një gabim telefoni jep një vibrim të vogël për error
    if (Object.keys(newErrors).length > 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUser = async () => {
    if (!validateForm()) return;

    const newUser: User = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      company: { name: formData.companyName },
      address: {
        street: formData.street,
        city: formData.city,
        zipcode: formData.zipcode
      },
    };

    dispatch(addUser(newUser));

    // Njoftojmë (njoftim lokal) për emrin e user-it të ri
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'New User',
        body: formData.name,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 1
      },
    });
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>Add New User</Text>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        <SectionTitle title="Personal Information" />

        <FormInput
          label="Name"
          placeholder="Enis Kryeziu"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          error={errors.name}
          required
        />

        <FormInput
          label="Email"
          placeholder="eniskryeziu@mail.com"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
          required
        />

        <FormInput
          label="Phone"
          placeholder="+383 45 123 456"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
        />

        <FormInput
          label="Website"
          placeholder="www.company.com"
          value={formData.website}
          onChangeText={(text) => setFormData({ ...formData, website: text })}
          autoCapitalize="none"
        />

        <SectionTitle title="Company" />

        <FormInput
          label="Company Name"
          placeholder="Company"
          value={formData.companyName}
          onChangeText={(text) => setFormData({ ...formData, companyName: text })}
        />

        <SectionTitle title="Address" />

        <FormInput
          label="Street"
          placeholder="123"
          value={formData.street}
          onChangeText={(text) => setFormData({ ...formData, street: text })}
        />

        <FormInput
          label="City"
          placeholder="Prishtina"
          value={formData.city}
          onChangeText={(text) => setFormData({ ...formData, city: text })}
        />

        <FormInput
          label="Zipcode"
          placeholder="10000"
          value={formData.zipcode}
          onChangeText={(text) => setFormData({ ...formData, zipcode: text })}
        />

        <View style={styles.buttonRow}>
          <Button
            title="Cancel"
            variant="outline"
            onPress={() => router.back()}
            style={styles.button}
          />
          <Button
            title="Add User"
            onPress={handleAddUser}
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
  header: {
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    flex: 1,
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 40,
  },
  button: {
    flex: 1,
  },
});