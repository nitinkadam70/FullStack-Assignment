import React from 'react'
import { Avatar, Box, Button, ButtonGroup, Flex, Heading, HStack, Spacer, WrapItem } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';
const Navbar = () => {

    const userid = localStorage.getItem("userid");
    const username = localStorage.getItem("username");

    const navigate = useNavigate();

    return (
        <Flex justifyContent='space-around' border='2px solid black' minWidth='max-content' alignItems='center' gap='2' p={'4'}>
            <Box p='2'>
                <Button onClick={() => navigate("/")} size='md'>Homepage</Button>
            </Box>
            <Spacer />

            {!userid ? <ButtonGroup gap='2'>
                <Button onClick={() => navigate("/signup")} colorScheme='teal'>Sign Up</Button>
                <Button onClick={() => navigate("/login")} colorScheme='teal'>Log in</Button>
            </ButtonGroup> :
                <>
                    <Button onClick={() => navigate("/articles")}>My Articles</Button>
                    <Profile />
                </>

            }

        </Flex>
    )
}

export default Navbar