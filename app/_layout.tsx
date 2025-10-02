import { store } from '@/store/userSlice';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

// Menaxhimi i sjelljes së njoftimeve
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,   // shfaq alert
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Layout() {
  const insert = useSafeAreaInsets();
  const notificationListener = useRef<any>(null);
  const responseListener = useRef<any>(null);

  useEffect(() => {
    registerForNotifications();

    // Listener kur vjen njoftim
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Erdhi njoftimi:', notification);
    });

    // Listener kur përdoruesi shtyp njoftimin
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Njoftimi u shtyp:', response);
    });

    // Pastrim i listener-ave kur komponenti mbyllet
    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  // Kërkon leje për njoftime
  async function registerForNotifications() {
    if (Device.isDevice && Platform.OS !== 'web') {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
    }
  }

  return (
    <Provider store={store}>
      <View
        style={{
          paddingTop: insert.top,
          flex: 1,
        }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="modal"
            options={{
              presentation: 'modal',
            }}
          />
        </Stack>
      </View>
    </Provider>
  );
}
