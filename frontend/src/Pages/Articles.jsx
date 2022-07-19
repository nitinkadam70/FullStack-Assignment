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
import { v4 as uuid } from "uuid"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTaskToken } from '../Redux/task/Get/action';
import { postTaskAction } from '../Redux/task/post/action';
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
    const [articleTitle, setArticleTitle] = useState("");
    const [autherName, setAutherName] = useState("");

    let userid = localStorage.getItem("userid");

    const [show, setShow] = useState(false)
    const [clock] = useState(new Date())


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
        let payload = {
            autherName: autherName,
            articleTitle: articleTitle,
            submissionTime: `${clock.getDate() < 10 ? "0" + clock.getDate() : clock.getDate()}/${clock.getMonth() < 10 ? "0" + clock.getMonth() : clock.getMonth()}/${clock.getFullYear()} 00:05:${clock.getHours() < 10 ? "0" + clock.getHours() : clock.getHours()}:${clock.getMinutes() < 10 ? "0" + clock.getMinutes() : clock.getMinutes()}:${clock.getSeconds() < 10 ? "0" + clock.getSeconds() : clock.getSeconds()}`,
            timeSinceSubmission: clock.getSeconds()
        }
        payload = JSON.stringify(payload)
        dispatch(postTaskAction(payload))
    }

    return (

        <Flex
            bg={useColorModeValue('white', 'gray.200')}
            textAlign={'center'}
            justifyContent={'center'}
            direction={'column'}

        >
            <br />
            <br />

            {!show ? <Button width={'min'} onClick={() => setShow(!show)}>Add Article</Button> : <Box width={{ base: 'full', sm: 'lg', lg: 'xl' }} margin={'auto'} >
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
                        <Input bg='white' color='black'
                            onChange={(e) => setArticleTitle(e.target.value)}
                            value={articleTitle}

                            placeholder={'Add article Title'}
                        />
                        <Input bg='white' value={autherName} color='black' onChange={(e) => setAutherName(e.target.value)} name="autherName" placeholder={'auther Name'} />
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
            <Box>
                {loading ?
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size={'xl'}
                    />

                    :
                    <TableComponent key={uuid()} data={task} />
                }
            </Box>

        </Flex>
    );
}