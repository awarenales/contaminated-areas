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

import {
  API_URL,
  Point,
  Sample,
  SampleResponse,
  getLabel,
  prettyDate,
} from '@/app/utils'

export default function SearchParameters() {
  const [data, setData] = useState<SampleResponse[]>([])
  const [filteredData, setFilteredData] = useState(data)
  const [input, setInput] = useState('')

  useEffect(() => {
    fetch(`${API_URL}/samples`)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  function handleSearch(e) {
    const cleanExpression = input.toLowerCase().trim()
    const regexExpression = new RegExp(cleanExpression)
    const filteredSamples = data.filter(({ parameter }) =>
      regexExpression.test(getLabel(parameter).toLowerCase())
    )
    setFilteredData(filteredSamples)
  }
  return (
    <>
      <Container>
        <HStack m={4}>
          <FormControl>
            <FormLabel>Insira o nome do parâmetro</FormLabel>
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
                <Th>Parâmetro</Th>
                <Th>Ponto</Th>
                <Th>Data da Coleta</Th>
                <Th>Valor</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredData.map(
                ({ id, parameter, pointLabel, date, value }) => (
                  <Tr key={id}>
                    <Td>{getLabel(parameter)}</Td>
                    <Td>{pointLabel}</Td>
                    <Td>{prettyDate(date)}</Td>
                    <Td isNumeric>{value}</Td>
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Text>Nenhum resultado</Text>
      )}
    </>
  )
}
