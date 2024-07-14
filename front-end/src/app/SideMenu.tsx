"use client"; // Add this directive at the top

import React, { useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  VStack,
  List,
  ListItem,
  CloseButton,
  HStack,
} from '@chakra-ui/react';

interface Model {
  modelName: string;
  apiKey: string;
  nickname?: string;
}

const SideMenu: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [models, setModels] = useState<Model[]>([]);
  const [modelName, setModelName] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const handleAddModel = () => {
    if (!modelName || !apiKey) {
      // Show an error message or handle the validation
      return;
    }

    setModels([...models, { modelName, apiKey, nickname: nickname || modelName }]);
    setModelName('');
    setApiKey('');
    setNickname('');
    onClose();
  };

  const handleDeleteModel = (index: number) => {
    const newModels = models.filter((_, i) => i !== index);
    setModels(newModels);
  };

  return (
    <Box position="fixed" right="0" top="0" height="100vh" width="300px" bg="gray.100" p={4}>
      <Button onClick={onOpen} colorScheme="teal" mb={4}>
        Add
      </Button>
      <List spacing={3}>
        {models.map((model, index) => (
          <ListItem key={index} bg="white" p={2} borderRadius="md" boxShadow="sm">
            <HStack justifyContent="space-between">
              <Box>{model.nickname}</Box>
              <CloseButton
                alignSelf='flex-start'
                position='relative'
                right={-1}
                top={-1}
                onClick={() => handleDeleteModel(index)}
              />
            </HStack>
          </ListItem>
        ))}
      </List>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Add a new AI Model</DrawerHeader>

            <DrawerBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Model Name</FormLabel>
                  <Select value={modelName} onChange={(e) => setModelName(e.target.value)}>
                    <option value="">Select model</option>
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="claude-v1">Claude v1</option>
                    <option value="claude-v2">Claude v2</option>
                    {/* Add more model options here */}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>API Key</FormLabel>
                  <Input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Nickname (optional)</FormLabel>
                  <Input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </FormControl>
              </VStack>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="teal" onClick={handleAddModel}>
                Add Model
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default SideMenu;
