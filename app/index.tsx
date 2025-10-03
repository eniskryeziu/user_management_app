import { Button } from '@/components/Button';
import SearchInput from '@/components/SearchInput';
import { UserCard } from '@/components/UserCard';
import { useTheme } from '@/constants/useTheme';
import { AppDispatch, RootState, setLoading, setUsers, User } from '@/store/userSlice';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { users, loading } = useSelector((state: RootState) => state.users);
  const { colors } = useTheme();

  useEffect(() => {
    // Merr user-at sapo komponenti ngarkohet
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data: User[] = await response.json();
      dispatch(setUsers(data));
    } catch (error) {
      Alert.alert('Gabim', 'Dështoi');
      dispatch(setLoading(false));
    }
  };

  //Search bazë emrit dhe email te user-it
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Users</Text>
        <Button
          title="+ Add"
          onPress={() => router.push('/modal')}
          style={styles.addButton}
        />
      </View>
      <SearchInput search={search} setSearch={setSearch} colors={colors} />

      {loading ? (
        <View style={styles.centerContainer}>
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Loading...
          </Text>
        </View>
      ) : filteredUsers.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            {search ? 'No users found' : 'No users available'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <UserCard
              user={item}
              onPress={() => router.push(`/user/${item.id}`)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});