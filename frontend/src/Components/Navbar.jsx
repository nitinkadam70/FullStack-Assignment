import React from 'react'
import { Avatar, Box, Button, ButtonGroup, Flex, Heading, Spacer, WrapItem } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
const Navbar = () => {

    const userid = localStorage.getItem("userid");
    const username = localStorage.getItem("username");

    const navigate = useNavigate();

    return (
        <Flex border='2px solid black' minWidth='max-content' alignItems='center' gap='2' p={'4'}>
            <Box p='2'>
                <Button onClick={() => navigate("/")} size='md'>Chakra App</Button>
            </Box>
            <Spacer />
            {userid ? <ButtonGroup gap='2'>
                <Button onClick={() => navigate("/signup")} colorScheme='teal'>Sign Up</Button>
                <Button onClick={() => navigate("/login")} colorScheme='teal'>Log in</Button>
            </ButtonGroup> :
                <Box p='2'>
                    <Button onClick={() => navigate("/articles")} colorScheme='teal'>My articles</Button>
                    <Avatar name={username} src='https://bit.ly/sage-adebayo' />
                </Box>}

        </Flex>
    )
}

export default Navbar