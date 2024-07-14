"use client"; // Ensure this is treated as a client component

import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, VStack } from '@chakra-ui/react';

interface DemoButtonProps {
  apiProvider: string;
  apiKey: string;
  model: string;
  selectedAvailableAgents: string;
  dbType: string;
  dbPath: string;
  instruction: string;
  autoAdvance: string;
}

const DemoButton: React.FC = () => {
  const [state, setState] = useState<DemoButtonProps>({
    apiProvider: 'openai',
    apiKey: '',
    model: '',
    selectedAvailableAgents: '',
    dbType: '',
    dbPath: '',
    instruction: '',
    autoAdvance: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleButtonClick = async () => {
    const queryParams = new URLSearchParams(state as any as Record<string, string>);

    try {
      const response = await fetch(`/execute_demo?${queryParams.toString()}`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Error executing demo:', response.statusText);
      }
    } catch (error) {
      console.error('Error executing demo:', error);
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Button colorScheme="teal" onClick={handleButtonClick}>
          Execute Demo
        </Button>
      </VStack>
    </Box>
  );
};

export default DemoButton;
