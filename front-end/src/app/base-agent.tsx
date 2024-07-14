'use client'

import { Box, Button, Card, Flex, HStack, Input, Menu, MenuButton, MenuList, MenuItem, Select, Text, VStack } from "@chakra-ui/react";

import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";

import { useState } from "react";

const options: any = {
	"openai": [
		{
			"name": "gpt-4o",
			"title": "GPT-4o",
		},
		{
			"name": "gpt-4-turbo",
			"title": "GPT-4 Turbo",
		},
		{
			"name": "gpt-3.5-turbo",
			"title": "GPT-3.5 Turbo",
		}
	],
	"anthropic": [
		{
			"name": "claude-3.5-haiku",
			"title": "Claude-3.5 Haiku",
		},
		{
			"name": "claude-3.5-sonnet",
			"title": "Claude-3.5 Sonnet",
		},
		{
			"name": "claude-3.5-opus",
			"title": "Claude-3.5 Opus",
		}
	],
	"together": [
		{
			"name": "qwen-2-instruct",
			"title": "Qwen-2 Instruct",
		},
		{
			"name": "meta-llama-3-70b-chat",
			"title": "Meta Llama 3 70B chat",
		},
		{
			"name": "snowflake-arctic-instruct",
			"title": "Snowflake Arctic Instruct",
		},
		{
			"name": "meta-llama-3-70b",
			"title": "Meta Llama 3 70B",
		},
		{
			"name": "meta-llama-3-8b-hf",
			"title": "Meta Llama 3 8B HF",
		},
	],
	"samba-nova": [
		{
			"name": "meta-llama-3-8b",
			"title": "Meta Llama 3 8B",
		},
		{
			"name": "meta-llama-3-70b",
			"title": "Meta Llama 3 70B",
		},
	]	
}

export default function BaseAgent({
	id, type, createNewAgent
}: { id: number, type: string, createNewAgent: (parentAgentId: number, agentType: string) => void }) {

	const [selectedClient, setSelectedClient] = useState("");
	const [model, setModel] = useState("");

	return (
		<Card
			borderRadius={5}
			padding={2}
			margin={5}
			borderColor="gray.200"
			justifyContent="center"
			alignItems="center"
			flexDirection="column"
			textColor="white"
			w="fit-content"
			h="fit-content"
		>
			<Box
				borderRadius={5}
				borderColor="gray.200"
				borderWidth={1}
			>
				<VStack
					padding={2}
					marginTop={2}
					display="flex"
					alignSelf="flex-start"
					alignItems="flex-start"
				>
					<Text
						textColor="black"
						paddingLeft={4}
					>Agent Type: {type}</Text>
					<Input placeholder="Agent Name" textColor="black"/>
					{
						type != "User" ? <>
						<Select
						textColor="black"
						placeholder="Select Client"
						onChange={($event) => setSelectedClient($event.target.value)}
					>
						<option value="openai">OpenAI Client</option>
						<option value="anthropic">Anthropic Client</option>
						<option value="samba-nova">Samba Nova Client</option>
						<option value="together">Together Client</option>
					</Select>
					<Select
						textColor="black"
						placeholder="Select Model"
						onChange={($event) => setModel($event.target.value)}
					>
						{
							selectedClient != "" ? options[selectedClient].map((option: {name: string, title: string}) => {
								return (<option key={option.name}value={option.name}>{option.title}</option>)
							}) : (<></>)
						}
					</Select>
					</> : <></>
				}	
					
				</VStack>
				<Box
					padding={5}
				></Box>
				{
					type == "Executor" || type == "Agent With Executors" ? <></> :
				<HStack w="full" justifyContent="flex-end" padding={2}>
				<Menu
				>
					<Flex
						justifyContent="center"
						alignItems="center"
					>
						<MenuButton
							as={Button}
							rightIcon={<AddIcon/>}
							fontSize="sm"
							paddingLeft={2}
						>
						</MenuButton>
					</Flex>
					<MenuList>
						<MenuItem
							textColor="black"
							onClick={() => createNewAgent(id, "Planner")}
						>Planner Agent</MenuItem>
						<MenuItem
							textColor="black"
							onClick={() => createNewAgent(id, "Executor")}
						>Executor</MenuItem>
						<MenuItem
							textColor="black"
							onClick={() => createNewAgent(id, "Agent With Executors")}
						>Agent With Executors</MenuItem>
					</MenuList>
				</Menu>
			</HStack>
		}
			</Box>
		</Card>
	)
}
// akshat@codeium.com