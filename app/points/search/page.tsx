'use client'

import {
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { API_URL, Point } from '@/app/utils'

export default function SearchPoints() {
  const [data, setData] = useState<Point[]>([])
  const [filteredData, setFilteredData] = useState(data)
  const [input, setInput] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/points`)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  function handleSearch(e) {
    const cleanExpression = input.toLowerCase().trim()
    const regexExpression = new RegExp(cleanExpression)
    const filteredPoints = data.filter((point) =>
      regexExpression.test(point.name.toLowerCase())
    )
    setFilteredData(filteredPoints)
  }
  return (
    <>
      <Container>
        <HStack m={4}>
          <FormControl>
            <FormLabel>Insira o nome do ponto</FormLabel>
            <Input value={input} onChange={(e) => setInput(e.target.value)} />
          </FormControl>
          <Button colorScheme="orange" alignSelf="end" onClick={handleSearch}>
            Pesquisar
          </Button>
        </HStack>
      </Container>
      {filteredData.length > 0 ? (
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Coordenadas</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData.map(({ name, x, y }) => (
                <Tr key={`${x}${y}`}>
                  <Td>{name}</Td>
                  <Td>{`(${x}, ${y})`}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text>Nenhum resultado</Text>
      )}
    </>
  )
}
