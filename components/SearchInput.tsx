import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface SearchProps {
    search: string;
    setSearch: (text: string) => void;
    colors: {
        card: string;
        border: string;
        text: string;
        placeholder: string;
    };
}

const SearchInput: React.FC<SearchProps> = ({ search, setSearch, colors }) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={[
                    styles.searchInput,
                    {
                        backgroundColor: colors.card,
                        borderColor: colors.border,
                        color: colors.text,
                    },
                ]}
                placeholder="Search by name or email"
                placeholderTextColor={colors.placeholder}
                value={search}
                onChangeText={setSearch}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        padding: 16,
    },
    searchInput: {
        padding: 16,
        borderRadius: 12,
        fontSize: 16,
        borderWidth: 1,
    },
});

export default SearchInput;
