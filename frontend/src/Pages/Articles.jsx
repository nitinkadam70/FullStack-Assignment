import {
    Box,
    chakra,
    Flex,
    Icon,
    SimpleGrid,
    useColorModeValue,
    Input,
    Button,
    Stack,
    useToast,
    Spinner,
    HStack
} from '@chakra-ui/react';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTaskToken } from '../Redux/task/Get/action';
import { postTaskAction } from '../Redux/task/post/action';
import { DeleteIcon } from '@chakra-ui/icons';
import TableComponent from '../Components/TableComponent';

const backgrounds = [
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED64A6' /%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%23F56565' /%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%2338B2AC' /%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED8936' /%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ED8936'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%2348BB78'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%230BC5EA'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%23ED64A6'/%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='102.633' cy='61.0737' rx='102.633' ry='61.0737' fill='%23ED8936'/%3E%3Cellipse cx='399.573' cy='123.926' rx='102.633' ry='61.0737' fill='%2348BB78'/%3E%3Cellipse cx='366.192' cy='73.2292' rx='193.808' ry='73.2292' fill='%230BC5EA'/%3E%3Cellipse cx='222.705' cy='110.585' rx='193.808' ry='73.2292' fill='%23ED64A6'/%3E%3C/svg%3E")`,
    `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='185' viewBox='0 0 560 185' fill='none'%3E%3Cellipse cx='457.367' cy='123.926' rx='102.633' ry='61.0737' transform='rotate(-180 457.367 123.926)' fill='%23ECC94B'/%3E%3Cellipse cx='160.427' cy='61.0737' rx='102.633' ry='61.0737' transform='rotate(-180 160.427 61.0737)' fill='%239F7AEA'/%3E%3Cellipse cx='193.808' cy='111.771' rx='193.808' ry='73.2292' transform='rotate(-180 193.808 111.771)' fill='%234299E1'/%3E%3Cellipse cx='337.295' cy='74.415' rx='193.808' ry='73.2292' transform='rotate(-180 337.295 74.415)' fill='%2348BB78'/%3E%3C/svg%3E")`,
];


export default function Articles() {
    const { loading, task, error } = useSelector((store) => store.task);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [articleAdd, setArticleAdd] = useState({});
    let userid = localStorage.getItem("userid");

    const [show, setShow] = useState(false)

    useEffect(() => {
        if (task?.length === 0) {
            dispatch(getTaskToken())
        }
        if (!userid) {
            navigate("/login");
        }
    }, [dispatch, task?.length, userid, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        let payload = articleAdd
        payload = JSON.stringify(payload)
        dispatch(postTaskAction(payload))
    }
    const handleChange = (e) => {
        setArticleAdd({ [e.target.name]: e.target.value })
    }
    return (
        <Flex
            bg={useColorModeValue('gray.800', 'gray.200')}

            textAlign={'center'}
            pt={10}
            justifyContent={'center'}
            direction={'column'}
            width={'full'}>
            {!show ? <Button width={'min'} onClick={() => setShow(!show)}>Add Article</Button> : <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'} >
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
                        <Input bg='white' color='black'
                            name="articleTitle"
                            onChange={(e) => handleChange}
                            type={'text'}
                            placeholder={'Add article Title'}

                        />
                        <Input bg='white' color='black' onChange={(e) => handleChange} name="autherName" placeholder={'auther Name'} />
                        <Input bg='white' color='black' onChange={(e) => handleChange} name="submissionTime" placeholder={'submissionTime'} />
                        <Input bg='white' color='black' onChange={(e) => handleChange} name="timeSinceSubmission" placeholder={'timeSinceSubmission'} />


                        <Button
                            bg={'blue.400'}
                            rounded={'full'}
                            type='submit'
                            color={'white'}
                            flex={'1 0 auto'}
                            _hover={{ bg: 'blue.500' }}
                            _focus={{ bg: 'blue.500' }}>
                            Add Task
                        </Button>

                    </Stack>
                </form>
                <br />
                <Button width={'min'} onClick={() => setShow(!show)}>Hide From</Button>
            </Box>}
            <SimpleGrid

                columns={{ base: 1, xl: 2 }}
                spacing={'20'}
                mt={16}
                mx={'auto'}>
                {loading ?
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size={'xl'}
                    />

                    : task.map((cardInfo, index) => (
                        <TableComponent key={index} {...cardInfo} index={index} />
                    ))}
            </SimpleGrid>
            <Box >
                <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={'purple.400'}>
                    <path
                        fill={'currentColor'}
                        d="M10.7964 5.04553e-07C8.66112 -0.000123335 6.57374 0.632971 4.79827 1.81922C3.0228 3.00547 1.63898 4.69158 0.82182 6.66433C0.00466116 8.63708 -0.209132 10.8079 0.207477 12.9021C0.624087 14.9964 1.65239 16.9201 3.16233 18.4299L19.1153 34.3828C19.2395 34.5074 19.3871 34.6062 19.5496 34.6736C19.7121 34.741 19.8863 34.7757 20.0622 34.7757C20.2381 34.7757 20.4123 34.741 20.5748 34.6736C20.7373 34.6062 20.8848 34.5074 21.0091 34.3828L36.962 18.4272C38.9319 16.3917 40.0228 13.6636 39.9996 10.8311C39.9764 7.99858 38.8409 5.28867 36.838 3.28573C34.835 1.28279 32.1251 0.147283 29.2926 0.124081C26.4601 0.100879 23.732 1.19184 21.6965 3.1617L20.0622 4.79337L18.4305 3.1617C17.4276 2.15892 16.237 1.36356 14.9267 0.821064C13.6163 0.278568 12.2119 -0.000433066 10.7937 5.04553e-07H10.7964Z"
                    />
                </Icon>
            </Box>
        </Flex>
    );
}