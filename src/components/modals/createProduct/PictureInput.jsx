import { FormControl, Input } from '@chakra-ui/react';
import React from 'react';

export default function PictureInput({ file, setFile }) {
  return (
    <FormControl mt={4}>
      <Input
        onChange={e => setFile(e.target.files[0])}
        type="file"
        accept="image/*"
      />
    </FormControl>
  );
}
