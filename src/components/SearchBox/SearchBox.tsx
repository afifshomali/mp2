import React from 'react';
import { Stack, TextInput, Select, Button, Group, Text } from '@mantine/core';
import styles from './SearchBox.module.css';

interface SearchBoxProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  sortKey: 'name' | 'numIngredients';
  onSortKeyChange: (key: 'name' | 'numIngredients') => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
}

export function SearchBox({
  searchTerm,
  onSearchTermChange,
  sortKey,
  onSortKeyChange,
  sortOrder,
  onSortOrderChange,
}: SearchBoxProps) {
  return (
    <Stack className={styles.controlsGroup}>
      <TextInput
        placeholder="Search meals..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.currentTarget.value)}
        className={styles.input}
      />

      <div className={styles.sortContainer}>
        <Text size="sm">
          Sort by:
        </Text>
        <Select
          value={sortKey}
          onChange={(val) => {
            if (val === 'name' || val === 'numIngredients') {
              onSortKeyChange(val);
            }
          }}
          data={[
            { value: 'name', label: 'Name' },
            { value: 'numIngredients', label: 'Number of Ingredients' },
          ]}
          className={styles.input}
        />
      </div>

      <Group grow>
        <Button
          variant={sortOrder === 'asc' ? 'filled' : 'outline'}
          onClick={() => onSortOrderChange('asc')}
        >
          ASC
        </Button>
        <Button
          variant={sortOrder === 'desc' ? 'filled' : 'outline'}
          onClick={() => onSortOrderChange('desc')}
        >
          DESC
        </Button>
      </Group>
    </Stack>
  );
}
