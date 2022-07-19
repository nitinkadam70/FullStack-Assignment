import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Input,
    Checkbox,
} from '@chakra-ui/react'

import { v4 as uuid } from "uuid"



const TableComponent = (props) => {
    return (
        <TableContainer>
            <Table variant='striped' colorScheme='teal'>
                <Thead>
                    <Tr>
                        <Th>Status</Th>
                        <Th><Checkbox /></Th>
                        <Th>Article TItle</Th>
                        <Th>Remarks</Th>
                        <Th>Submission Time</Th>
                        <Th>Time Since Submissior</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        props.data.map((item) => (
                            <Tr key={uuid()}>
                                <Td>{item.status}</Td>
                                <Td><Checkbox /></Td>
                                <Td>{item.articleTitle}</Td>
                                <Td>{item.autherName}</Td>
                                <Td>{item.submissionTime}</Td>
                                <Td>{item.timeSinceSubmission}</Td>

                            </Tr>))}

                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default TableComponent