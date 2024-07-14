'use client'

import { useState } from "react";
import { Box, Input, HStack, VStack, Text, Button} from "@chakra-ui/react";

import BaseAgent from "./base-agent";
import SideMenu from "./SideMenu";

export default function Home() {

  const [agentData, setAgentData] = useState<string[]>([]);
  const [promptResponse, setPromptResponse] = useState<string>("");

  function createNewAgent(parentAgentId: number, agentType: string) : void {
    setAgentData([...agentData.slice(0, parentAgentId + 1), agentType, ...agentData.slice(parentAgentId + 1)])
  }

  function callExecuteDemo() {

  }

  return (
      <HStack>
			<Box
        w="100wh"
        h="100vh"
        padding={5}
      >
        <HStack>
          <BaseAgent id={0} createNewAgent={createNewAgent} type="User"/>
          {
            agentData.map((value: string, index: number) => {
              return <BaseAgent id={index} key={value} type={value} createNewAgent={createNewAgent}/>
            })
          }
        </HStack>
        <HStack alignItems="flex-end" justifyContent="flex-end">
          <Input placeholder="query"/>
          <Button
            colorScheme="teal"
            onClick={async () => {
              const response = await fetch(`http://localhost:5000/execute_demo?model=gpt-4o&api_key=<OPENAI_API_KEY>&selected_available_agents=AttributeDetectorAgent,SchemaRenamerAgent,SQLGeneratorAgent`);
              const data = await response.json();
              setPromptResponse(data["last_meadow_response"]);
            }}
          >Execute</Button>
        </HStack>
        <Text>{promptResponse}</Text>
			</Box>
      <SideMenu />
      </HStack>
  );
}
