import React from 'react'
import { Avatar, AvatarBadge, Button, Hide, HStack, Tag, TagLabel, VStack } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
const Profile = () => {
    const navigate = useNavigate()

    let userid = localStorage.getItem("userid");
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!userid) {
            setShow(false)
        }
        else {
            setShow(true)
        }
    }, [userid, show])


    if (!show) {
        return
    }
    return (
        <HStack direction={'row'} p='1%' spacing={4} position={['relative', 'relative', 'absolute']}>
            <Button onClick={() => {
                localStorage.clear()
                navigate("/")
                window.location.reload()

            }}
                rightIcon={<ExternalLinkIcon />} colorScheme='teal' variant='solid'>
                Logout
            </Button>


            <Avatar name='Ryan Florence' src='https://bit.ly/ryan-florence' />



        </HStack >
    )
}

export default Profile