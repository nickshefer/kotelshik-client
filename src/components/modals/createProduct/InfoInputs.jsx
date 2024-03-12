import { Button, ButtonGroup, IconButton, Input } from '@chakra-ui/react';
import { ImCross } from 'react-icons/im';
import React from 'react';

export default function InfoInputs({ info, addInfo, removeInfo, changeInfo }) {
  return (
    <>
      <Button mt={4} colorScheme="blue" onClick={addInfo}>
        Добавить свойство
      </Button>
      {info.map(i => (
        <ButtonGroup mt={4} key={i.number}>
          <Input
            value={i.name}
            onChange={e => changeInfo('title', e.target.value, i.number)}
            placeholder="Название"
          />

          <Input
            value={i.description}
            onChange={e => changeInfo('description', e.target.value, i.number)}
            placeholder="Описание"
          />

          <IconButton onClick={() => removeInfo(i.number)} colorScheme="red">
            <ImCross />
          </IconButton>
        </ButtonGroup>
      ))}
    </>
  );
}
